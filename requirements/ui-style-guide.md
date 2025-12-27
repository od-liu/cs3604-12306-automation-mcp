# UI 样式规范 - 12306 登录页面

本文档包含所有组件的完整 CSS 样式，可直接复制到对应的 CSS 文件中使用。

> **📌 重要提示**：
> - 所有样式使用 `!important` 确保优先级
> - 所有尺寸精确到 px
> - 所有颜色使用十六进制或 rgba
> - 样式已包含所有交互状态（hover, focus, disabled, error）
> - 图片尺寸已根据实际资源文件测量并提供精确的缩放方案

## 1. 颜色体系

### 1.1 品牌色

- **品牌红色**: `#E53935` - 用于 Logo、品牌标识
- **主题蓝色**: `#2196F3` - 用于账号登录标签、链接、焦点边框、短信验证标题
- **主题蓝色（浅）**: `#40A9FF` - 用于链接 hover 状态
- **主题橙色**: `#FF7518` - 用于主要按钮（立即登录、确定）
- **主题橙色（浅）**: `#FF8533` - 用于按钮 hover 状态

### 1.2 文本颜色

- **深灰色**: `#333333` - 主要文本、标题
- **灰色**: `#666666` - 次要文本、辅助信息
- **浅灰色**: `#999999` - 辅助文字、免责声明
- **占位符灰色**: `#CCCCCC` - 输入框占位符

### 1.3 状态颜色

- **错误红色**: `#F44336` - 错误提示文本
- **错误背景**: `#FFF1F0` - 错误提示背景
- **成功绿色**: `#4CAF50` - 成功提示（如适用）
- **成功背景**: `#F0F9FF` - 成功提示背景

### 1.4 背景色

- **页面背景**: 使用背景图片（蓝色渐变）
- **白色**: `#FFFFFF` - 表单容器、卡片、导航背景
- **浅灰色背景**: `#F5F5F5` - 禁用按钮背景、获取验证码按钮背景

### 1.5 边框颜色

- **默认边框**: `#E0E0E0` - 导航分隔线、分隔边框
- **浅灰色边框**: `#D9D9D9` - 输入框默认边框
- **焦点边框**: `#2196F3` - 输入框 focus 状态
- **错误边框**: `#F44336` - 输入框 error 状态

---

## 2. 页面容器 (LoginPageContainer)

### 2.1 文件路径

- 组件: `frontend/src/pages/LoginPage.tsx`
- 样式: `frontend/src/pages/LoginPage.css`

### 2.2 组件位置说明

**在页面中的位置**:
- 根容器，包含所有页面内容
- 占据整个视口（min-height: 100vh）

**布局示意图**:

```
┌─────────────────────────────────────┐
│  TopNavigation (80px)               │
├─────────────────────────────────────┤
│  MainContentArea (flex: 1)          │
│  - Background Image                 │
│  - Left Promotion + Right Form      │
├─────────────────────────────────────┤
│  BottomNavigation (~180px)          │
└─────────────────────────────────────┘
```

### 2.3 完整样式代码

```css
/* ========== 2.1 页面容器 ========== */
.login-page-container {
  min-height: 100vh !important;
  display: flex !important;
  flex-direction: column !important;      /* 垂直布局 */
  background-color: #f5f5f5 !important;   /* 默认背景色 */
}

/* ========== 2.2 主内容区域 ========== */
.main-content-area {
  flex: 1 !important;                      /* 占据剩余空间 */
  display: flex !important;
  align-items: stretch !important;
  min-height: 500px !important;
  position: relative !important;
  
  /* 背景图片 */
  background-image: url('/images/登录页-背景-新.jpg') !important;
  background-size: cover !important;       /* 覆盖整个区域 */
  background-position: center !important;  /* 居中显示 */
  background-repeat: no-repeat !important;
}
/* 图片信息注释 */
/* 背景图片原始尺寸: 1920px × 600px */
/* 使用 cover 模式确保全屏覆盖 */
```

**关键属性说明**:
- 页面容器使用 `flex-direction: column` 实现上中下三段式布局
- 主内容区域使用 `flex: 1` 占据剩余空间
- 背景图片使用 `cover` 模式确保全屏覆盖，`center` 定位确保居中显示

---

## 3. 顶部导航 (TopNavigation)

### 3.1 文件路径

