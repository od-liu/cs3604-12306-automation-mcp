# 🎫 座位管理系统快速启动指南

## 🚀 一键初始化

### 方法1：完整初始化（推荐）
```bash
cd backend/src/database
node setup_complete_system.js
```

**执行内容**：
1. ✅ 创建新表（train_stops, train_cars, schedule_seats, seat_segments）
2. ✅ 导入车次数据（从 车次信息.json）
3. ✅ 生成未来30天的班次和座位

**预计时间**：2-5分钟

---

### 方法2：分步执行

#### Step 1: 数据库迁移
```bash
cd backend/src/database
node migrate_seat_system.js
```

#### Step 2: 导入车次数据
```bash
cd backend/src/database
node import_train_data.js
```

#### Step 3: 生成座位
```bash
cd backend/src/database

# 方式A: 生成未来30天
node generate_seats.js future 30

# 方式B: 为所有现有班次生成
node generate_seats.js all

# 方式C: 为指定班次生成
node generate_seats.js schedule 1
```

---

## 📊 验证系统

### 检查数据
```bash
cd backend
sqlite3 database.db
```

```sql
-- 检查车次数量
SELECT COUNT(*) as train_count FROM trains;

-- 检查停靠站
SELECT t.train_number, COUNT(*) as stop_count
FROM train_stops ts
JOIN trains t ON ts.train_id = t.id
GROUP BY t.train_number;

-- 检查班次数量
SELECT COUNT(*) as schedule_count FROM train_schedules;

-- 检查座位数量
SELECT 
  ss.seat_type,
  COUNT(*) as seat_count
FROM schedule_seats ss
GROUP BY ss.seat_type;

-- 检查某个班次的座位
SELECT 
  car_number,
  seat_type,
  COUNT(*) as count
FROM schedule_seats
WHERE schedule_id = 1
GROUP BY car_number, seat_type;

-- 检查某个座位的锁定情况
SELECT * FROM seat_segments WHERE seat_id = 1;
```

---

## 🧪 测试用例

### 测试1: 区间座位复用
```javascript
// 订单A: 北京南 → 济南西
const orderA = await submitOrderV2(1, {
  trainNumber: 'G103',
  departureDate: '2026-01-20',
  fromStation: '北京南',
  toStation: '济南西',
  passengers: [
    { name: '张三', idType: '居民身份证', idNumber: '110101199001011234', 
      ticketType: '成人票', seatClass: '二等座', passengerId: 1 }
  ]
});

// 订单B: 济南西 → 上海虹桥（应该可以使用同一座位）
const orderB = await submitOrderV2(2, {
  trainNumber: 'G103',
  departureDate: '2026-01-20',
  fromStation: '济南西',
  toStation: '上海虹桥',
  passengers: [
    { name: '李四', idType: '居民身份证', idNumber: '110101199002021234', 
      ticketType: '成人票', seatClass: '二等座', passengerId: 2 }
  ]
});

console.log('订单A座位:', orderA.seats[0]); // 例如: 4车01A
console.log('订单B座位:', orderB.seats[0]); // 可能是: 4车01A（同一座位！）
```

**预期结果**：
- ✅ 两个订单都成功
- ✅ 可能使用同一座位（因为区间不重叠）

---

### 测试2: 区间冲突检测
```javascript
// 订单A: 北京南 → 南京南
const orderA = await submitOrderV2(1, {
  trainNumber: 'G103',
  departureDate: '2026-01-20',
  fromStation: '北京南',
  toStation: '南京南',
  passengers: [/* ... */]
});

// 订单B: 济南西 → 上海虹桥（与订单A冲突）
const orderB = await submitOrderV2(2, {
  trainNumber: 'G103',
  departureDate: '2026-01-20',
  fromStation: '济南西',
  toStation: '上海虹桥',
  passengers: [/* ... */]
});
```

**预期结果**：
- ✅ 订单A成功，锁定座位在区间 [1, 7]
- ❌ 订单B失败（如果尝试使用同一座位），因为区间 [3, 9] 与 [1, 7] 有交集

