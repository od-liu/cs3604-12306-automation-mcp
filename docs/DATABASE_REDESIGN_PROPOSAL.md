# 🚄 12306 座位管理系统数据库重构方案

## 📋 目录
1. [当前问题分析](#当前问题分析)
2. [新数据库设计方案](#新数据库设计方案)
3. [区间座位管理算法](#区间座位管理算法)
4. [实现步骤](#实现步骤)
5. [需要讨论的问题](#需要讨论的问题)

---

## 🐛 当前问题分析

### 问题1：座位管理粒度不足
**现状**：
```sql
CREATE TABLE train_seats (
  train_id INTEGER NOT NULL,          -- 只关联到车次
  seat_type TEXT NOT NULL,            -- 只有席别类型
  total_seats INTEGER NOT NULL,       -- 总座位数
  available_seats INTEGER NOT NULL    -- 可用座位数
)
```

**问题**：
- ❌ 没有具体到每个座位（几号车厢、几排、几座）
- ❌ 没有日期维度（同一车次不同日期应该独立）
- ❌ 没有区间管理（无法处理 北京→济南 和 济南→上海 的座位复用）

### 问题2：订单座位信息不明确
**现状**：
```sql
CREATE TABLE order_passengers (
  car_number TEXT,       -- 可选字段，可能为空
  seat_number TEXT       -- 可选字段，可能为空
)
```

**问题**：
- ❌ 座位号可能未分配
- ❌ 没有与实际座位记录关联
- ❌ 无法保证座位唯一性

### 问题3：区间座位冲突无法检测
**场景**：
```
车次 G103: 北京南 → 沧州西 → 济南西 → 徐州东 → 南京南 → 上海虹桥

订单A: 北京南 → 济南西 (1车01A座)
订单B: 济南西 → 上海虹桥 (1车01A座) ✅ 应该允许

订单C: 徐州东 → 南京南 (1车01A座)
订单B: 济南西 → 上海虹桥 (1车01A座) ❌ 应该冲突
```

**问题**：
- ❌ 当前设计无法实现这种区间座位复用逻辑

---

## 🎯 新数据库设计方案

### 核心表结构

#### 1️⃣ 车次停靠站表 (`train_stops`)
记录车次的所有停靠站及顺序

```sql
CREATE TABLE train_stops (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  train_id INTEGER NOT NULL,
  station_id INTEGER NOT NULL,
  stop_sequence INTEGER NOT NULL,        -- 停靠顺序（1, 2, 3...）
  arrival_time TEXT,                     -- 到达时间（首站为NULL）
  departure_time TEXT,                   -- 出发时间（末站为NULL）
  stop_duration_min INTEGER DEFAULT 0,   -- 停车时长（分钟）
  distance_from_origin_km INTEGER,       -- 距离起点的公里数
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(train_id, stop_sequence),
  UNIQUE(train_id, station_id),
  FOREIGN KEY (train_id) REFERENCES trains(id),
  FOREIGN KEY (station_id) REFERENCES stations(id)
);

-- 示例数据（G103）
-- (G103, 北京南, 1, NULL, "06:20", 0, 0)
-- (G103, 沧州西, 2, "07:13", "07:15", 2, 120)
-- (G103, 济南西, 3, "08:01", "08:04", 3, 406)
-- ...
```

#### 2️⃣ 车厢配置表 (`train_cars`)
记录每个车次的车厢配置

```sql
CREATE TABLE train_cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  train_id INTEGER NOT NULL,
  car_number INTEGER NOT NULL,           -- 车厢号（1-16）
  car_type TEXT NOT NULL,                -- 车厢类型（商务座/一等座/二等座/餐车）
  total_seats INTEGER NOT NULL,          -- 该车厢总座位数
  seat_layout TEXT,                      -- 座位布局（如 "2+3" 表示2-过道-3）
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(train_id, car_number),
  FOREIGN KEY (train_id) REFERENCES trains(id),
  CHECK (car_type IN ('商务座', '一等座', '二等座', '餐车', '其他'))
);

-- 示例数据（G103）
-- 商务座车厢：1号车，10个座位，布局 "2+1"
-- 一等座车厢：2-3号车，每车64个座位，布局 "2+2"
-- 二等座车厢：4-8, 10-16号车，每车80个座位，布局 "2+3"
```

#### 3️⃣ 实际座位表 (`schedule_seats`)
🔥 **核心表**：记录某天某车次的每个具体座位

```sql
CREATE TABLE schedule_seats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  schedule_id INTEGER NOT NULL,          -- 关联到具体的班次（日期+车次）
  car_number INTEGER NOT NULL,           -- 车厢号
  seat_row INTEGER NOT NULL,             -- 排号（1-20）
  seat_column TEXT NOT NULL,             -- 列号（A/B/C/D/F）
  seat_number TEXT NOT NULL,             -- 完整座位号（如 "01A"）
  seat_type TEXT NOT NULL,               -- 座位类型（商务座/一等座/二等座）
  price REAL NOT NULL,                   -- 全程票价
  status TEXT DEFAULT 'available',       -- 座位状态
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(schedule_id, car_number, seat_number),
  FOREIGN KEY (schedule_id) REFERENCES train_schedules(id),
  CHECK (status IN ('available', 'reserved', 'sold')),
  CHECK (seat_column IN ('A', 'B', 'C', 'D', 'F'))
);

-- 示例：G103 在 2026-01-20 的所有座位
-- schedule_id=5 表示 G103 2026-01-20 这个班次
-- (5, 1, 1, "A", "01A", "商务座", 2318, "available")
-- (5, 1, 1, "C", "01C", "商务座", 2318, "available")
-- (5, 4, 1, "A", "01A", "二等座", 662, "available")
-- ...
```

#### 4️⃣ 座位区间锁定表 (`seat_segments`)
🔥 **核心表**：记录座位在哪些区间被锁定

```sql
CREATE TABLE seat_segments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  seat_id INTEGER NOT NULL,              -- 关联到具体座位
  order_id INTEGER NOT NULL,             -- 关联到订单
  from_stop_seq INTEGER NOT NULL,        -- 起始站序号
  to_stop_seq INTEGER NOT NULL,          -- 终点站序号
  status TEXT DEFAULT 'reserved',        -- 锁定状态
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (seat_id) REFERENCES schedule_seats(id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  CHECK (status IN ('reserved', 'confirmed', 'cancelled')),
  CHECK (to_stop_seq > from_stop_seq)
);

-- 示例：
-- 座位 seat_id=1234 (G103 2026-01-20 1车01A)
-- 订单A: 北京南(seq=1) → 济南西(seq=3)
-- (1234, orderA, 1, 3, "confirmed")

-- 订单B: 济南西(seq=3) → 上海虹桥(seq=9)
-- (1234, orderB, 3, 9, "confirmed")  ✅ 允许！区间不重叠

-- 订单C: 徐州东(seq=4) → 南京南(seq=7)
-- (1234, orderC, 4, 7, "reserved")   ❌ 拒绝！与订单B冲突
```

#### 5️⃣ 分段票价表 (`train_segment_prices`)
记录不同区间的票价（可选，初期可简化为全程票价）

```sql
CREATE TABLE train_segment_prices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  train_id INTEGER NOT NULL,
  from_stop_seq INTEGER NOT NULL,
  to_stop_seq INTEGER NOT NULL,
  seat_type TEXT NOT NULL,
  price REAL NOT NULL,
  distance_km INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(train_id, from_stop_seq, to_stop_seq, seat_type),
  FOREIGN KEY (train_id) REFERENCES trains(id),
  CHECK (to_stop_seq > from_stop_seq)
);

-- 示例：G103 北京南(1) → 济南西(3) 二等座 185元
-- (G103, 1, 3, "二等座", 185, 406)
```

#### 6️⃣ 订单表改进 (`orders`)
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_number TEXT UNIQUE NOT NULL,
  user_id INTEGER NOT NULL,
  schedule_id INTEGER NOT NULL,          -- 关联到班次
  from_stop_seq INTEGER NOT NULL,        -- 🆕 起始站序号
  to_stop_seq INTEGER NOT NULL,          -- 🆕 终点站序号
  total_price REAL NOT NULL,
  status TEXT DEFAULT 'unpaid',
  payment_method TEXT,
  payment_time DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (schedule_id) REFERENCES train_schedules(id),
  CHECK (status IN ('unpaid', 'paid', 'cancelled', 'refunded')),
  CHECK (to_stop_seq > from_stop_seq)
);
```

#### 7️⃣ 订单座位关联表 (`order_seats`)
```sql
CREATE TABLE order_seats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  seat_id INTEGER NOT NULL,              -- 🆕 关联到具体座位
  passenger_id INTEGER NOT NULL,         -- 🆕 关联到乘客
  passenger_name TEXT NOT NULL,
  passenger_id_number TEXT NOT NULL,
  seat_type TEXT NOT NULL,
  car_number INTEGER NOT NULL,           -- 🆕 明确车厢号
  seat_number TEXT NOT NULL,             -- 🆕 明确座位号
  price REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(order_id, passenger_id),        -- 一个订单中，一个乘客只能有一个座位
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (seat_id) REFERENCES schedule_seats(id),
  FOREIGN KEY (passenger_id) REFERENCES passengers(id)
);
```

---

## 🧮 区间座位管理算法

### 核心逻辑：区间冲突检测

#### 算法1：检查座位是否可用
```sql
-- 检查座位在指定区间 [from_seq, to_seq) 是否可用
-- 冲突条件：存在已锁定区间 [locked_from, locked_to)，使得
-- locked_from < to_seq AND locked_to > from_seq
-- （即两个区间有交集）

SELECT COUNT(*) as conflicts
FROM seat_segments ss
WHERE ss.seat_id = ?
  AND ss.status IN ('reserved', 'confirmed')
  AND ss.from_stop_seq < ?   -- to_seq
  AND ss.to_stop_seq > ?;    -- from_seq

-- 如果 conflicts = 0，说明座位可用
```

**示例**：
```
查询区间: [3, 9]  (济南西 → 上海虹桥)

已锁定区间1: [1, 3]  (北京南 → 济南西)
- locked_from(1) < to_seq(9) ✅
- locked_to(3) > from_seq(3) ❌  -> 无冲突 ✅

已锁定区间2: [4, 7]  (徐州东 → 南京南)
- locked_from(4) < to_seq(9) ✅
- locked_to(7) > from_seq(3) ✅  -> 有冲突 ❌
```

#### 算法2：查询可用座位
```sql
-- 查询某班次在指定区间内的所有可用座位
SELECT 
  ss.id as seat_id,
  ss.car_number,
  ss.seat_number,
  ss.seat_type,
  ss.price
FROM schedule_seats ss
WHERE ss.schedule_id = ?
  AND ss.seat_type = ?
  AND ss.status = 'available'
  AND NOT EXISTS (
    SELECT 1
    FROM seat_segments seg
    WHERE seg.seat_id = ss.id
      AND seg.status IN ('reserved', 'confirmed')
      AND seg.from_stop_seq < ?   -- to_seq
      AND seg.to_stop_seq > ?     -- from_seq
  )
ORDER BY ss.car_number, ss.seat_number
LIMIT ?;
```

#### 算法3：计算余票数量
```sql
-- 计算某席别在指定区间内的余票数量
SELECT COUNT(*) as available_count
FROM schedule_seats ss
WHERE ss.schedule_id = ?
  AND ss.seat_type = ?
  AND ss.status = 'available'
  AND NOT EXISTS (
    SELECT 1
    FROM seat_segments seg
    WHERE seg.seat_id = ss.id
      AND seg.status IN ('reserved', 'confirmed')
      AND seg.from_stop_seq < ?   -- to_seq
      AND seg.to_stop_seq > ?     -- from_seq
  );
```

---

## 📝 实现步骤

### Phase 1: 数据库迁移（破坏性变更）
```sql
-- 1. 创建新表
CREATE TABLE train_stops (...);
CREATE TABLE train_cars (...);
CREATE TABLE schedule_seats (...);
CREATE TABLE seat_segments (...);
CREATE TABLE train_segment_prices (...);

-- 2. 修改现有表
ALTER TABLE orders ADD COLUMN from_stop_seq INTEGER;
ALTER TABLE orders ADD COLUMN to_stop_seq INTEGER;

-- 3. 数据迁移（如有旧数据需要迁移）
-- ... 迁移脚本 ...

-- 4. 删除旧表（可选）
-- DROP TABLE train_seats;  -- 旧的座位管理表
```

### Phase 2: 导入车次数据
```javascript
// 从 车次信息.json 导入数据
import trainData from './车次信息.json';

for (const train of trainData) {
  // 1. 插入车次基本信息
  const trainId = await insertTrain(train);
  
  // 2. 插入停靠站信息
  for (const stop of train.stops) {
    await insertTrainStop(trainId, stop);
  }
  
  // 3. 插入车厢配置
  for (const car of train.cars) {
    await insertTrainCar(trainId, car);
  }
  
  // 4. 插入分段票价（如果有）
  if (train.fares.segments) {
    for (const segment of train.fares.segments) {
      await insertSegmentPrice(trainId, segment);
    }
  }
}
```

### Phase 3: 座位初始化
```javascript
// 为每个班次生成座位
async function generateSeatsForSchedule(scheduleId) {
  const schedule = await getSchedule(scheduleId);
  const trainCars = await getTrainCars(schedule.train_id);
  
  for (const car of trainCars) {
    if (car.car_type === '餐车') continue;
    
    // 根据车厢类型和座位布局生成座位
    const seats = generateSeatLayout(car);
    
    for (const seat of seats) {
      await db.run(`
        INSERT INTO schedule_seats (
          schedule_id, car_number, seat_row, seat_column,
          seat_number, seat_type, price, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'available')
      `, scheduleId, car.car_number, seat.row, seat.column,
         seat.number, car.car_type, getPrice(car.car_type));
    }
  }
}

// 座位号生成规则
function generateSeatLayout(car) {
  const seats = [];
  const layout = getSeatLayout(car.car_type);
  // 商务座: 2+1，每排3座，列号 AC/F
  // 一等座: 2+2，每排4座，列号 AC/DF
  // 二等座: 2+3，每排5座，列号 ABCDF
  
  const rows = Math.ceil(car.total_seats / layout.seatsPerRow);
  
  for (let row = 1; row <= rows; row++) {
    for (const col of layout.columns) {
      seats.push({
        row,
        column: col,
        number: `${row.toString().padStart(2, '0')}${col}`
      });
    }
  }
  
  return seats;
}
```

### Phase 4: 订单提交逻辑改造
```javascript
async function submitOrder(userId, orderData) {
  const { scheduleId, fromStopSeq, toStopSeq, passengers } = orderData;
  
  // 1. 查找可用座位
  const availableSeats = await findAvailableSeats(
    scheduleId,
    fromStopSeq,
    toStopSeq,
    passengers.length,
    orderData.seatType
  );
  
  if (availableSeats.length < passengers.length) {
    return { success: false, message: '余票不足' };
  }
  
  // 2. 创建订单
  const orderId = await createOrder(userId, scheduleId, fromStopSeq, toStopSeq);
  
  // 3. 锁定座位（创建区间锁定记录）
  for (let i = 0; i < passengers.length; i++) {
    const seat = availableSeats[i];
    const passenger = passengers[i];
    
    // 3.1 创建订单座位关联
    await db.run(`
      INSERT INTO order_seats (
        order_id, seat_id, passenger_id, passenger_name,
        passenger_id_number, seat_type, car_number, seat_number, price
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, orderId, seat.id, passenger.id, passenger.name,
       passenger.idNumber, seat.seat_type, seat.car_number,
       seat.seat_number, seat.price);
    
    // 3.2 创建区间锁定记录
    await db.run(`
      INSERT INTO seat_segments (
        seat_id, order_id, from_stop_seq, to_stop_seq, status
      ) VALUES (?, ?, ?, ?, 'reserved')
    `, seat.id, orderId, fromStopSeq, toStopSeq);
  }
  
  return {
    success: true,
    orderId,
    seats: availableSeats.map(s => ({
      carNumber: s.car_number,
      seatNumber: s.seat_number
    }))
  };
}
```

---

## ❓ 需要讨论的问题

### 问题1：座位号生成规则
**现状**：车次信息.json 中只有车厢类型，没有具体的座位布局。

**建议方案**：
```javascript
// 标准座位布局
const SEAT_LAYOUTS = {
  '商务座': {
    seatsPerRow: 3,
    columns: ['A', 'C', 'F'],  // 2+1布局
    rowsPerCar: 10              // 假设每车10排=30座
  },
  '一等座': {
    seatsPerRow: 4,
    columns: ['A', 'C', 'D', 'F'],  // 2+2布局
    rowsPerCar: 16                  // 假设每车16排=64座
  },
  '二等座': {
    seatsPerRow: 5,
    columns: ['A', 'B', 'C', 'D', 'F'],  // 2+3布局（B在中间，无E）
    rowsPerCar: 20                       // 假设每车20排=100座（实际可能80座）
  }
};
```

**问题**：
- ✅ 需要确认：每种车型的实际座位布局是否标准？
- ✅ 需要确认：每节车厢的实际座位数量？
- ✅ 是否需要支持自定义布局？

---

### 问题2：座位分配策略
当有多个可用座位时，应该如何选择？

**方案A：顺序分配**
- 按车厢号+座位号顺序分配
- 优点：简单，确定性强
- 缺点：可能导致座位分散

**方案B：连号优先**
- 尽量分配连续座位
- 优点：同行乘客坐在一起
- 缺点：算法复杂

**方案C：均匀分布**
- 在整个列车中均匀分配
- 优点：车厢负载均衡
- 缺点：可能分散

**建议**：Phase 1 使用方案A（顺序分配），Phase 2 优化为方案B（连号优先）。

---

### 问题3：订单超时处理
**场景**：用户提交订单但20分钟内未支付，座位应该释放。

**当前实现**：
- 订单表有 `expires_at` 字段
- 但座位锁定记录（seat_segments）没有自动清理机制

**改进方案**：

#### 方案A：定时任务清理
```javascript
// 每分钟执行一次
setInterval(async () => {
  const now = new Date();
  
  // 1. 查找超时订单
  const expiredOrders = await db.all(`
    SELECT id FROM orders
    WHERE status = 'unpaid'
      AND expires_at < ?
  `, now.toISOString());
  
  // 2. 释放座位
  for (const order of expiredOrders) {
    await db.run(`
      UPDATE seat_segments
      SET status = 'cancelled'
      WHERE order_id = ? AND status = 'reserved'
    `, order.id);
    
    await db.run(`
      UPDATE orders
      SET status = 'cancelled'
      WHERE id = ?
    `, order.id);
  }
}, 60 * 1000);
```

#### 方案B：查询时过滤
```sql
-- 查询可用座位时，自动过滤超时的预订
SELECT ...
FROM schedule_seats ss
WHERE NOT EXISTS (
  SELECT 1
  FROM seat_segments seg
  JOIN orders o ON seg.order_id = o.id
  WHERE seg.seat_id = ss.id
    AND seg.status = 'reserved'
    AND (o.status = 'paid' OR o.expires_at > CURRENT_TIMESTAMP)
    -- 只排除已支付或未超时的预订
);
```

**建议**：结合使用两种方案。

---

### 问题4：退票处理
**场景**：用户支付后申请退票，座位应该释放。

**实现**：
```javascript
async function refundOrder(orderId) {
  // 1. 更新订单状态
  await db.run(`
    UPDATE orders
    SET status = 'refunded'
    WHERE id = ?
  `, orderId);
  
  // 2. 释放座位锁定
  await db.run(`
    UPDATE seat_segments
    SET status = 'cancelled'
    WHERE order_id = ? AND status = 'confirmed'
  `, orderId);
  
  // 3. 更新座位状态为可用
  await db.run(`
    UPDATE schedule_seats
    SET status = 'available'
    WHERE id IN (
      SELECT seat_id FROM order_seats WHERE order_id = ?
    )
  `, orderId);
}
```

---

### 问题5：数据量和性能
**估算**：
- 车次数量：~100 个
- 每个车次：~16 节车厢
- 每节车厢：~80 个座位
- 每天生成座位：100 × 16 × 80 = 128,000 个座位记录
- 30天数据：3,840,000 个座位记录

**优化建议**：
1. **索引优化**
   ```sql
   CREATE INDEX idx_schedule_seats_lookup 
   ON schedule_seats(schedule_id, seat_type, status);
   
   CREATE INDEX idx_seat_segments_conflict 
   ON seat_segments(seat_id, from_stop_seq, to_stop_seq, status);
   ```

2. **分区策略**（SQLite 不支持分区，可考虑应用层实现）
   - 按日期范围清理旧数据
   - 只保留未来30天的座位数据

3. **缓存策略**
   - 缓存余票数量（Redis）
   - 定期更新（每分钟）

---

### 问题6：并发控制
**场景**：多个用户同时抢购最后一张票。

**解决方案**：使用数据库事务 + 乐观锁

```javascript
async function reserveSeat(seatId, orderId, fromSeq, toSeq) {
  try {
    await db.run('BEGIN TRANSACTION');
    
    // 1. 再次检查座位是否可用（防止并发冲突）
    const conflicts = await db.get(`
      SELECT COUNT(*) as count
      FROM seat_segments
      WHERE seat_id = ?
        AND status IN ('reserved', 'confirmed')
        AND from_stop_seq < ?
        AND to_stop_seq > ?
    `, seatId, toSeq, fromSeq);
    
    if (conflicts.count > 0) {
      await db.run('ROLLBACK');
      return { success: false, message: '座位已被预订' };
    }
    
    // 2. 创建锁定记录
    await db.run(`
      INSERT INTO seat_segments (seat_id, order_id, from_stop_seq, to_stop_seq, status)
      VALUES (?, ?, ?, ?, 'reserved')
    `, seatId, orderId, fromSeq, toSeq);
    
    await db.run('COMMIT');
    return { success: true };
    
  } catch (error) {
    await db.run('ROLLBACK');
    throw error;
  }
}
```

---

## 🎯 实施优先级

### P0 - 必须实现（核心功能）
- ✅ `train_stops` 表 - 停靠站管理
- ✅ `schedule_seats` 表 - 具体座位管理
- ✅ `seat_segments` 表 - 区间锁定管理
- ✅ 区间冲突检测算法
- ✅ 订单提交时座位分配

### P1 - 应该实现（用户体验）
- ✅ `train_cars` 表 - 车厢配置
- ✅ 座位号生成规则
- ✅ 连号座位分配
- ✅ 订单超时自动释放
- ✅ 余票数量实时计算

### P2 - 可以实现（优化功能）
- ⚪ `train_segment_prices` 表 - 分段票价
- ⚪ 座位选择功能（让用户选座）
- ⚪ 余票数量缓存
- ⚪ 数据归档策略

---

## 📊 数据库 ER 图

```
trains (车次) 
  ├─ train_stops (停靠站) 
  ├─ train_cars (车厢配置)
  └─ train_schedules (班次)
       └─ schedule_seats (座位)
            └─ seat_segments (区间锁定)
                 └─ orders (订单)
                      └─ order_seats (订单座位)
```

---

## 📝 下一步行动

### 需要您确认的事项：
1. ✅ **座位布局规则**：是否采用上述标准布局？
2. ✅ **座位分配策略**：是否先实现顺序分配？
3. ✅ **数据迁移计划**：是否接受破坏性变更（清空现有订单数据）？
4. ✅ **实施范围**：是否先实现 P0 核心功能？
5. ✅ **测试数据**：是否需要生成测试订单验证区间锁定逻辑？

### 我可以立即开始：
- 🔧 创建数据库迁移脚本
- 🔧 实现车次数据导入工具
- 🔧 实现座位初始化脚本
- 🔧 改造订单提交逻辑
- 🔧 编写测试用例

**请您确认方案，然后我们开始实施！** 🚀
