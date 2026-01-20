# 🔧 订单提交失败和余票数显示问题 - 修复报告

## 🎯 问题诊断

### **问题1：订单提交失败**

**终端错误**：
```
📝 [订单提交] 使用V1(旧系统)版本
提交订单失败: [Error: SQLITE_ERROR: table orders has no column named train_number] {
  errno: 1,
  code: 'SQLITE_ERROR'
}
```

**根本原因**：
- 用户修改了 `operations.js` 的 INSERT 语句，添加了 `train_number`, `from_station`, `to_station`, `departure_date`, `departure_time`, `arrival_time` 等字段
- 但数据库的 `orders` 表并没有这些列
- SQL 语句执行失败

---

### **问题2：余票数不准确**

**用户反馈**：
> "核对弹窗里显示的余票数目不准确，应该是车次在用户选择的出发站和到达站之间都为空闲状态的座位之总和，是一个随着订票展开而动态变化的量"

**根本原因**：
- 余票数来自 OrderFillPage 传递的静态数据（trainData.prices）
- 这些数据是最初搜索车次时的结果，不是实时的
- 不能反映区间座位的实际可用情况
- 不会随着订票动态更新

---

## ✅ **修复方案**

### **修复1：回退 INSERT 语句**

**数据库 orders 表结构**：
```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT UNIQUE NOT NULL,
    user_id INTEGER NOT NULL,
    schedule_id INTEGER NOT NULL,
    total_price REAL NOT NULL,
    status TEXT DEFAULT 'unpaid',
    payment_method TEXT,
    payment_time DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,
    from_stop_seq INTEGER,
    to_stop_seq INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (schedule_id) REFERENCES train_schedules(id),
    CHECK (status IN ('unpaid', 'paid', 'cancelled', 'refunded', 'completed'))
);
```

**修复后的代码** (`operations.js`):
```javascript
const orderResult = await db.runAsync(`
  INSERT INTO orders (
    order_number, user_id, schedule_id, total_price,
    status, created_at, expires_at
  )
  VALUES (?, ?, ?, ?, ?, ?, ?)
`,
  orderNumber, userId, schedule.id, totalPrice,
  'unpaid', now.toISOString(), expiresAt.toISOString()
);

const orderId = orderResult.lastID;
```

**✅ 只使用数据库实际存在的字段**

---

### **修复2：实时余票数 API**

**新增 API 端点**：`GET /api/trains/available-seats`

**功能**：
- 根据车次号、出发日期、起止站查询实时区间可用座位
- 使用 V2 系统的 `countAvailableSeats` 函数
- 计算在指定区间内连续可用的座位数

**实现** (`backend/src/routes/api.js`):
```javascript
router.get('/api/trains/available-seats', async (req, res) => {
  const { trainNumber, departureDate, fromStation, toStation } = req.query;
  
  // 1. 获取车次ID
  const train = await db.getAsync(`
    SELECT id FROM trains WHERE train_number = ?
  `, trainNumber);
  
  // 2. 获取班次ID
  const schedule = await db.getAsync(`
    SELECT id FROM train_schedules 
    WHERE train_id = ? AND departure_date = ?
  `, train.id, departureDate);
  
  // 3. 获取起止站点序号
  const fromStop = await db.getAsync(`...`);
  const toStop = await db.getAsync(`...`);
  
  // 4. 使用 V2 系统计算区间可用座位
  const businessClassCount = await countAvailableSeats(
    schedule.id,
    fromStop.stop_sequence,
    toStop.stop_sequence,
    '商务座'
  );
  
  const firstClassCount = await countAvailableSeats(..., '一等座');
  const secondClassCount = await countAvailableSeats(..., '二等座');
  
  return res.json({
    success: true,
    data: {
      businessClass: businessClassCount,
      firstClass: firstClassCount,
      secondClass: secondClassCount
    }
  });
});
```

---

### **修复3：前端动态获取余票**

**OrderConfirmModal.tsx** 修改：