---

### 测试3: 订单超时释放
```javascript
// 1. 提交订单
const order = await submitOrderV2(1, { /* ... */ });

// 2. 等待20分钟（模拟超时）
// 或者手动修改数据库中的 expires_at

// 3. 执行清理任务
await cleanupExpiredSeatLocks();

// 4. 检查座位状态
const segments = await getSeatSegments(order.seats[0].seatId);
console.log(segments); // status 应该是 'cancelled'
```

**预期结果**：
- ✅ 超时订单状态变为 'cancelled'
- ✅ 座位锁定状态变为 'cancelled'
- ✅ 其他用户可以预订该座位

---

## 📝 API使用说明

### 旧API（向后兼容）
```javascript
// 提交订单 - 使用旧逻辑（不推荐）
POST /api/orders/submit

// 缺点：
// - 座位号随机生成
// - 没有区间管理
// - 可能出现座位冲突
```

### 新API（推荐使用）
```javascript
// 提交订单 - 使用新的座位管理系统
POST /api/orders/submit-v2

// 优点：
// - 精确分配座位
// - 支持区间座位复用
// - 并发安全
```

---

## 🔄 数据迁移说明

### ⚠️ 注意事项
1. **破坏性变更**：新系统与旧系统不兼容
2. **数据清理**：建议清空现有订单数据
3. **测试环境**：先在测试环境验证

### 迁移步骤
```bash
# 1. 备份数据库（可选）
cp backend/database.db backend/database.db.backup

# 2. 清理旧数据（可选）
sqlite3 backend/database.db "DELETE FROM order_passengers;"
sqlite3 backend/database.db "DELETE FROM orders;"

# 3. 运行完整初始化
cd backend/src/database
node setup_complete_system.js

# 4. 验证数据
sqlite3 backend/database.db "SELECT COUNT(*) FROM schedule_seats;"
```

---

## 🐛 常见问题

### 问题1: 车次信息.json 文件未找到
**错误**：`ENOENT: no such file or directory`

**解决**：
```bash
# 检查文件路径
ls "/Users/od/Desktop/cs3604-12306-automation-mcp/ 车次信息.json"

# 如果文件名不同，修改 import_train_data.js 中的路径
```

---

### 问题2: 座位生成失败
**错误**：`车次 G103 没有车厢配置`

**原因**：车厢配置未导入

**解决**：
```bash
# 重新导入车次数据
cd backend/src/database
node import_train_data.js
```

---

### 问题3: 余票数量为0
**原因**：座位未生成或查询逻辑错误

**检查**：
```sql
-- 检查是否有座位
SELECT COUNT(*) FROM schedule_seats WHERE schedule_id = 1;

-- 检查座位锁定情况
SELECT * FROM seat_segments WHERE seat_id IN (
  SELECT id FROM schedule_seats WHERE schedule_id = 1 LIMIT 5
);
```

---

## 📈 性能优化建议

### 已实现
- ✅ 数据库索引（schedule_seats, seat_segments）
- ✅ SQL查询优化（EXISTS 子查询）
- ✅ 事务处理（防止并发冲突）

### 可选优化
1. **Redis缓存余票数量**
   ```javascript
   // 缓存键: `tickets:${scheduleId}:${fromSeq}:${toSeq}:${seatType}`
   // 缓存时长: 60秒
   // 定时更新: 每分钟刷新
   ```

2. **分区清理策略**
   ```javascript
   // 每天清理7天前的 schedule_seats 数据
   // 保留 orders 数据30天
   ```

3. **批量座位生成**
   ```javascript
   // 使用 INSERT INTO ... SELECT ...
   // 一次性插入整车的座位
   ```

---

## 📚 相关文档

- `DATABASE_REDESIGN_PROPOSAL.md` - 完整设计方案
- `ROUTING_VERIFICATION.md` - 页面跳转验证

---

**最后更新**：2026-01-19
