# UI 样式规范 - 12306登录页面

**生成日期**: 2025-12-28  
**基于页面**: https://kyfw.12306.cn/otn/resources/login.html  
**分析工具**: UI Analyzer Agent

---

## 1. 颜色体系

从页面截图和交互状态中提取的完整颜色系统：

### 1.1 品牌色

```css
:root {
  /* 品牌主色 - 用于激活标签、链接 */
  --brand-primary: #3B99FC;  /* rgb(59, 153, 252) */
  
  /* 主题色/强调色 - 用于主按钮 */
  --theme-primary: #FF8000;  /* rgb(255, 128, 0) */
}
```

### 1.2 文本颜色

```css
:root {
  /* 主要文本 */
  --text-primary: #333333;  /* rgb(51, 51, 51) */
  
  /* 次要文本 */
  --text-secondary: #666666;  /* 估计值 */
  
  /* 占位符文本 */
  --text-placeholder: #999999;  /* 估计值 */
  
  /* 按钮文字 */
  --text-button: #FFFFFF;
  
  /* 链接文字 */
  --text-link: #3B99FC;
}
```

### 1.3 状态颜色

```css
:root {
  /* 错误/危险 */
  --color-error: #FF4D4F;  /* 估计值 */
  
  /* 成功 */
  --color-success: #52C41A;  /* 估计值 */
  
  /* 警告 */
  --color-warning: #FAAD14;  /* 估计值 */
}
```

### 1.4 背景和边框

```css
:root {
  /* 页面背景 */
  --bg-page: #FFFFFF;
  
  /* 容器背景 */
  --bg-container: #FFFFFF;
  
  /* 输入框边框 */
  --border-input: #DEDEDE;  /* rgb(222, 222, 222) */
  
  /* 边框圆角 */
  --border-radius: 6px;
  
  /* 版权区域背景 */
  --bg-copyright: #F5F5F5;  /* 估计值 */
}
```

> **注意**：颜色值基于视觉分析和截图提取，建议开发者使用浏览器开发者工具的取色器在实际网页上验证精确值。

---

## 2. 顶部导航 (Top Navigation)

### 2.1 文件路径

- **组件**: `frontend/src/components/TopNavigation.tsx`
- **样式**: `frontend/src/components/TopNavigation.css`

### 2.2 组件位置说明

- **父容器**: `body.page-login > .toolbar_Div`
- **位置**: 页面最上方，横向占据整个页面宽度
- **尺寸**: `100% × 80px`

### 2.3 完整样式代码

```css
/* ========== 顶部导航容器 ========== */
.header {
  display: block !important;
  position: relative !important;
  width: 100% !important;
  height: 80px !important;
  background-color: #FFFFFF !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* ========== Logo区域 ========== */
.header .logo-area {
  display: inline-block !important;
  float: left !important;
  margin-left: 150px !important;  /* 根据设计稿调整 */
  margin-top: 15px !important;
}

.header .logo {
  display: inline-block !important;
  width: 200px !important;
  height: 50px !important;
  background-image: url('/images/登录页面-顶部导航-12306Logo.png') !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
}

.header .logo-text {
  display: inline-block !important;
  font-size: 24px !important;
  font-weight: bold !important;
  color: #333333 !important;
  margin-left: 10px !important;
  vertical-align: middle !important;
}

.header .logo-subtitle {
  display: block !important;
  font-size: 12px !important;
  color: #666666 !important;
  margin-top: 2px !important;
}

/* ========== 欢迎文字 ========== */
.header .welcome-text {
  display: inline-block !important;
  float: right !important;
  margin-right: 150px !important;  /* 根据设计稿调整 */
  margin-top: 30px !important;
  font-size: 16px !important;
  color: #333333 !important;
}
```

---

## 3. 登录表单 (Login Form)

### 3.1 文件路径

- **组件**: `frontend/src/components/LoginForm.tsx`
- **样式**: `frontend/src/components/LoginForm.css`

### 3.2 组件位置说明

- **父容器**: `.login-panel` (主内容区域)
- **位置**: 页面右侧，距离右边缘约150px
- **尺寸**: `380px × 373px`
- **布局**: 绝对定位，浮动在背景图上方

### 3.3 完整样式代码