- 组件: `frontend/src/components/TopNavigation.tsx`
- 样式: `frontend/src/components/TopNavigation.css`

### 3.2 组件位置说明

**在页面中的位置**:
- 父容器: `.login-page-container`
- 位置: 第一个子元素，位于页面最上方
- 宽度: 100%
- 高度: 80px

**在 JSX 中的结构**:

```tsx
<div className="login-page-container">
  <TopNavigation ... />  {/* ← 第一个子元素 */}
  <div className="main-content-area">...</div>
  <BottomNavigation />
</div>
```

### 3.3 完整样式代码

```css
/* ========== 3.1 顶部导航容器 ========== */
.top-navigation {
  width: 100% !important;
  height: 80px !important;
  background: #ffffff !important;
  border-bottom: 1px solid #e0e0e0 !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 0 40px !important;
  box-sizing: border-box !important;
  z-index: 10 !important;
}

/* ========== 3.2 Logo区域 ========== */
.top-navigation-logo-section {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
}

.top-navigation-logo {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
}

.top-navigation-logo img {
  height: 45px !important;           /* 精确高度：基于参考截图测量 */
  width: auto !important;            /* 保持宽高比 */
  object-fit: contain !important;    /* 完整显示，不裁剪 */
  display: block !important;
}
/* 图片信息注释 */
/* 原始尺寸: 232px × 71px */
/* 显示尺寸: 45px × 约147px */
/* 缩放比例: 63% (45/71) */

.top-navigation-logo-title {
  font-size: 16px !important;
  font-weight: 500 !important;
  color: #333333 !important;
  line-height: 1.2 !important;
  margin: 0 !important;
}

.top-navigation-logo-subtitle {
  font-size: 12px !important;
  font-weight: 400 !important;
  color: #999999 !important;
  line-height: 1.2 !important;
  margin: 2px 0 0 0 !important;
}

/* ========== 3.3 欢迎文字 ========== */
.top-navigation-welcome {
  font-size: 24px !important;
  font-weight: 400 !important;
  color: #333333 !important;
  line-height: 1.2 !important;
}
```

**关键属性说明**:
- 容器高度: 80px（固定）
- Logo高度: 45px（宽度自适应，保持宽高比）
- 布局方式: `display: flex` + `justify-content: space-between`（左右对齐）
- 内边距: 0 40px（左右各40px）

---

## 4. 登录表单 (LoginForm)

### 4.1 文件路径

- 组件: `frontend/src/components/LoginForm.tsx`
- 样式: `frontend/src/components/LoginForm.css`

### 4.2 组件位置说明

**在页面中的位置**:
- 父容器: `.main-content-area`
- 位置: 主内容区域右侧
- 宽度: 350px（固定）
- 距离右边缘: 约150px
- 距离顶部: 约100px

**在 JSX 中的结构**:

```tsx
<div className="main-content-area">
  <div className="left-promotion">...</div>
  <div className="right-form-container">
    <LoginForm ... />  {/* ← 登录表单 */}
  </div>
</div>
```

### 4.3 完整样式代码

