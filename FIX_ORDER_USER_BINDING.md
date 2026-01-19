# 🔧 订单用户绑定问题 - 修复报告

## 🎯 问题诊断

### **用户反馈**
> "我使用test555账号购买过多张车票，但在已支付订单界面看不到"

### **数据库实际情况**
```sql
SELECT o.id, o.user_id, u.username 
FROM orders o 
JOIN users u ON o.user_id = u.id;

结果：
订单1-9 → 全部属于 user_id=1 (testuser)
test555 (user_id=3) → 0个订单
```

---

## ❌ **根本原因**

### **问题1：前端没有发送用户ID**

**OrderConfirmModal.tsx (旧代码)**：
```javascript
const response = await fetch('/api/orders/submit', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json'
    // ❌ 缺少 'X-User-Id' header
  },
  body: JSON.stringify({
    trainNumber: '...',
    passengers: [...]
    // ❌ 没有 userId 字段
  })
});
```

---

### **问题2：后端默认使用 userId=1**

**api.js (旧代码，第627行)**：
```javascript
const userId = req.headers['x-user-id'] || req.session?.userId || 1;
                                                                   ↑
                                                            默认值硬编码为1
```

**执行流程**：
```
test555 登录 → 点击购票 → 提交订单
  ↓
前端没有发送 userId
  ↓
后端: req.headers['x-user-id'] = undefined
后端: req.session?.userId = undefined
后端: 使用默认值 userId = 1 (testuser)
  ↓
订单被创建为 testuser 的订单 ❌
  ↓
test555 在订单列表看不到 ❌
```

---

## ✅ **修复方案**

### **修复1：前端发送用户ID**

**OrderConfirmModal.tsx (新代码)**：
```javascript
// 🔧 从 localStorage 获取当前登录用户ID
const userId = localStorage.getItem('userId');

if (!userId) {
  alert('请先登录！');
  setIsSubmitting(false);
  return;
}

console.log('👤 [订单确认] 当前用户ID:', userId);

const response = await fetch('/api/orders/submit', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'X-User-Id': userId  // 🆕 发送用户ID
  },
  body: JSON.stringify({
    // ...
  })
});
```

---

### **修复2：后端强制要求用户ID**

**api.js (新代码)**：
```javascript
// 从 header 或 session 获取用户ID
const userId = req.headers['x-user-id'] || req.session?.userId;

// 🔧 如果没有用户ID，返回401错误（不再默认使用1）
if (!userId) {
  console.error('❌ [订单提交] 未登录或缺少用户ID');
  return res.status(401).json({
    success: false,
    message: '请先登录'
  });
}

console.log('👤 [订单提交] 用户ID:', userId);
```

**修复后的流程**：
```
test555 登录 → 点击购票 → 提交订单
  ↓
前端: localStorage.getItem('userId') = '3'
前端: 在 header 中发送 X-User-Id: 3
  ↓
后端: req.headers['x-user-id'] = '3'
后端: userId = 3 ✅
  ↓
订单被创建为 test555 (user_id=3) 的订单 ✅
  ↓
test555 在订单列表能看到自己的订单 ✅
```

---

## 🚀 **测试修复**

### **Step 1: 刷新浏览器**

```
Cmd+Shift+R (Mac) 或 Ctrl+Shift+R (Windows)
```

---

### **Step 2: 确认登录状态**

打开浏览器控制台（F12），运行：

```javascript
console.log('userId:', localStorage.getItem('userId'));
console.log('username:', localStorage.getItem('username'));
```

**如果当前是 test555 登录**：
```
userId: "3"
username: "嗷嗷"
```

**如果不是，请重新登录 test555**。

---

### **Step 3: 购买一张新车票**

1. **搜索车次**：
   ```
   出发地：北京
   目的地：上海
   日期：2026-01-20（明天）
   ```

2. **点击预订按钮**

3. **添加乘客**（test555账户的乘客）

4. **提交订单**

5. **观察控制台日志**：
   ```
   👤 [订单确认] 当前用户ID: 3  ← 前端获取到正确的userId
   📤 [订单确认] 提交订单请求: {...}
   ```

6. **支付订单**

---

### **Step 4: 查看订单列表**

1. **进入个人中心 → 我的订单**

2. **应该能看到刚才创建的订单** ✅

3. **控制台日志**：
   ```
   📋 [订单历史] 获取订单列表, userId: 3
   ✅ [订单历史] 获取到 1 个订单  ← 新订单
   ```

---

### **Step 5: 验证数据库**

```bash
cd /Users/od/Desktop/cs3604-12306-automation-mcp

# 查看最新订单
sqlite3 backend/database.db "
SELECT o.id, o.user_id, u.username, u.name, o.status
FROM orders o
JOIN users u ON o.user_id = u.id
ORDER BY o.created_at DESC
LIMIT 3;
"
```