```css
/* ========== 登录表单容器 ========== */
.login-form {
  display: block !important;
  position: absolute !important;
  width: 380px !important;
  height: 373px !important;
  background-color: #FFFFFF !important;
  border-radius: 0px !important;
  padding: 20px !important;
  right: 150px !important;  /* 距离右边缘 */
  top: 6px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
}

/* ========== 标签页切换 ========== */
.login-form .tabs {
  display: flex !important;
  gap: 20px !important;
  margin-bottom: 20px !important;
  border-bottom: 1px solid #DEDEDE !important;
}

.login-form .tab {
  font-size: 16px !important;
  padding: 10px 0 !important;
  cursor: pointer !important;
  color: #666666 !important;
  border-bottom: 2px solid transparent !important;
  transition: color 0.3s, border-color 0.3s !important;
}

.login-form .tab.active {
  color: #3B99FC !important;  /* 品牌主色 */
  font-weight: bold !important;
  border-bottom-color: #3B99FC !important;
}

.login-form .tab:hover:not(.active) {
  color: #333333 !important;
}

/* ========== 表单输入区域 ========== */
.login-form .input-group {
  margin-bottom: 15px !important;
}

.login-form .input-field {
  display: block !important;
  width: 100% !important;
  height: 40px !important;
  padding: 10px !important;
  font-size: 14px !important;
  color: #333333 !important;
  border: 1px solid #DEDEDE !important;
  border-radius: 0px !important;
  box-sizing: border-box !important;
  transition: border-color 0.3s !important;
}

.login-form .input-field::placeholder {
  color: #999999 !important;
}

.login-form .input-field:focus {
  outline: none !important;
  border-color: #3B99FC !important;  /* 聚焦时变为品牌色 */
}

/* ========== 错误状态（参考交互截图）========== */
/* 📸 参考截图: requirements/images/交互状态截图/登录表单-错误-用户名为空.png */
/* 📸 参考截图: requirements/images/交互状态截图/登录表单-错误-密码为空.png */
/* 📸 参考截图: requirements/images/交互状态截图/登录表单-错误-密码过短.png */
/* 
 * 从交互截图中提取的样式信息：
 * - 错误提示位置：对应输入框的正下方
 * - 错误提示颜色：红色 (#FF4D4F)
 * - 错误提示背景：浅红色背景或白色背景
 * - 图标：红色感叹号图标（左侧）
 */

.login-form .input-field.error {
  border-color: #FF4D4F !important;
}

.login-form .error-message {
  display: flex !important;
  align-items: center !important;
  gap: 5px !important;
  margin-top: 5px !important;
  font-size: 12px !important;
  color: #FF4D4F !important;
  background-color: rgba(255, 77, 79, 0.1) !important;
  padding: 5px 10px !important;
  border-radius: 4px !important;
}

.login-form .error-message::before {
  content: '!' !important;
  display: inline-block !important;
  width: 16px !important;
  height: 16px !important;
  background-color: #FF4D4F !important;
  color: #FFFFFF !important;
  border-radius: 50% !important;
  text-align: center !important;
  line-height: 16px !important;
  font-weight: bold !important;
  flex-shrink: 0 !important;
}

/* ========== 提交按钮 ========== */
.login-form .submit-button {
  display: block !important;
  width: 100% !important;
  height: 40px !important;
  background-color: #FF8000 !important;  /* 主题橙色 */
  color: #FFFFFF !important;
  font-size: 16px !important;
  font-weight: bold !important;
  border: none !important;
  border-radius: 6px !important;
  padding: 4px 10px !important;
  cursor: pointer !important;
  margin-top: 20px !important;
  transition: background-color 0.3s !important;
}

.login-form .submit-button:hover {
  background-color: #FF9933 !important;  /* 悬停时稍微变亮 */
}

.login-form .submit-button:active {
  background-color: #E67300 !important;  /* 点击时稍微变暗 */
}

.login-form .submit-button:disabled {
  background-color: #CCCCCC !important;
  cursor: not-allowed !important;
}

/* ========== 辅助链接 ========== */
.login-form .links {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 10px !important;
  margin-top: 15px !important;
  font-size: 14px !important;
}

.login-form .links a {
  color: #3B99FC !important;  /* 品牌主色 */
  text-decoration: none !important;
  transition: color 0.3s !important;
}

.login-form .links a:hover {
  color: #1E78DB !important;  /* 悬停时变深 */
  text-decoration: underline !important;
}

.login-form .links .separator {
  color: #DEDEDE !important;
}

/* ========== 服务时间说明 ========== */
.login-form .service-time {
  margin-top: 15px !important;
  font-size: 12px !important;
  color: #999999 !important;
  text-align: center !important;
  line-height: 1.5 !important;
}
```