```css
/* ========== 4.1 表单容器定位 ========== */
.right-form-container {
  position: absolute !important;
  right: 150px !important;
  top: 100px !important;
}

/* ========== 4.2 登录表单容器 ========== */
.login-form-container {
  width: 350px !important;
  background: #ffffff !important;
  border-radius: 8px !important;
  padding: 30px !important;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1) !important;
  box-sizing: border-box !important;
}

/* ========== 4.3 登录方式切换标签 ========== */
.login-tabs {
  display: flex !important;
  height: 50px !important;
  border-bottom: 1px solid #e0e0e0 !important;
  margin-bottom: 24px !important;
}

.login-tab {
  flex: 1 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  font-size: 18px !important;
  font-weight: 400 !important;
  color: #666666 !important;
  cursor: pointer !important;
  position: relative !important;
  background: none !important;
  border: none !important;
  transition: color 0.3s ease !important;
}

.login-tab:hover {
  color: #2196F3 !important;
}

.login-tab.active {
  color: #2196F3 !important;
  font-weight: 500 !important;
}

.login-tab.active::after {
  content: '' !important;
  position: absolute !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 2px !important;
  background: #2196F3 !important;
}

.login-tab-divider {
  width: 1px !important;
  background: #e0e0e0 !important;
  align-self: stretch !important;
}

/* ========== 4.4 输入框通用样式 ========== */
.form-input-group {
  margin-bottom: 20px !important;
  position: relative !important;
}

.form-input-group.has-error {
  margin-bottom: 8px !important;
}

.form-input {
  width: 100% !important;
  height: 48px !important;
  padding: 12px 40px !important;
  font-size: 16px !important;
  color: #333333 !important;
  border: 1px solid #d9d9d9 !important;
  border-radius: 4px !important;
  box-sizing: border-box !important;
  transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
  outline: none !important;
}

.form-input::placeholder {
  color: #cccccc !important;
}

/* Focus 状态 */
.form-input:focus {
  border-color: #2196F3 !important;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2) !important;
}

/* Error 状态 */
.form-input.error {
  border-color: #f44336 !important;
}

/* ========== 4.5 输入框图标 ========== */
.form-input-icon {
  position: absolute !important;
  left: 12px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 20px !important;
  height: 20px !important;
  color: #999999 !important;
  pointer-events: none !important;
}

/* ========== 4.6 错误提示 ========== */
.error-message {
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
  color: #f44336 !important;
  font-size: 14px !important;
  margin-top: 8px !important;
  margin-bottom: 12px !important;
}

.error-message-icon {
  width: 16px !important;
  height: 16px !important;
  flex-shrink: 0 !important;
}

/* ========== 4.7 登录按钮 ========== */
.login-button {
  width: 100% !important;
  height: 48px !important;
  background: #ff7518 !important;
  color: #ffffff !important;
  font-size: 18px !important;
  font-weight: 500 !important;
  border: none !important;
  border-radius: 4px !important;
  cursor: pointer !important;
  transition: background-color 0.3s ease !important;
  margin-top: 20px !important;
}

.login-button:hover:not(:disabled) {
  background: #ff8533 !important;
}

.login-button:disabled {
  background: #f5f5f5 !important;
  color: #cccccc !important;
  cursor: not-allowed !important;
}

/* ========== 4.8 底部链接 ========== */
.form-footer-links {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  margin-top: 16px !important;
  font-size: 14px !important;
}

.form-footer-link {
  color: #2196F3 !important;
  text-decoration: none !important;
  cursor: pointer !important;
  transition: color 0.3s ease !important;
}

.form-footer-link:hover {
  color: #40a9ff !important;
  text-decoration: underline !important;
}

.form-footer-divider {
  color: #cccccc !important;
  margin: 0 8px !important;
}

/* ========== 4.9 服务时间说明 ========== */
.service-info {
  margin-top: 20px !important;
  padding-top: 16px !important;
  border-top: 1px solid #e0e0e0 !important;
  font-size: 12px !important;
  color: #666666 !important;
  line-height: 1.6 !important;
}
```

**关键属性说明**:
- 表单宽度: 350px（固定宽度）
- 表单定位: 绝对定位，距离右边150px，距离顶部100px
- 输入框高度: 48px
- 按钮高度: 48px
- 圆角: 8px（容器）、4px（输入框和按钮）
- 内边距: 30px
- 焦点外轮廓: `0 0 0 2px rgba(33, 150, 243, 0.2)`

---

## 5. 底部导航 (BottomNavigation)

### 5.1 文件路径

- 组件: `frontend/src/components/BottomNavigation.tsx`
- 样式: `frontend/src/components/BottomNavigation.css`

### 5.2 组件位置说明

**在页面中的位置**:
- 父容器: `.login-page-container`
- 位置: 第三个子元素，位于页面最底部
- 宽度: 100%
- 高度: 约180px（内容自适应）

**在 JSX 中的结构**:

```tsx
<div className="login-page-container">
  <TopNavigation />
  <div className="main-content-area">...</div>
  <BottomNavigation ... />  {/* ← 第三个子元素 */}
</div>
```

### 5.3 完整样式代码

