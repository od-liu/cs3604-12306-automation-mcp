# 🚀 12306 登录页面 - 启动指南

## 快速启动

### 1️⃣ 启动后端服务

```bash
cd backend
npm start
```

✅ **预期输出**:
```
🚀 Server running on http://localhost:3000
✅ 数据库连接成功
```

**端口**: 3000  
**健康检查**: http://localhost:3000/health

---

### 2️⃣ 启动前端服务

**在新终端中运行**:

```bash
cd frontend
npm run dev
```

✅ **预期输出**:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**端口**: 5173  
**访问地址**: http://localhost:5173

---

## 🔧 端口配置

| 服务 | 端口 | 说明 |
|------|------|------|
| 后端 API | 3000 | Express 服务器 |
| 前端应用 | 5173 | Vite 开发服务器 |

**API 代理配置**: 
- 前端请求 `/api/*` 会自动代理到 `http://localhost:3000/api/*`

---

## 🎯 演示账号

登录时使用以下测试账号：

```
用户名: testuser
密码: password123
手机号: 19805819256
证件号后4位: 4028
```

---

## ✅ 验证步骤

### 1. 验证后端服务

```bash
curl http://localhost:3000/health
```

预期返回:
```json
{"status":"OK","timestamp":"2025-12-28T..."}
```

### 2. 验证前端服务

在浏览器中打开: http://localhost:5173

应该看到完整的 12306 登录页面。

### 3. 功能测试

1. **视觉检查**:
   - ✅ 顶部导航（Logo + 欢迎文字）
   - ✅ 登录表单（白色卡片）
   - ✅ 底部导航（友情链接 + 二维码）

2. **表单验证测试**:
   - 用户名为空 → 显示 "请输入用户名！"
   - 密码为空 → 显示 "请输入密码！"
   - 密码少于6位 → 显示 "密码长度不能少于6位！"

3. **登录测试**:
   - 输入 `testuser` / `password123`
   - 点击"立即登录"
   - ✅ 应该弹出短信验证窗口

4. **短信验证测试**:
   - 输入证件号后4位: `4028`
   - 点击"获取验证码"
   - 查看浏览器控制台，会显示验证码
   - 输入验证码
   - 点击"确定"
   - ✅ 验证成功

---

## ⚠️ 常见问题

### 问题 1: 端口已被占用

**错误**: `EADDRINUSE: address already in use`

**解决方案**:

**查找占用端口的进程** (macOS/Linux):
```bash
# 查找占用 3000 端口的进程
lsof -ti:3000

# 杀掉进程
kill -9 $(lsof -ti:3000)
```

或者修改配置使用不同端口。

---

### 问题 2: 前端无法连接后端

**症状**: 前端请求失败，显示网络错误

**检查清单**:
1. ✅ 后端服务是否正在运行? (`curl http://localhost:3000/health`)
2. ✅ 前端代理配置是否正确? (检查 `vite.config.ts`)
3. ✅ 浏览器控制台是否有 CORS 错误?

**解决方案**:
- 确保后端服务已启动
- 确认 `vite.config.ts` 中的代理目标为 `http://localhost:3000`

---

### 问题 3: 数据库错误

**错误**: `SQLITE_ERROR: no such table`

**解决方案**:
```bash
cd backend
node src/database/init_db.js
```

这会重新初始化数据库并插入测试数据。

---

## 🧪 运行测试

### 前端测试
```bash
cd frontend
npm test
```

预期: 11/11 测试通过 ✅

### 后端测试
```bash
cd backend
npm test
```

预期: 核心功能测试通过 ✅

---

## 📝 项目结构

```
/backend
  /src
    /database
      - db.js              # 生产数据库连接
      - test_db.js         # 测试数据库连接
      - operations.js      # 数据库操作函数
      - init_db.js         # 数据库初始化
    /routes
      - api.js             # API 路由
    - index.js             # 服务器入口
  /test                    # 测试文件
  - database.db            # 生产数据库
  - test_database.db       # 测试数据库

/frontend
  /src
    /api
      - index.ts           # API 封装
    /components
      - TopNavigation.tsx
      - BottomNavigation.tsx
      - LoginForm.tsx
      - SmsVerificationModal.tsx
    /pages
      - LoginPage.tsx
  /test                    # 测试文件
```

---

## 🎉 开始使用

现在您可以：

1. 启动后端服务（端口 3000）
2. 启动前端服务（端口 5173）
3. 在浏览器中访问 http://localhost:5173
4. 使用测试账号登录并体验完整功能

**祝使用愉快！** 🚀