---

## 4. 底部导航 (Bottom Navigation)

### 4.1 文件路径

- **组件**: `frontend/src/components/BottomNavigation.tsx`
- **样式**: `frontend/src/components/BottomNavigation.css`

### 4.2 组件位置说明

- **父容器**: `body.page-login > .toolbar_Div`
- **位置**: 页面最底部，横向占据整个页面宽度
- **尺寸**: `100% × 274px`

### 4.3 完整样式代码

```css
/* ========== 底部导航容器 ========== */
.footer {
  display: block !important;
  position: static !important;
  width: 100% !important;
  height: 274px !important;
  background-color: #FFFFFF !important;
  padding: 30px 150px !important;  /* 左右留白与顶部导航一致 */
  box-sizing: border-box !important;
}

.footer .content {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
}

/* ========== 友情链接区域 ========== */
.footer .partner-section {
  flex: 1 !important;
}

.footer .partner-section h2 {
  font-size: 16px !important;
  color: #333333 !important;
  margin-bottom: 15px !important;
  font-weight: bold !important;
}

.footer .partner-logos {
  display: grid !important;
  grid-template-columns: repeat(2, 200px) !important;
  grid-template-rows: repeat(2, 34px) !important;
  gap: 10px !important;
}

.footer .partner-logo {
  display: block !important;
  width: 200px !important;
  height: 34px !important;
  object-fit: contain !important;
}

/* ========== 二维码区域 ========== */
.footer .qrcode-section {
  display: flex !important;
  gap: 20px !important;
}

.footer .qrcode-item {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}

.footer .qrcode-item h2 {
  font-size: 12px !important;
  color: #333333 !important;
  margin-bottom: 8px !important;
  text-align: center !important;
}

.footer .qrcode-item img {
  display: block !important;
  width: 80px !important;
  height: 80px !important;
  object-fit: contain !important;
}

.footer .qrcode-item p {
  font-size: 11px !important;
  color: #666666 !important;
  margin-top: 5px !important;
  text-align: center !important;
}

/* ========== 版权信息区域 ========== */
.footer .copyright {
  display: block !important;
  width: 100% !important;
  background-color: #F5F5F5 !important;
  padding: 15px !important;
  text-align: center !important;
  font-size: 12px !important;
  color: #666666 !important;
  line-height: 1.6 !important;
  margin-top: 20px !important;
}

.footer .copyright a {
  color: #3B99FC !important;
  text-decoration: none !important;
}

.footer .copyright a:hover {
  text-decoration: underline !important;
}
```

---

## 5. 短信验证弹窗 (SMS Verification Modal)

### 5.1 文件路径

- **组件**: `frontend/src/components/SmsVerificationModal.tsx`
- **样式**: `frontend/src/components/SmsVerificationModal.css`

### 5.2 组件位置说明

- **父容器**: `body` (最顶层)
- **位置**: 屏幕居中的模态弹窗
- **尺寸**: 约 `700px × 300px`
- **层级**: `z-index: 1000`（弹窗），`z-index: 999`（遮罩）

### 5.3 完整样式代码