```css
/* ========== 5.1 底部导航容器 ========== */
.bottom-navigation {
  width: 100% !important;
  background: #ffffff !important;
  border-top: 1px solid #e0e0e0 !important;
  padding: 30px 40px !important;
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 20px !important;
}

/* ========== 5.2 友情链接区域 ========== */
.partner-links-section {
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
}

.partner-links-title {
  font-size: 14px !important;
  color: #666666 !important;
  font-weight: 400 !important;
  margin: 0 !important;
}

.partner-links-image {
  width: 400px !important;          /* 精确宽度：基于参考截图测量 */
  height: auto !important;          /* 保持宽高比 */
  object-fit: contain !important;   /* 完整显示，不裁剪 */
  display: block !important;
}
/* 图片信息注释 */
/* 原始尺寸: 890px × 192px */
/* 显示尺寸: 400px × 约86px */
/* 缩放比例: 45% (400/890) */

/* ========== 5.3 二维码区域 ========== */
.qrcode-section {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 40px !important;
}

.qrcode-groups {
  display: flex !important;
  gap: 40px !important;
  flex: 1 !important;
}

.qrcode-group {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 8px !important;
}

.qrcode-title {
  font-size: 14px !important;
  color: #333333 !important;
  font-weight: 400 !important;
  text-align: center !important;
  margin: 0 !important;
}

.qrcode-image {
  width: 90px !important;            /* 精确尺寸：所有二维码统一 */
  height: 90px !important;
  object-fit: contain !important;    /* 完整显示，不裁剪 */
  display: block !important;
}
/* 图片信息注释 */
/* 中国铁路官方微信二维码 - 原始尺寸: 344px × 344px, 缩放比例: 26% (90/344) */
/* 中国铁路官方微博二维码 - 原始尺寸: 800px × 800px, 缩放比例: 11% (90/800) */
/* 12306公众号二维码 - 原始尺寸: 258px × 258px, 缩放比例: 35% (90/258) */
/* 铁路12306二维码 - 原始尺寸: 258px × 258px, 缩放比例: 35% (90/258) */

/* ========== 5.4 免责声明文字 ========== */
.disclaimer-text {
  font-size: 12px !important;
  color: #999999 !important;
  line-height: 1.6 !important;
  max-width: 300px !important;
  text-align: right !important;
  margin: 0 !important;
}
```

**关键属性说明**:
- 容器内边距: 30px 40px
- 友情链接图片宽度: 400px（高度自适应）
- 二维码尺寸: 90×90px（所有二维码统一尺寸）
- 二维码之间间距: 40px
- 免责声明最大宽度: 300px

---

## 6. 短信验证弹窗 (SmsVerificationModal)

### 6.1 文件路径

- 组件: `frontend/src/components/SmsVerificationModal.tsx`
- 样式: `frontend/src/components/SmsVerificationModal.css`

### 6.2 组件位置说明

**在页面中的位置**:
- 父容器: body（或根容器）
- 定位方式: fixed（屏幕居中）
- z-index: 1000（最上层）
- 包含遮罩层

**在 JSX 中的结构**:

```tsx
<div className="modal-overlay">
  <div className="sms-verification-modal">
    <SmsVerification ... />
  </div>
</div>
```

### 6.3 完整样式代码

