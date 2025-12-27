# 12306 登录系统 - 骨架代码

这是一个完整的登录系统骨架代码，包含前端（React + TypeScript）和后端（Node.js + Express + SQLite）。

## 项目结构

```
/
├── frontend/               # React前端应用
│   ├── src/
│   │   ├── components/    # React组件
│   │   │   ├── TopNavigation.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── BottomNavigation.tsx
│   │   │   └── SmsVerificationModal.tsx
│   │   ├── pages/
│   │   │   └── LoginPage.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   │   └── images/        # 静态资源图片
│   └── package.json
│
├── backend/               # Node.js后端服务
│   ├── src/
│   │   ├── routes/
│   │   │   └── auth.js    # 登录和验证API
│   │   ├── database/
│   │   │   ├── db.js
│   │   │   ├── init_db.js
│   │   │   └── operations.js
│   │   ├── utils/
│   │   │   └── response.js
│   │   └── index.js       # 服务器入口
│   └── package.json
│
└── requirements/          # 需求文档和参考图片
```

## 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **路由**: React Router DOM v6
- **HTTP 客户端**: Axios
- **样式**: 传统CSS（非Tailwind）
- **测试**: Vitest + React Testing Library

### 后端
- **运行时**: Node.js
- **框架**: Express.js
- **数据库**: SQLite3
- **测试**: Vitest + Supertest

## 快速开始

### 1. 安装依赖

```bash
# 安装前端依赖
cd frontend
npm install

# 安装后端依赖
cd ../backend
npm install
```

### 2. 初始化数据库

```bash
cd backend
node src/database/init_db.js
```

这将创建数据库表并插入测试用户：
- 用户名: `testuser`, 密码: `password123`, 证件号后4位: `1234`
- 用户名: `admin`, 密码: `admin123`, 证件号后4位: `5678`

### 3. 启动后端服务

```bash
cd backend
npm run dev
```

后端服务将运行在 http://localhost:5000

### 4. 启动前端应用

```bash
cd frontend
npm run dev
```

前端应用将运行在 http://localhost:3000

## 功能实现清单

### 已实现功能（骨架代码）

#### UI 组件
- ✅ **登录页面** (LoginPage)
  - 上中下三段式布局
  - 背景图片
  - 子组件插槽

- ✅ **顶部导航** (TopNavigation)
  - 品牌Logo和名称
  - 欢迎文字

- ✅ **登录表单** (LoginForm)
  - 账号/扫码登录切换
  - 用户名和密码输入
  - 6个验证场景：
    - 用户名为空
    - 密码为空
    - 密码长度不足
    - 用户名未注册
    - 密码错误
    - 登录成功
  - 注册和忘记密码链接

- ✅ **底部导航** (BottomNavigation)
  - 友情链接图片
  - 4个二维码展示
  - 免责声明文字

- ✅ **短信验证弹窗** (SmsVerificationModal)
  - 证件号输入
  - 验证码输入
  - 获取验证码（60秒倒计时）
  - 10个验证场景：
    - 证件号错误
    - 获取验证码成功
    - 频率限制
    - 证件号为空
    - 证件号长度不正确
    - 验证码为空
    - 验证码长度不正确
    - 验证码错误
    - 验证码过期
    - 验证成功

#### API 接口
- ✅ `POST /api/auth/login` - 用户登录
- ✅ `POST /api/auth/send-sms` - 发送短信验证码
- ✅ `POST /api/auth/verify-sms` - 验证短信验证码

#### 业务逻辑
- ✅ `validateLogin()` - 验证用户凭据
- ✅ `sendSmsCode()` - 发送短信验证码
- ✅ `verifySmsCode()` - 验证短信验证码

## 测试账号

### 登录测试
- 用户名: `testuser`
- 密码: `password123`
- 证件号后4位: `1234`

或

- 用户名: `admin`
- 密码: `admin123`
- 证件号后4位: `5678`

### 短信验证码
在开发环境中，验证码会输出到浏览器控制台。
模拟验证码：`123456`（用于测试）

## API 文档

### 1. 用户登录
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "登录成功",
  "data": {
    "userId": 1,
    "username": "testuser",
    "needSmsVerification": true
  }
}
```

### 2. 发送短信验证码
```http
POST /api/auth/send-sms
Content-Type: application/json

{
  "userId": 1,
  "idNumber": "1234"
}

Response:
{
  "success": true,
  "message": "验证码发送成功",
  "code": "123456"
}
```

### 3. 验证短信验证码
```http
POST /api/auth/verify-sms
Content-Type: application/json

{
  "userId": 1,
  "idNumber": "1234",
  "smsCode": "123456"
}

Response:
{
  "success": true,
  "message": "验证成功",
  "data": {
    "userId": 1,
    "username": "testuser"
  }
}
```

## 注意事项

### 骨架代码说明
这是一个**骨架代码项目**，提供完整的接口定义和基本实现，但以下功能仅为模拟：

1. **数据库操作**：当前使用内存中的模拟数据，需要在实际实现时连接真实数据库
2. **短信发送**：验证码仅输出到控制台，实际需要集成第三方短信服务
3. **密码加密**：当前明文存储，实际需要使用bcrypt等加密
4. **Token认证**：未实现JWT token，需要在实际实现时添加
5. **表单验证**：基础验证已实现，可能需要更严格的验证规则

### UI 视觉还原
所有组件的CSS样式严格按照 `requirements/ui-style-guide.md` 规范实现，确保像素级精确还原参考图片。

### 接口注册
所有UI组件、API接口和业务函数已通过MCP工具注册，可追溯完整的调用链：
- UI → API → Function → Database

## 下一步工作

要将骨架代码转变为生产级应用，建议按以下顺序完成：

1. **数据库集成**
   - 实现真实的SQLite查询
   - 添加数据库迁移脚本
   - 实现连接池

2. **安全增强**
   - 密码哈希（bcrypt）
   - JWT token认证
   - HTTPS配置
   - CSRF防护

3. **短信服务**
   - 集成阿里云/腾讯云短信服务
   - 实现频率限制
   - 添加验证码过期机制

4. **测试完善**
   - 编写单元测试
   - 编写集成测试
   - 添加E2E测试

5. **生产部署**
   - 环境变量配置
   - Docker容器化
   - CI/CD流程
   - 监控和日志

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！