```css
/* ========== 背景遮罩 ========== */
.modal-backdrop {
  display: block !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
  z-index: 999 !important;
}

/* ========== 弹窗容器 ========== */
.sms-verification-modal {
  display: block !important;
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 700px !important;
  background-color: #FFFFFF !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  z-index: 1000 !important;
  padding: 0 !important;
}

/* ========== 弹窗标题栏 ========== */
.sms-verification-modal .modal-header {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 20px 30px !important;
  border-bottom: 1px solid #DEDEDE !important;
}

.sms-verification-modal .modal-header h2 {
  font-size: 18px !important;
  color: #333333 !important;
  font-weight: bold !important;
  margin: 0 !important;
}

.sms-verification-modal .modal-header .close-button {
  display: inline-block !important;
  width: 20px !important;
  height: 20px !important;
  font-size: 20px !important;
  line-height: 20px !important;
  text-align: center !important;
  color: #999999 !important;
  cursor: pointer !important;
  transition: color 0.3s !important;
}

.sms-verification-modal .modal-header .close-button:hover {
  color: #333333 !important;
}

/* ========== 标签页 ========== */
.sms-verification-modal .tabs {
  display: flex !important;
  padding: 0 30px !important;
  border-bottom: 1px solid #DEDEDE !important;
}

.sms-verification-modal .tab {
  font-size: 14px !important;
  padding: 15px 20px !important;
  cursor: pointer !important;
  color: #666666 !important;
  border-bottom: 2px solid transparent !important;
  transition: color 0.3s, border-color 0.3s !important;
}

.sms-verification-modal .tab.active {
  color: #3B99FC !important;  /* 品牌主色 */
  font-weight: bold !important;
  border-bottom-color: #3B99FC !important;
}

/* ========== 表单输入区域 ========== */
.sms-verification-modal .modal-body {
  padding: 30px !important;
}

.sms-verification-modal .form-group {
  margin-bottom: 20px !important;
}

.sms-verification-modal .form-group label {
  display: block !important;
  font-size: 14px !important;
  color: #333333 !important;
  margin-bottom: 8px !important;
}

.sms-verification-modal .form-group input {
  display: block !important;
  width: 100% !important;
  height: 40px !important;
  padding: 10px !important;
  font-size: 14px !important;
  color: #333333 !important;
  border: 1px solid #DEDEDE !important;
  border-radius: 4px !important;
  box-sizing: border-box !important;
  transition: border-color 0.3s !important;
}

.sms-verification-modal .form-group input::placeholder {
  color: #999999 !important;
}

.sms-verification-modal .form-group input:focus {
  outline: none !important;
  border-color: #3B99FC !important;
}

/* ========== 验证码输入区域（横向布局）========== */
.sms-verification-modal .verification-code-group {
  display: flex !important;
  gap: 10px !important;
  margin-bottom: 20px !important;
}

.sms-verification-modal .verification-code-group input {
  flex: 1 !important;
}

.sms-verification-modal .verification-code-group button {
  width: 120px !important;
  flex-shrink: 0 !important;
}

/* ========== 获取验证码按钮 ========== */
/* 📸 参考截图: requirements/images/交互状态截图/短信验证-错误-证件号为空.png */
/* 📸 参考截图: requirements/images/交互状态截图/短信验证-成功-验证码已发送.png */
/* 
 * 从交互截图中提取的样式信息：
 * - 默认状态：蓝色边框，白色背景，蓝色文字
 * - 倒计时状态：虚线边框，白色背景，灰色文字，不可点击
 * - 空证件号状态：虚线边框（视觉反馈）
 */

.sms-verification-modal .get-code-button {
  height: 40px !important;
  background-color: #FFFFFF !important;
  color: #3B99FC !important;
  font-size: 14px !important;
  border: 1px solid #3B99FC !important;
  border-radius: 4px !important;
  padding: 10px !important;
  cursor: pointer !important;
  transition: background-color 0.3s, color 0.3s !important;
}

.sms-verification-modal .get-code-button:hover:not(:disabled) {
  background-color: #3B99FC !important;
  color: #FFFFFF !important;
}

.sms-verification-modal .get-code-button:disabled {
  background-color: #FFFFFF !important;
  color: #999999 !important;
  border: 1px dashed #DEDEDE !important;
  cursor: not-allowed !important;
}

/* ========== 错误提示（参考交互截图）========== */
/* 📸 参考截图: requirements/images/交互状态截图/短信验证-错误-证件号错误.png */
/* 
 * 从交互截图中提取的样式信息：
 * - 错误提示位置：验证码输入区域下方，确定按钮上方
 * - 错误提示样式：红色文字，白色背景，左侧有红色感叹号图标
 * - 错误提示文字："请输入正确的用户信息！"
 */

.sms-verification-modal .error-message {
  display: flex !important;
  align-items: center !important;
  gap: 5px !important;
  margin-bottom: 15px !important;
  font-size: 12px !important;
  color: #FF4D4F !important;
  background-color: rgba(255, 77, 79, 0.1) !important;
  padding: 8px 12px !important;
  border-radius: 4px !important;
}

.sms-verification-modal .error-message::before {
  content: '!' !important;
  display: inline-block !important;
  width: 16px !important;
  height: 16px !important;
  background-color: #FF4D4F !important;
  color: #FFFFFF !important;
  border-radius: 50% !important;
  text-align: center !important;
  line-height: 16px !important;
  font-weight: bold !important;
  flex-shrink: 0 !important;
}

/* ========== 确定按钮 ========== */
.sms-verification-modal .submit-button {
  display: block !important;
  width: 100% !important;
  height: 40px !important;
  background-color: #FF8000 !important;  /* 主题橙色 */
  color: #FFFFFF !important;
  font-size: 16px !important;
  font-weight: bold !important;
  border: none !important;
  border-radius: 6px !important;
  padding: 10px !important;
  cursor: pointer !important;
  margin-top: 10px !important;
  transition: background-color 0.3s !important;
}

.sms-verification-modal .submit-button:hover {
  background-color: #FF9933 !important;
}

.sms-verification-modal .submit-button:active {
  background-color: #E67300 !important;
}

.sms-verification-modal .submit-button:disabled {
  background-color: #CCCCCC !important;
  cursor: not-allowed !important;
}
```