```css
/* ========== 6.1 遮罩层 ========== */
.modal-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background: rgba(0, 0, 0, 0.5) !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  z-index: 1000 !important;
}

/* ========== 6.2 弹窗容器 ========== */
.sms-verification-modal {
  width: 700px !important;
  background: #ffffff !important;
  border-radius: 8px !important;
  padding: 40px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
  position: relative !important;
  box-sizing: border-box !important;
}

/* ========== 6.3 弹窗标题栏 ========== */
.modal-header {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  height: 40px !important;
  border-bottom: 1px solid #e0e0e0 !important;
  margin-bottom: 30px !important;
  padding-bottom: 16px !important;
}

.modal-title {
  font-size: 20px !important;
  font-weight: 500 !important;
  color: #333333 !important;
  margin: 0 !important;
}

.modal-close-button {
  width: 32px !important;
  height: 32px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  font-size: 32px !important;
  color: #999999 !important;
  background: none !important;
  border: none !important;
  cursor: pointer !important;
  transition: color 0.3s ease !important;
  line-height: 1 !important;
  padding: 0 !important;
}

.modal-close-button:hover {
  color: #333333 !important;
}

/* ========== 6.4 验证方式标题 ========== */
.verification-title {
  font-size: 24px !important;
  font-weight: 500 !important;
  color: #2196F3 !important;
  text-align: center !important;
  margin: 0 0 30px 0 !important;
}

/* ========== 6.5 证件号输入框 ========== */
.id-input {
  width: 100% !important;
  height: 60px !important;
  padding: 18px !important;
  font-size: 18px !important;
  color: #333333 !important;
  border: 1px solid #d9d9d9 !important;
  border-radius: 4px !important;
  box-sizing: border-box !important;
  transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
  outline: none !important;
  margin-bottom: 20px !important;
}

.id-input::placeholder {
  color: #cccccc !important;
}

.id-input:focus {
  border-color: #2196F3 !important;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2) !important;
}

/* ========== 6.6 验证码输入区域 ========== */
.verification-code-row {
  display: flex !important;
  gap: 16px !important;
  margin-bottom: 16px !important;
}

.code-input {
  flex: 1 !important;
  height: 60px !important;
  padding: 18px !important;
  font-size: 18px !important;
  color: #333333 !important;
  border: 1px solid #d9d9d9 !important;
  border-radius: 4px !important;
  box-sizing: border-box !important;
  transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
  outline: none !important;
}

.code-input::placeholder {
  color: #cccccc !important;
}

.code-input:focus {
  border-color: #2196F3 !important;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2) !important;
}

/* ========== 6.7 获取验证码按钮 ========== */
.get-code-button {
  width: 180px !important;
  height: 60px !important;
  background: #f5f5f5 !important;
  color: #999999 !important;
  font-size: 16px !important;
  border: 1px solid #d9d9d9 !important;
  border-radius: 4px !important;
  cursor: pointer !important;
  transition: background-color 0.3s ease !important;
  flex-shrink: 0 !important;
}

.get-code-button:hover:not(:disabled) {
  background: #e8e8e8 !important;
}

.get-code-button:disabled {
  background: #f5f5f5 !important;
  color: #cccccc !important;
  cursor: not-allowed !important;
}

/* ========== 6.8 提示消息 ========== */
.message-box {
  padding: 12px 16px !important;
  border-radius: 4px !important;
  font-size: 14px !important;
  margin-bottom: 16px !important;
  display: flex !important;
  align-items: center !important;
}

/* 错误提示 */
.error-message-box {
  background: #fff1f0 !important;
  border: 1px solid #f44336 !important;
  color: #f44336 !important;
}

/* 成功提示 */
.success-message-box {
  background: #f0f9ff !important;
  border: 1px solid #2196F3 !important;
  color: #2196F3 !important;
}

/* ========== 6.9 确定按钮 ========== */
.confirm-button {
  width: 100% !important;
  height: 60px !important;
  background: #ff7518 !important;
  color: #ffffff !important;
  font-size: 20px !important;
  font-weight: 500 !important;
  border: none !important;
  border-radius: 4px !important;
  cursor: pointer !important;
  transition: background-color 0.3s ease !important;
  margin-top: 30px !important;
}

.confirm-button:hover:not(:disabled) {
  background: #ff8533 !important;
}

.confirm-button:disabled {
  background: #f5f5f5 !important;
  color: #cccccc !important;
  cursor: not-allowed !important;
}
```

**关键属性说明**:
- 弹窗宽度: 700px
- 弹窗内边距: 40px
- 遮罩层背景: `rgba(0, 0, 0, 0.5)`
- 输入框高度: 60px（比登录表单的48px略高）
- 按钮高度: 60px
- 获取验证码按钮宽度: 180px
- 圆角: 8px（容器）、4px（输入框和按钮）

---

## 7. 使用说明

### 7.1 在组件中使用

1. **创建 CSS 文件**: 在对应的组件目录下创建 CSS 文件
2. **复制样式代码**: 从本文档复制对应组件的完整样式代码
3. **导入样式**: 在组件文件中使用 `import './ComponentName.css'`
4. **应用类名**: 在 JSX 中使用对应的 CSS 类名

**示例**:

```tsx
// LoginForm.tsx
import React from 'react';
import './LoginForm.css';

export const LoginForm: React.FC = () => {
  return (
    <div className="login-form-container">
      <div className="login-tabs">
        <button className="login-tab active">账号登录</button>
        <div className="login-tab-divider"></div>
        <button className="login-tab">扫码登录</button>
      </div>
      
      <div className="form-input-group">
        <input 
          type="text" 
          className="form-input" 
          placeholder="用户名/邮箱/手机号" 
        />
        <span className="form-input-icon">👤</span>
      </div>
      
      <button className="login-button">立即登录</button>
    </div>
  );
};
```