```typescript
const OrderConfirmModal: React.FC<OrderConfirmModalProps> = ({
  trainInfo,
  passengers,
  seatAvailability: initialSeatAvailability,  // 重命名为 initialSeatAvailability
  onClose,
  onConfirm,
  isSubmitting: isSubmittingProp = false
}) => {
  // 🆕 实时余票数状态（动态更新）
  const [seatAvailability, setSeatAvailability] = useState(initialSeatAvailability);
  const [loadingSeats, setLoadingSeats] = useState(true);
  
  // 🆕 获取实时余票数
  useEffect(() => {
    const fetchAvailableSeats = async () => {
      try {
        setLoadingSeats(true);
        
        // 提取纯日期格式
        const pureDepartureDate = trainInfo.date.split('（')[0].split('(')[0].trim();
        
        const params = new URLSearchParams({
          trainNumber: trainInfo.trainNo,
          departureDate: pureDepartureDate,
          fromStation: trainInfo.departureStation,
          toStation: trainInfo.arrivalStation
        });
        
        const response = await fetch(`/api/trains/available-seats?${params.toString()}`);
        const data = await response.json();
        
        if (data.success) {
          console.log(`🎫 [订单确认] 获取实时余票:`, data.data);
          setSeatAvailability(data.data);
        }
      } catch (error) {
        console.error('❌ [订单确认] 获取余票错误:', error);
      } finally {
        setLoadingSeats(false);
      }
    };
    
    fetchAvailableSeats();
  }, [trainInfo]);
  
  // ...
  
  return (
    <div className="seat-availability-display">
      {loadingSeats ? (
        <p className="availability-text">正在获取最新余票信息...</p>
      ) : (
        <p className="availability-text">
          本次列车，
          <span>商务座余票 <span className="seat-count">{seatAvailability.businessClass}</span> 张</span>
          <span>，二等座余票 <span className="seat-count">{seatAvailability.secondClass}</span> 张</span>
          <span>，一等座余票 <span className="seat-count">{seatAvailability.firstClass}</span> 张</span>。
        </p>
      )}
    </div>
  );
};
```

---

## 🔍 **区间座位计算原理**

### **什么是"区间可用座位"**

用户从 **北京南** 到 **上海虹桥**，中途经过：
```
北京南 (seq=1) → 济南西 (seq=2) → 南京南 (seq=3) → 上海虹桥 (seq=4)
```

一个座位是"可用"的，当且仅当：
- 该座位在 **所有中间站** 都是空闲的
- seq=1 → seq=4 的整个区间都没有被锁定

### **countAvailableSeats 函数**

```javascript
export async function countAvailableSeats(scheduleId, fromStopSeq, toStopSeq, seatType) {
  const result = await db.getAsync(`
    SELECT COUNT(*) as count
    FROM schedule_seats ss
    WHERE ss.schedule_id = ?
      AND ss.seat_type = ?
      AND ss.status = 'available'
      AND NOT EXISTS (
        SELECT 1
        FROM seat_segments seg
        WHERE seg.seat_id = ss.id
          AND seg.status IN ('reserved', 'confirmed')
          AND seg.from_stop_seq < ?      -- 锁定区间的起点 < 查询区间的终点
          AND seg.to_stop_seq > ?        -- 锁定区间的终点 > 查询区间的起点
      )
  `, scheduleId, seatType, toStopSeq, fromStopSeq);
  
  return result.count;
}
```

**逻辑**：
1. 选择指定班次、座位类型、状态为可用的座位
2. 排除那些已经被锁定且**锁定区间与查询区间有重叠**的座位
3. 重叠判断：`seg.from_stop_seq < toStopSeq AND seg.to_stop_seq > fromStopSeq`

---

## 🚀 **测试步骤**

### **Step 1: 刷新浏览器**

```
Cmd+Shift+R（强制刷新）
```

---

### **Step 2: 搜索车次并预订**

1. 搜索：**北京 → 上海**，日期：**2026-01-21**
2. 点击任意车次的"预订"按钮
3. 选择乘客
4. 点击"提交订单"

---

### **Step 3: 观察订单确认弹窗**

**应该看到**：
- ✅ 弹窗显示"正在获取最新余票信息..."（加载中）
- ✅ 1-2秒后显示实时余票数
- ✅ 例如："商务座余票 **105** 张，二等座余票 **960** 张，一等座余票 **805** 张"

**控制台日志**：
```
🎫 [订单确认] 获取实时余票: {
  businessClass: 105,
  firstClass: 805,
  secondClass: 960
}
```

---

### **Step 4: 提交订单**

**点击"确认无误，提交订单"按钮**

**应该看到**：
- ✅ 订单成功提交
- ✅ 跳转到支付页面
- ✅ 不再显示 SQL 错误

**后端日志**：
```
📝 [订单提交] 使用V1(旧系统)版本
✅ [订单提交] 订单创建成功，订单号: 10
```

---

### **Step 5: 验证余票动态变化**

**操作**：
1. 用户A购买 G103 的 **北京南→上海虹桥** 二等座（1张）
2. 用户B立即查询同一车次的余票

**预期**：
- 用户B看到的二等座余票数应该 **减少1张**
- 例如：从 960 张变成 959 张