---

## 6. 主内容区域（背景轮播）

### 6.1 文件路径

- **组件**: `frontend/src/components/LoginPanel.tsx`
- **样式**: `frontend/src/components/LoginPanel.css`

### 6.2 组件位置说明

- **父容器**: `body.page-login > .toolbar_Div`
- **位置**: 顶部导航和底部导航之间
- **尺寸**: `100% × 600px`

### 6.3 完整样式代码

```css
/* ========== 主内容区域容器 ========== */
.login-panel {
  display: block !important;
  position: relative !important;
  width: 100% !important;
  height: 600px !important;
  overflow: hidden !important;
}

/* ========== 背景轮播 ========== */
.login-panel .background-carousel {
  display: block !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
}

.login-panel .background-slide {
  display: none !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background-size: cover !important;
  background-position: 50% 50% !important;
  background-repeat: no-repeat !important;
  transition: opacity 1s ease-in-out !important;
}

.login-panel .background-slide.active {
  display: block !important;
  opacity: 1 !important;
}

.login-panel .background-slide:nth-child(1) {
  background-image: url('/images/登录页面-主内容区-背景图1.jpg') !important;
}

.login-panel .background-slide:nth-child(2) {
  background-image: url('/images/登录页面-主内容区-背景图2.jpg') !important;
}
```

---

## 7. 使用说明

### 7.1 在 React 组件中使用

```tsx
import './TopNavigation.css';
import './LoginForm.css';
import './BottomNavigation.css';
import './SmsVerificationModal.css';
import './LoginPanel.css';

export const LoginPage = () => {
  return (
    <div className="page-login">
      <div className="toolbar_Div">
        {/* 顶部导航 */}
        <TopNavigation />
        
        {/* 主内容区 */}
        <div className="login-panel">
          <BackgroundCarousel />
          <LoginForm />
        </div>
        
        {/* 底部导航 */}
        <BottomNavigation />
      </div>
      
      {/* 短信验证弹窗（条件渲染）*/}
      {showSmsModal && <SmsVerificationModal />}
    </div>
  );
};
```

### 7.2 图片资源路径

所有图片资源已下载到 `requirements/images/` 目录，在实际开发时需要复制到项目的 `public/images/` 目录：

```bash
# 复制图片资源
cp -r requirements/images/*.png public/images/
cp -r requirements/images/*.jpg public/images/
```

### 7.3 CSS 变量使用（推荐）

建议在全局样式文件中定义颜色变量，然后在各组件样式中使用：

```css
/* global.css */
:root {
  --brand-primary: #3B99FC;
  --theme-primary: #FF8000;
  --text-primary: #333333;
  --color-error: #FF4D4F;
  --border-input: #DEDEDE;
}

/* 组件样式中使用 */
.login-form .tab.active {
  color: var(--brand-primary) !important;
}
```

### 7.4 响应式设计建议

当前样式基于 1920px 桌面端设计，如需支持响应式，建议添加媒体查询：

```css
/* 平板端 (768px - 1024px) */
@media (max-width: 1024px) {
  .login-form {
    right: 50px !important;
  }
  
  .footer {
    padding: 30px 50px !important;
  }
}

/* 移动端 (< 768px) */
@media (max-width: 768px) {
  .login-form {
    position: relative !important;
    right: auto !important;
    width: 90% !important;
    margin: 20px auto !important;
  }
  
  .footer .content {
    flex-direction: column !important;
  }
}
```

---

## 8. 验证清单

开发完成后，请使用以下清单验证 UI 还原度：

### 8.1 顶部导航
- [ ] Logo 显示正确（200×50px）
- [ ] Logo 文字清晰可见
- [ ] 欢迎文字位于右侧
- [ ] 高度为 80px
- [ ] 背景色为白色