### 7.2 颜色使用规范

所有颜色均在"颜色体系"章节定义，使用时请保持一致：

- **主要按钮**（立即登录、确定）：`#FF7518`，hover: `#FF8533`
- **链接和选中状态**：`#2196F3`，hover: `#40A9FF`
- **主要文本**：`#333333`
- **次要文本**：`#666666`
- **辅助文字**：`#999999`
- **错误提示**：`#F44336`，背景 `#FFF1F0`

### 7.3 交互状态检查清单

实现完成后，检查以下交互状态：

- [ ] **Hover 状态**：按钮、链接、关闭按钮颜色变化
- [ ] **Focus 状态**：输入框边框变为蓝色，显示外轮廓
- [ ] **Disabled 状态**：按钮变灰、光标变为 not-allowed
- [ ] **Error 状态**：错误提示样式、输入框红色边框
- [ ] **Active 状态**：标签选中状态（蓝色文字和下划线）

### 7.4 响应式设计建议

虽然当前设计基于 1920px 桌面端，但建议考虑以下响应式适配：

```css
/* 平板设备 (768px - 1024px) */
@media (max-width: 1024px) {
  .right-form-container {
    right: 50px !important;
  }
  
  .bottom-navigation {
    padding: 20px !important;
  }
  
  .qrcode-groups {
    gap: 20px !important;
  }
}

/* 移动设备 (< 768px) */
@media (max-width: 768px) {
  .login-form-container {
    width: 90% !important;
    max-width: 350px !important;
  }
  
  .right-form-container {
    right: 50% !important;
    transform: translateX(50%) !important;
  }
  
  .sms-verification-modal {
    width: 90% !important;
    max-width: 700px !important;
  }
}
```

### 7.5 图片资源路径映射

所有图片资源应放置在 `public/images/` 目录下：

```
public/
└── images/
    ├── 登录页-背景-新.jpg                    (背景图片)
    ├── 登录页-顶部导航区域-中国铁路Logo.png    (Logo)
    ├── 友情链接.png                          (友情链接)
    ├── 中国铁路官方微信二维码.png             (二维码1)
    ├── 中国铁路官方微博二维码.png             (二维码2)
    ├── 12306公众号二维码.png                 (二维码3)
    └── 铁路12306二维码.png                   (二维码4)
```

### 7.6 验证清单

在提交代码前，请验证：

- [ ] 所有颜色值与颜色体系一致
- [ ] 所有尺寸精确到 px
- [ ] 所有布局代码完整可用
- [ ] 所有交互状态已实现
- [ ] 所有图片路径正确
- [ ] 所有图片尺寸符合设计规范
- [ ] 焦点状态的外轮廓清晰可见
- [ ] 错误提示样式正确显示
- [ ] 按钮禁用状态正确
- [ ] 弹窗遮罩层和关闭功能正常

---

## 8. 常见问题

### 8.1 为什么使用 `!important`？

为了确保样式优先级，覆盖可能存在的第三方库样式或全局样式。在实际项目中，如果没有样式冲突，可以考虑去除 `!important`。

### 8.2 如何调整图片显示尺寸？

所有图片尺寸都基于参考截图精确测量。如需调整：

1. **Logo**: 修改 `.top-navigation-logo img` 的 `height` 值
2. **二维码**: 修改 `.qrcode-image` 的 `width` 和 `height` 值
3. **友情链接**: 修改 `.partner-links-image` 的 `width` 值

请确保使用 `object-fit: contain` 保持图片比例。

### 8.3 如何修改主题色？

在"颜色体系"章节找到对应颜色，全局替换即可。建议使用 CSS 变量：

```css
:root {
  --primary-blue: #2196F3;
  --primary-orange: #FF7518;
  /* ... 其他颜色 */
}

/* 然后在样式中使用 */
.login-button {
  background: var(--primary-orange) !important;
}
```

### 8.4 背景图片不显示？

检查以下几点：

1. 图片路径是否正确（相对于 public 目录）
2. 图片文件是否存在
3. 检查浏览器控制台是否有 404 错误
4. 确保使用了 `background-size: cover`

---

**文档生成完成！** 🎉

本文档提供了 12306 登录页面的完整 UI 样式规范，所有样式代码均可直接复制使用。如有任何问题，请参考"常见问题"章节或联系开发团队。