**预期结果**：
```
订单ID | 用户ID | 用户名   | 姓名 | 状态
10     | 3      | test555  | 嗷嗷 | paid   ← 新订单，user_id=3 ✅
9      | 1      | testuser | 张三 | paid
8      | 1      | testuser | 张三 | paid
```

---

## ⚠️ **重要说明**

### **旧订单无法恢复**

**test555 之前购买的车票**已经被错误地记录为 **testuser (user_id=1)** 的订单。

**原因**：
- 数据库中所有订单的 `user_id` 字段都是 `1`
- 没有其他字段可以追溯到实际的购买者

**无法恢复的原因**：
```sql
-- 订单表结构
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,  -- 所有旧订单都是1，无法区分
  train_id INTEGER,
  ...
);

-- 没有 IP 地址、session ID 等其他追溯信息
```

**影响**：
- ✅ 修复后的新订单会正确绑定
- ❌ 修复前的所有订单（1-9）都属于 testuser
- ❌ test555 需要重新购票才能看到自己的订单

---

### **如果需要手动迁移旧订单**

**⚠️ 仅在确认旧订单确实属于 test555 时执行**

```bash
cd /Users/od/Desktop/cs3604-12306-automation-mcp

# 假设订单8、9属于test555（需要你确认）
sqlite3 backend/database.db "
UPDATE orders 
SET user_id = 3 
WHERE id IN (8, 9);
"

# 验证
sqlite3 backend/database.db "
SELECT id, user_id, status 
FROM orders 
WHERE user_id = 3;
"
```

**但这需要你明确知道哪些订单是 test555 购买的！**

---

## 📊 **修复前后对比**

### **修复前**

| 操作 | 前端发送 | 后端接收 | 订单user_id | 结果 |
|------|---------|---------|------------|------|
| testuser购票 | ❌ 无userId | 默认=1 | 1 | ✅ 正确（巧合）|
| test555购票 | ❌ 无userId | 默认=1 | 1 | ❌ 错误 |
| admin购票 | ❌ 无userId | 默认=1 | 1 | ❌ 错误 |

**结果**：所有订单都属于 testuser (user_id=1)

---

### **修复后**

| 操作 | 前端发送 | 后端接收 | 订单user_id | 结果 |
|------|---------|---------|------------|------|
| testuser购票 | ✅ userId=1 | 1 | 1 | ✅ 正确 |
| test555购票 | ✅ userId=3 | 3 | 3 | ✅ 正确 |
| admin购票 | ✅ userId=2 | 2 | 2 | ✅ 正确 |
| 未登录购票 | ❌ 无userId | 返回401 | - | ✅ 拒绝 |

**结果**：每个用户的订单正确绑定

---

## 🔍 **调试清单**

### **前端检查**

```javascript
// 浏览器控制台运行
console.log('localStorage userId:', localStorage.getItem('userId'));
console.log('localStorage username:', localStorage.getItem('username'));
console.log('localStorage user_info:', localStorage.getItem('user_info'));
```

**预期（test555登录）**：
```
userId: "3"
username: "嗷嗷"
user_info: {"userId":"3","username":"test555","name":"嗷嗷","isLoggedIn":true}
```

---

### **后端检查**

提交订单时，查看后端日志（终端）：

```
👤 [订单提交] 用户ID: 3  ← 应该是当前登录用户的ID
📝 [订单提交] 使用V1(旧系统)版本
✅ [订单提交] 订单创建成功，订单号: 10
```

---

### **数据库检查**

```bash
# 查看最新订单的user_id
sqlite3 backend/database.db "
SELECT id, user_id, status, created_at 
FROM orders 
ORDER BY created_at DESC 
LIMIT 5;
"
```

**预期**：最新订单的 `user_id` 应该是当前登录用户的ID（如test555=3）

---

## 🎉 **成功标志**

修复成功后，应该看到：

1. **前端控制台**：
   ```
   👤 [订单确认] 当前用户ID: 3
   📤 [订单确认] 提交订单请求
   ✅ [订单确认] 订单提交成功，订单号: 10
   ```

2. **后端日志**：
   ```
   👤 [订单提交] 用户ID: 3
   ✅ [订单提交] 订单创建成功
   ```

3. **个人中心**：
   - test555 登录后能看到自己的订单
   - testuser 登录后能看到自己的订单（1-9）
   - 不同用户之间订单相互隔离

4. **数据库**：
   ```
   订单10+ → user_id=3 (test555)
   订单1-9 → user_id=1 (testuser)
   ```

---

**最后更新**：2026-01-19
**相关提交**：[待填写]
**修复的文件**：
- `frontend/src/components/OrderFill/OrderConfirmModal.tsx`
- `backend/src/routes/api.js`