### 8.2 登录表单
- [ ] 表单位于页面右侧，距离右边缘约 150px
- [ ] 表单宽度 380px，高度约 373px
- [ ] 标签页切换正常（账号登录/扫码登录）
- [ ] 输入框边框颜色为 #DEDEDE
- [ ] 聚焦时边框变为蓝色 (#3B99FC)
- [ ] "立即登录"按钮背景为橙色 (#FF8000)
- [ ] 错误提示样式与截图一致（红色文字，感叹号图标）
- [ ] 辅助链接为蓝色，悬停时有下划线

### 8.3 底部导航
- [ ] 友情链接显示 4 个合作伙伴 Logo（2×2 Grid）
- [ ] 每个 Logo 尺寸为 200×34px
- [ ] 二维码显示 4 个官方平台（横向排列）
- [ ] 每个二维码尺寸为 80×80px
- [ ] 版权信息区域背景为浅灰色 (#F5F5F5)

### 8.4 短信验证弹窗
- [ ] 弹窗居中显示
- [ ] 背景遮罩为半透明黑色
- [ ] 弹窗宽度约 700px
- [ ] 证件号输入框限制 4 位数字
- [ ] "获取验证码"按钮点击后进入倒计时状态
- [ ] 倒计时状态显示虚线边框，不可点击
- [ ] 错误提示样式与截图一致（红色文字，感叹号图标）
- [ ] "确定"按钮背景为橙色 (#FF8000)

### 8.5 主内容区域
- [ ] 背景图片自动轮播（2 张图片）
- [ ] 背景图片尺寸为 1497×600px
- [ ] 登录表单浮动在背景图上方
- [ ] 轮播切换有淡入淡出效果

---

## 9. 交互场景验证

### 9.1 登录表单验证

**测试用例 1：用户名为空**
- 步骤：不输入用户名，直接点击"立即登录"
- 预期：显示错误提示"请输入用户名！"
- 参考截图：`./images/交互状态截图/登录表单-错误-用户名为空.png`

**测试用例 2：密码为空**
- 步骤：输入用户名，不输入密码，点击"立即登录"
- 预期：显示错误提示"请输入密码！"
- 参考截图：`./images/交互状态截图/登录表单-错误-密码为空.png`

**测试用例 3：密码过短**
- 步骤：输入用户名，输入少于6位密码（如 "123"），点击"立即登录"
- 预期：显示错误提示"密码长度不能少于6位！"
- 参考截图：`./images/交互状态截图/登录表单-错误-密码过短.png`

### 9.2 短信验证弹窗验证

**测试用例 4：证件号为空**
- 步骤：不输入证件号，直接点击"获取验证码"
- 预期："获取验证码"按钮显示虚线边框（视觉反馈）
- 参考截图：`./images/交互状态截图/短信验证-错误-证件号为空.png`

**测试用例 5：证件号错误**
- 步骤：输入错误的证件号（如 "9999"），点击"获取验证码"
- 预期：显示错误提示"请输入正确的用户信息！"，按钮进入倒计时状态
- 参考截图：`./images/交互状态截图/短信验证-错误-证件号错误.png`

**测试用例 6：验证码发送成功**
- 步骤：输入正确的证件号（如 "9012"），点击"获取验证码"
- 预期：按钮进入倒计时状态，显示"重新发送(NN)"，无错误提示
- 参考截图：`./images/交互状态截图/短信验证-成功-验证码已发送.png`

---

## 10. 附加说明

1. **颜色精确度**：所有颜色值基于视觉分析，实际开发时建议使用浏览器开发者工具在 https://kyfw.12306.cn/otn/resources/login.html 上取色验证。

2. **字体**：页面未检测到特殊字体，建议使用系统默认字体栈：
   ```css
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
   ```

3. **图片优化**：所有下载的图片资源已包含原始尺寸和显示尺寸信息，建议在使用前进行压缩优化。

4. **CSS 覆盖**：所有样式使用了 `!important`，确保在任何情况下都能正确应用。如果与现有样式冲突，请检查选择器优先级。

5. **浏览器兼容性**：样式使用了现代 CSS 特性（Flexbox、Grid、CSS Variables），请确保目标浏览器支持：
   - Chrome 29+
   - Firefox 28+
   - Safari 9+
   - Edge 12+

---

**文档版本**: 1.0  
**最后更新**: 2025-12-28  
**维护者**: UI Analyzer Agent