**原理**：
- 用户A购票后，`seat_segments` 表增加了1条锁定记录
- `countAvailableSeats` 会排除这个被锁定的座位
- 余票数实时减少

---

## 📊 **修复前后对比**

### **修复前**

| 问题 | 表现 | 根本原因 |
|------|------|---------|
| 订单提交 | ❌ SQL错误 | INSERT语句使用了不存在的列 |
| 余票显示 | ❌ 静态数据 | 使用初始搜索时的余票数 |
| 动态更新 | ❌ 不变化 | 不查询实际可用座位 |

**示例**：
```
用户A看到：二等座余票 960 张
用户B购买1张后
用户A刷新：二等座余票还是 960 张  ← 错误！
```

---

### **修复后**

| 功能 | 表现 | 实现方式 |
|------|------|---------|
| 订单提交 | ✅ 成功 | 使用正确的数据库列 |
| 余票显示 | ✅ 实时 | 调用API获取区间可用座位 |
| 动态更新 | ✅ 准确 | 基于V2系统的座位锁定记录 |

**示例**：
```
用户A打开订单确认弹窗：二等座余票 960 张
用户B购买1张
用户A打开另一个弹窗：二等座余票 959 张  ← 正确！
```

---

## 🎯 **核心改进**

### **1. 订单提交稳定性**

```
修复前：
提交订单 → SQL错误 → 订单创建失败 ❌

修复后：
提交订单 → 成功创建 → 跳转支付页 ✅
```

---

### **2. 余票准确性**

```
修复前：
余票数 = 初始搜索时的总座位数（静态）

修复后：
余票数 = countAvailableSeats(schedule_id, from_seq, to_seq, seat_type)
       = 区间内所有连续可用的座位数（动态）
```

---

### **3. 实时性**

```
修复前：
用户看到的余票 = 10分钟前的数据

修复后：
用户看到的余票 = 当前时刻的实际可用座位数
```

---

## 💡 **未来优化建议**

### **1. 缓存余票数**

**问题**：每次打开弹窗都查询数据库，可能造成性能压力

**优化**：
```javascript
// 在 Redis 中缓存余票数，TTL=5秒
const cacheKey = `seats:${trainNumber}:${date}:${from}:${to}`;
const cached = await redis.get(cacheKey);

if (cached) {
  return JSON.parse(cached);
} else {
  const seats = await countAvailableSeats(...);
  await redis.setex(cacheKey, 5, JSON.stringify(seats));
  return seats;
}
```

---

### **2. WebSocket 实时推送**

**问题**：用户需要刷新才能看到最新余票

**优化**：
```javascript
// 后端：订单提交成功后推送余票变化
io.emit('seats-updated', {
  trainNumber: 'G103',
  date: '2026-01-21',
  seats: { businessClass: 104, firstClass: 804, secondClass: 959 }
});

// 前端：监听余票变化
socket.on('seats-updated', (data) => {
  if (data.trainNumber === currentTrain) {
    setSeatAvailability(data.seats);
  }
});
```

---

### **3. 乐观锁防止超售**

**问题**：多用户同时购票可能导致超售

**优化**：
```javascript
// 提交订单时检查版本号
const seat = await db.getAsync(`
  SELECT version FROM schedule_seats WHERE id = ?
`, seatId);

const result = await db.runAsync(`
  UPDATE schedule_seats 
  SET status = 'locked', version = version + 1
  WHERE id = ? AND version = ?
`, seatId, seat.version);

if (result.changes === 0) {
  throw new Error('座位已被预订，请重新选择');
}
```

---

## 🎉 **成功标志**

修复成功后：

1. **订单确认弹窗**：
   - ✅ 显示"正在获取最新余票信息..."
   - ✅ 1-2秒后显示实时余票数
   - ✅ 余票数是准确的区间可用座位

2. **订单提交**：
   - ✅ 点击"确认"后成功提交
   - ✅ 跳转到支付页面
   - ✅ 无SQL错误

3. **余票动态变化**：
   - ✅ 用户A购票后，用户B看到的余票减少
   - ✅ 反映实际的座位锁定情况

4. **控制台日志**：
   ```
   🎫 [余票查询] G103 北京南→上海虹桥: 商务座105, 一等座805, 二等座960
   🎫 [订单确认] 获取实时余票: {...}
   ✅ [订单提交] 订单创建成功
   ```

---

**最后更新**：2026-01-19
**相关提交**：0419911
**修复的文件**：
- `backend/src/database/operations.js`（回退INSERT语句）
- `backend/src/routes/api.js`（添加余票API）
- `frontend/src/components/OrderFill/OrderConfirmModal.tsx`（动态获取余票）
