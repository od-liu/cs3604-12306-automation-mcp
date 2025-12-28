# 12306 登录页面 - 骨架代码

> 基于需求文档 `requirements/ui-requirements.yaml` 生成的完整前后端骨架代码

## 项目概述

这是一个12306登录页面的完整实现，包含：
- ✅ 前端：React 18 + TypeScript + Vite
- ✅ 后端：Express + SQLite3
- ✅ 像素级UI还原（基于ui-style-guide.md）
- ✅ 完整的功能场景实现（100%场景覆盖）

## 技术栈

### 前端
- **框架**: React 18
- **语言**: TypeScript
- **构建工具**: Vite
- **样式**: 传统CSS（不使用Tailwind）
- **HTTP客户端**: Fetch API
- **路由**: React Router DOM v6

### 后端
- **运行时**: Node.js (LTS)
- **框架**: Express.js
- **数据库**: SQLite3
- **Session管理**: express-session
- **CORS**: cors

## 项目结构

```
/Users/od/Desktop/ui_analyzer_agent_requirements/
├── frontend/                      # 前端项目
│   ├── public/
│   │   └── images/                # 静态图片资源（10张）
│   ├── src/
│   │   ├── components/            # React组件
│   │   │   ├── Header/            # 顶部导航
│   │   │   ├── LoginForm/         # 登录表单
│   │   │   ├── SmsVerificationModal/  # 短信验证弹窗
│   │   │   └── Footer/            # 底部导航
│   │   ├── pages/
│   │   │   └── LoginPage.tsx      # 登录页面
│   │   ├── App.tsx                # 应用入口
│   │   ├── main.tsx               # React渲染入口
│   │   └── index.css              # 全局样式
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/                       # 后端项目
│   ├── src/
│   │   ├── routes/
│   │   │   └── api.js             # API路由（3个端点）
│   │   ├── services/
│   │   │   └── authService.js     # 认证服务（3个函数）
│   │   ├── database/
│   │   │   ├── db.js              # SQLite连接
│   │   │   ├── init_db.js         # 数据库初始化
│   │   │   └── operations.js      # 数据库操作封装
│   │   ├── utils/
│   │   │   └── response.js        # 响应格式化工具
│   │   └── index.js               # 服务器入口
│   ├── database.db                # SQLite数据库文件（运行后生成）
│   └── package.json
│
└── requirements/                  # 需求文档（已存在）
    ├── ui-requirements.yaml       # UI需求文档
    ├── ui-style-guide.md          # UI样式规范
    └── images/                    # 参考图片和资源图片
```

## 快速开始

### 1. 安装依赖

**前端：**
```bash
cd frontend
npm install
```

**后端：**
```bash
cd backend
npm install
```

### 2. 初始化数据库

```bash
cd backend
npm run init-db
```

初始化后会创建以下测试账号：
- **账号1**: `testuser` / `test123456` (证件号后4位: `1234`)
- **账号2**: `admin` / `admin123456` (证件号后4位: `4028`)

### 3. 启动服务

**启动后端服务器（端口5000）：**
```bash
cd backend
npm run dev
```

**启动前端开发服务器（端口3000）：**
```bash
cd frontend
npm run dev
```

### 4. 访问应用

打开浏览器访问：`http://localhost:3000`

## 功能实现清单

### UI组件

| 组件ID | 组件名称 | 路径 | Scenarios | Features | 状态 |
|--------|---------|------|-----------|----------|------|
| UI-TOP-NAV | 顶部导航 | `frontend/src/components/Header/` | N/A | 3/3 (100%) | ✅ |
| UI-LOGIN-FORM | 登录表单 | `frontend/src/components/LoginForm/` | 3/3 (100%) | 4/4 (100%) | ✅ |
| UI-SMS-MODAL | 短信验证弹窗 | `frontend/src/components/SmsVerificationModal/` | 4/4 (100%) | 6/6 (100%) | ✅ |
| UI-BOTTOM-NAV | 底部导航 | `frontend/src/components/Footer/` | N/A | 5/5 (100%) | ✅ |
| UI-LOGIN-PAGE | 登录页面 | `frontend/src/pages/LoginPage.tsx` | N/A | 6/6 (100%) | ✅ |

### API接口

| 接口ID | 方法 | 路径 | 描述 | 状态 |
|--------|------|------|------|------|
| API-LOGIN | POST | `/api/auth/login` | 用户登录 | ✅ |
| API-GET-VERIFICATION-CODE | POST | `/api/auth/send-verification-code` | 发送短信验证码 | ✅ |
| API-VERIFY-SMS | POST | `/api/auth/verify-sms` | 验证短信验证码 | ✅ |

### Service函数

| 函数ID | 函数名 | 描述 | 数据库操作 | 状态 |
|--------|--------|------|-----------|------|
| FUNC-VALIDATE-CREDENTIALS | `validateCredentials` | 验证用户凭据 | SELECT users | ✅ |
| FUNC-SEND-SMS-CODE | `sendSmsCode` | 发送短信验证码 | SELECT users | ✅ |
| FUNC-VERIFY-SMS-CODE | `verifySmsCode` | 验证短信验证码 | Session读取 | ✅ |

## 实现的场景（Scenarios）

### 登录表单（3个场景）

1. ✅ **SCENARIO-001**: 校验用户名为空
   - Given: 用户未输入用户名
   - When: 点击"立即登录"
   - Then: 显示错误提示"请输入用户名！"

2. ✅ **SCENARIO-002**: 校验密码为空
   - Given: 用户输入用户名但未输入密码
   - When: 点击"立即登录"
   - Then: 显示错误提示"请输入密码！"

3. ✅ **SCENARIO-003**: 校验密码长度
   - Given: 用户输入小于6位的密码
   - When: 点击"立即登录"
   - Then: 显示错误提示"密码长度不能少于6位！"

### 短信验证弹窗（4个场景）

1. ✅ **SCENARIO-001**: 校验证件号为空
   - Given: 用户未输入证件号
   - When: 点击"确定"
   - Then: 显示错误提示

2. ✅ **SCENARIO-002**: 校验证件号错误
   - Given: 用户输入错误的证件号后4位
   - When: 点击"获取验证码"
   - Then: 显示错误提示"请输入正确的用户信息!"

3. ✅ **SCENARIO-003**: 获取验证码成功
   - Given: 用户输入正确的证件号后4位
   - When: 点击"获取验证码"
   - Then: 显示成功提示"获取手机验证码成功！"

4. ✅ **SCENARIO-004**: 验证码倒计时
   - Given: 用户成功获取验证码
   - When: 系统开始倒计时
   - Then: 按钮显示"重新发送(XX)"，60秒倒计时

## 样式规范

所有UI组件的样式严格遵循 `requirements/ui-style-guide.md`，实现了：
- ✅ 像素级精确布局
- ✅ 完整的颜色体系
- ✅ 完整的交互状态（hover, active, disabled）
- ✅ 响应式设计（移动端适配）

## 骨架代码说明

这是一个**骨架代码项目**，包含：
- ✅ 完整的接口定义和注释
- ✅ 完整的功能逻辑实现（100%场景覆盖）
- ✅ 完整的UI视觉还原
- ⚠️ 简化的安全实现（密码未加密，JWT未实现）
- ⚠️ 简化的短信服务（未调用真实短信API）

## 生产环境改进建议

在投入生产使用前，建议完善以下内容：

### 安全性
- [ ] 使用 `bcrypt` 加密用户密码
- [ ] 实现 JWT token 认证
- [ ] 添加请求频率限制
- [ ] 添加 CSRF 保护
- [ ] 使用 HTTPS

### 功能完善
- [ ] 集成真实的短信API服务
- [ ] 添加邮箱验证功能
- [ ] 实现"忘记密码"流程
- [ ] 实现"立即注册"流程
- [ ] 添加验证码图片验证

### 测试
- [ ] 编写单元测试
- [ ] 编写集成测试
- [ ] 编写E2E测试

### 性能优化
- [ ] 添加Redis缓存
- [ ] 优化数据库索引
- [ ] 添加CDN加速
- [ ] 图片懒加载

## API文档

### POST /api/auth/login
**描述**: 用户登录

**请求体**:
```json
{
  "username": "testuser",
  "password": "test123456"
}
```

**响应**:
```json
{
  "success": true,
  "message": "登录成功，请进行短信验证",
  "requireSms": true,
  "userId": 1
}
```

### POST /api/auth/send-verification-code
**描述**: 发送短信验证码

**请求体**:
```json
{
  "userId": 1,
  "idCardLast4": "1234"
}
```

**响应**:
```json
{
  "success": true,
  "message": "获取手机验证码成功！"
}
```

### POST /api/auth/verify-sms
**描述**: 验证短信验证码

**请求体**:
```json
{
  "userId": 1,
  "code": "123456"
}
```

**响应**:
```json
{
  "success": true,
  "token": "token_1_1234567890",
  "message": "验证成功"
}
```

## 数据库Schema

### users表
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  id_card TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 许可证

本项目为教学示例代码，仅供学习参考使用。

## 联系方式

如有问题，请查看需求文档：
- UI需求: `requirements/ui-requirements.yaml`
- 样式规范: `requirements/ui-style-guide.md`

---

**生成时间**: 2025-12-28  
**生成工具**: Interface Designer Agent  
**基于需求**: ui-requirements.yaml v2.0
