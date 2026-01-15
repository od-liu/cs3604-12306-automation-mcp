# UI 样式规范 - 注册页面

## 目录
1. [颜色体系](#1-颜色体系)
2. [顶部导航](#2-顶部导航)
3. [注册表单](#3-注册表单)
4. [注册验证弹窗](#4-注册验证弹窗)
5. [底部导航](#5-底部导航)
6. [使用说明](#6-使用说明)

---

## 1. 颜色体系

### 1.1 品牌色/主题色
```css
/* 主蓝色 - 用于Logo、搜索按钮、主导航激活态 */
$primary-blue: #0066cc;

/* 浅蓝色 - 用于主导航背景、输入框焦点边框 */
$light-blue: #e6f2ff;
```

### 1.2 文本颜色
```css
/* 深色文本 - 表单标签、主要文字 */
$text-dark: #333333;

/* 中等灰色 - 提示文字、辅助信息 */
$text-medium: #666666;

/* 浅灰色 - 占位符文字、次要信息 */
$text-light: #999999;

/* 链接蓝色 - 文字链接、协议链接 */
$link-blue: #0066cc;
```

### 1.3 状态颜色
```css
/* 错误红色 - 错误提示文字 */
$error-text: #ff4d4f;

/* 错误背景 - 错误提示背景 */
$error-bg: #fff1f0;

/* 错误边框 - 错误提示边框 */
$error-border: #ffccc7;

/* 成功绿色 - 验证通过勾勾 */
$success-green: #52c41a;

/* 必填星号 - 红色 */
$required-mark: #ff4d4f;

/* 提示橙色 - 表单提示文字 */
$hint-orange: #ff8800;
```

### 1.4 背景和边框
```css
/* 页面背景 - 浅灰色 */
$page-bg: #f5f5f5;

/* 白色容器 - 表单容器、卡片背景 */
$white-bg: #ffffff;

/* 边框颜色 - 输入框边框 */
$border-color: #d9d9d9;

/* 焦点边框 - 输入框焦点时 */
$focus-border: #0066cc;
```

---

## 2. 顶部导航

### 2.1 文件路径
- 组件: `frontend/src/components/Header/Header.tsx`
- 样式: `frontend/src/components/Header/Header.css`

### 2.2 组件位置说明
- 位置: 页面最上方
- 尺寸: 1300px × 84px
- 布局: Flexbox（水平排列，三个区域：Logo、搜索框、用户链接）

### 2.3 完整样式代码

```css
/* ========== 顶部导航容器 ========== */
/* 📸 参考截图: requirements/images/registration/组件特写截图/顶部导航.png */

.train-list-top-container {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  height: 84px !important;
  background-color: #ffffff !important;
  padding: 0 106px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
}

/* ========== Logo区域 ========== */
.logo-section {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  cursor: pointer !important;
}

.logo-section img {
  width: 50px !important;
  height: 50px !important;
}

.logo-text {
  display: flex !important;
  flex-direction: column !important;
}

.logo-title {
  font-size: 18px !important;
  font-weight: 600 !important;
  color: #0066cc !important;
  line-height: 1.2 !important;
}

.logo-subtitle {
  font-size: 12px !important;
  color: #999999 !important;
  line-height: 1.2 !important;
  margin-top: 2px !important;
}

/* ========== 搜索框区域 ========== */
.search-section {
  display: flex !important;
  align-items: center !important;
  gap: 0 !important;
}

.search-section input {
  width: 400px !important;
  height: 40px !important;
  border: 1px solid #d9d9d9 !important;
  border-right: none !important;
  border-radius: 4px 0 0 4px !important;
  padding: 0 15px !important;
  font-size: 14px !important;
  color: #333333 !important;
}

.search-section input::placeholder {
  color: #999999 !important;
}

.search-section input:focus {
  outline: none !important;
  border-color: #0066cc !important;
}

.search-button {
  width: 60px !important;
  height: 40px !important;
  background-color: #0066cc !important;
  border: none !important;
  border-radius: 0 4px 4px 0 !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.search-button:hover {
  background-color: #0052a3 !important;
}

.search-button img {
  width: 20px !important;
  height: 20px !important;
}

/* ========== 用户链接区域 ========== */
.user-links-section {
  display: flex !important;
  align-items: center !important;
  gap: 15px !important;
}

.user-links-section a,
.user-links-section span {
  font-size: 14px !important;
  color: #666666 !important;
  text-decoration: none !important;
}

.user-links-section a:hover {
  color: #0066cc !important;
}

.user-links-section a[href="/register"] {
  color: #0066cc !important;
  font-weight: 500 !important;
}
```

---

## 3. 注册表单

### 3.1 文件路径
- 组件: `frontend/src/components/RegistrationForm/RegistrationForm.tsx`
- 样式: `frontend/src/components/RegistrationForm/RegistrationForm.css`

### 3.2 组件位置说明
- 位置: 页面中间区域，居中显示
- 尺寸: 950px × 619px
- 布局: 垂直堆叠的表单行

### 3.3 完整样式代码

```css
/* ========== 表单容器 ========== */
/* 📸 参考截图: requirements/images/registration/组件特写截图/注册表单.png */

.register-form {
  display: block !important;
  width: 950px !important;
  margin: 0 64px !important;
}

/* ========== 表单行 ========== */
.form-row {
  display: flex !important;
  align-items: flex-start !important;
  margin-bottom: 20px !important;
}

/* ========== 标签区域 ========== */
.form-label-wrapper {
  width: 150px !important;
  text-align: right !important;
  padding-right: 15px !important;
}

.form-label {
  font-size: 14px !important;
  color: #333333 !important;
  font-weight: 400 !important;
  line-height: 40px !important;
}

.required-mark {
  color: #ff4d4f !important;
  font-size: 14px !important;
  margin-right: 2px !important;
}

/* ========== 输入区域 ========== */
.form-input-container {
  flex: 1 !important;
}

.form-input-wrapper {
  position: relative !important;
}

.form-input {
  width: 100% !important;
  height: 40px !important;
  border: 1px solid #d9d9d9 !important;
  border-radius: 4px !important;
  padding: 0 15px !important;
  font-size: 14px !important;
  color: #333333 !important;
  transition: border-color 0.3s !important;
}

.form-input::placeholder {
  color: #999999 !important;
}

.form-input:focus {
  outline: none !important;
  border-color: #0066cc !important;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1) !important;
}

.form-input.error {
  border-color: #ff4d4f !important;
}

/* ========== 提示文字 ========== */
.form-hint-message {
  display: block !important;
  color: #ff8800 !important;
  font-size: 12px !important;
  margin-top: 5px !important;
  line-height: 1.5 !important;
}

/* ========== 下拉框 ========== */
.select-dropdown {
  position: relative !important;
  width: 100% !important;
  height: 40px !important;
  border: 1px solid #d9d9d9 !important;
  border-radius: 4px !important;
  padding: 0 35px 0 15px !important;
  background-color: #ffffff !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
}

.select-dropdown:hover {
  border-color: #0066cc !important;
}

.selected-value-display {
  font-size: 14px !important;
  color: #333333 !important;
  flex: 1 !important;
}

.arrow {
  position: absolute !important;
  right: 15px !important;
  width: 0 !important;
  height: 0 !important;
  border-left: 5px solid transparent !important;
  border-right: 5px solid transparent !important;
  border-top: 5px solid #666666 !important;
}

/* ========== 密码强度指示器 ========== */
.password-strength {
  position: absolute !important;
  right: 15px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
}

.strength-bars {
  display: flex !important;
  gap: 3px !important;
}

.strength-bar {
  width: 20px !important;
  height: 4px !important;
  background-color: #d9d9d9 !important;
  border-radius: 2px !important;
}

.strength-bar.active-weak {
  background-color: #ff4d4f !important;
}

.strength-bar.active-medium {
  background-color: #ff8800 !important;
}

.strength-bar.active-strong {
  background-color: #52c41a !important;
}

/* ========== 手机号输入 ========== */
.phone-input-wrapper {
  display: flex !important;
  gap: 10px !important;
}

.phone-country-select {
  width: 150px !important;
  flex-shrink: 0 !important;
}

.phone-input {
  flex: 1 !important;
}

/* ========== 协议区域 ========== */
.agreement-section {
  margin: 20px 0 !important;
}

.agreement-wrapper {
  display: flex !important;
  align-items: flex-start !important;
  gap: 8px !important;
}

.agreement-checkbox {
  width: 16px !important;
  height: 16px !important;
  margin-top: 2px !important;
  cursor: pointer !important;
}

.agreement-text {
  font-size: 14px !important;
  color: #666666 !important;
  line-height: 1.6 !important;
}

.agreement-link {
  color: #0066cc !important;
  text-decoration: none !important;
}

.agreement-link:hover {
  text-decoration: underline !important;
}

/* ========== 提交按钮 ========== */
.submit-section {
  margin-top: 30px !important;
}

.submit-button {
  width: 100% !important;
  height: 48px !important;
  background-color: #ff8800 !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 4px !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  cursor: pointer !important;
  transition: background-color 0.3s !important;
}

.submit-button:hover {
  background-color: #e67700 !important;
}

.submit-button:disabled {
  background-color: #d9d9d9 !important;
  color: #999999 !important;
  cursor: not-allowed !important;
}

/* ========== 输入框交互状态 ========== */
/* 📸 参考截图: requirements/images/registration/交互状态截图/注册表单-错误-两次密码不一致.png */
/* 📸 参考截图: requirements/images/registration/交互状态截图/注册表单-错误-手机号格式错误.png */

/* 验证通过状态 - 绿色边框 */
.form-input.valid,
.form-input:valid {
  border-color: #52c41a !important;
}

/* 错误状态 - 红色边框 */
.form-input.error,
.form-input.invalid {
  border-color: #ff4d4f !important;
}

/* 验证通过勾勾 */
.validation-check {
  position: absolute !important;
  right: 15px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  color: #52c41a !important;
  font-size: 16px !important;
  font-weight: 700 !important;
}

/* ========== 错误提示消息 ========== */
/* 📸 参考截图: requirements/images/registration/交互状态截图/注册表单-错误-两次密码不一致.png */
/* 📸 参考截图: requirements/images/registration/交互状态截图/注册表单-错误-手机号格式错误.png */
.error-message,
.field-error-message {
  display: block !important;
  color: #ff4d4f !important;
  font-size: 12px !important;
  margin-top: 5px !important;
  line-height: 1.5 !important;
}

/* 表单顶部错误提示（全局错误） */
.form-error-message {
  display: block !important;
  color: #ff4d4f !important;
  background-color: #fff1f0 !important;
  border: 1px solid #ffccc7 !important;
  border-radius: 4px !important;
  padding: 10px 15px !important;
  font-size: 14px !important;
  margin-bottom: 20px !important;
}
```

---

## 4. 注册验证弹窗

### 4.1 文件路径
- 组件: `frontend/src/components/RegistrationVerificationModal/RegistrationVerificationModal.tsx`
- 样式: `frontend/src/components/RegistrationVerificationModal/RegistrationVerificationModal.css`

### 4.2 组件位置说明
- 类型: 模态弹窗 (Modal)
- 定位: position: fixed, 居中显示
- 弹窗尺寸: 约500px × 300px
- z-index: 1000
- 遮罩层: 半透明黑色背景 rgba(0, 0, 0, 0.5)

### 4.3 完整样式代码

```css
/* ========== 遮罩层 ========== */
/* 📸 参考截图: requirements/images/registration/交互状态截图/注册验证弹窗-初始状态.png */

.reg-verification-modal-backdrop {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
  z-index: 1000 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

/* ========== 弹窗容器 ========== */
.reg-verification-modal {
  position: relative !important;
  width: 500px !important;
  max-width: 90% !important;
  background-color: #ffffff !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15) !important;
  overflow: hidden !important;
}

/* ========== 弹窗头部 ========== */
.reg-verification-modal-header {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  background-color: #0066cc !important;
  padding: 15px 20px !important;
}

.reg-verification-modal-header h3 {
  font-size: 18px !important;
  font-weight: 600 !important;
  color: #ffffff !important;
  margin: 0 !important;
}

.close-button {
  font-size: 24px !important;
  color: #ffffff !important;
  background-color: transparent !important;
  border: none !important;
  cursor: pointer !important;
  padding: 0 !important;
  width: 30px !important;
  height: 30px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.close-button:hover {
  opacity: 0.8 !important;
}

/* ========== 弹窗内容 ========== */
.reg-verification-modal-content {
  padding: 30px 20px !important;
}

.verification-message {
  font-size: 14px !important;
  color: #333333 !important;
  text-align: center !important;
  margin: 0 0 20px 0 !important;
  line-height: 1.6 !important;
}

/* ========== 验证表单 ========== */
.verification-form {
  display: block !important;
}

.verification-form .form-row {
  display: flex !important;
  align-items: center !important;
  margin-bottom: 25px !important;
  justify-content: center !important;
}

.verification-form .form-label {
  font-size: 14px !important;
  color: #333333 !important;
  width: 80px !important;
  text-align: right !important;
  padding-right: 15px !important;
}

.verification-form .form-input {
  width: 200px !important;
  height: 40px !important;
  border: 1px solid #d9d9d9 !important;
  border-radius: 4px !important;
  padding: 0 15px !important;
  font-size: 16px !important;
  text-align: center !important;
  letter-spacing: 3px !important;
}

.verification-form .form-input:focus {
  outline: none !important;
  border-color: #0066cc !important;
}

/* ========== 按钮组 ========== */
.button-group {
  display: flex !important;
  justify-content: center !important;
  gap: 15px !important;
}

.complete-button {
  width: 120px !important;
  height: 40px !important;
  background-color: #ff8800 !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 4px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  cursor: pointer !important;
}

.complete-button:hover {
  background-color: #e67700 !important;
}

.back-button {
  width: 120px !important;
  height: 40px !important;
  background-color: transparent !important;
  color: #0066cc !important;
  border: 1px solid #0066cc !important;
  border-radius: 4px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  cursor: pointer !important;
}

.back-button:hover {
  background-color: rgba(0, 102, 204, 0.05) !important;
}
```

### 4.4 React组件示例

```tsx
import React, { useState } from 'react';
import './RegistrationVerificationModal.css';

interface RegistrationVerificationModalProps {
  phoneNumber: string;
  onClose: () => void;
  onComplete: (code: string) => void;
  onBack: () => void;
}

const RegistrationVerificationModal: React.FC<RegistrationVerificationModalProps> = ({
  phoneNumber,
  onClose,
  onComplete,
  onBack
}) => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length === 6) {
      onComplete(verificationCode);
    }
  };

  return (
    <div className="reg-verification-modal-backdrop">
      <div className="reg-verification-modal">
        <div className="reg-verification-modal-header">
          <h3>手机验证</h3>
          <button className="close-button" onClick={onClose} aria-label="关闭">
            ×
          </button>
        </div>
        
        <div className="reg-verification-modal-content">
          <p className="verification-message">
            验证码已发送至{phoneNumber}
          </p>
          
          <form className="verification-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="form-label">验证码：</label>
              <input 
                type="text" 
                className="form-input" 
                maxLength={6}
                placeholder="请输入6位验证码"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            
            <div className="button-group">
              <button type="submit" className="complete-button">
                完成注册
              </button>
              <button type="button" className="back-button" onClick={onBack}>
                返回修改
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationVerificationModal;
```

### 4.5 验证清单

- [ ] 弹窗使用实际class名称 `.reg-verification-modal-backdrop` 和 `.reg-verification-modal`
- [ ] 弹窗居中显示（fixed定位）
- [ ] z-index为1000
- [ ] 遮罩层半透明黑色背景 rgba(0, 0, 0, 0.5)
- [ ] 标题栏背景色为 #0066cc（蓝色）
- [ ] 验证码输入框最大长度为6
- [ ] 完成按钮背景色为 #ff8800（橙色）
- [ ] 返回按钮为蓝色边框样式
- [ ] 所有文本内容与截图一致

---

## 5. 底部导航

### 4.1 文件路径
- 组件: `frontend/src/components/Footer/Footer.tsx`
- 样式: `frontend/src/components/Footer/Footer.css`

### 4.2 组件位置说明
- 位置: 页面最底部
- 尺寸: 1192px × 120px
- 布局: Flexbox（左右两栏：友情链接和二维码）

### 4.3 完整样式代码

```css
/* ========== 页脚容器 ========== */
/* 📸 参考截图: requirements/images/registration/组件特写截图/底部导航.png */

.page-footer {
  background-color: #f5f5f5 !important;
  padding: 30px 0 !important;
  border-top: 1px solid #e0e0e0 !important;
}

.footer-container {
  max-width: 1200px !important;
  margin: 0 auto !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
}

/* ========== 友情链接区域 ========== */
.footer-links-section {
  width: 45% !important;
}

.footer-links-section h3 {
  font-size: 16px !important;
  color: #333333 !important;
  margin-bottom: 15px !important;
}

.partner-logos-grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 15px !important;
}

.partner-logos-grid img {
  width: 100% !important;
  height: 40px !important;
  object-fit: contain !important;
}

/* ========== 二维码区域 ========== */
.footer-qrcode-section {
  width: 50% !important;
}

.qrcode-titles {
  display: flex !important;
  justify-content: space-around !important;
  margin-bottom: 10px !important;
}

.qrcode-title {
  font-size: 12px !important;
  color: #666666 !important;
  text-align: center !important;
}

.qrcode-images {
  display: flex !important;
  justify-content: space-around !important;
  margin-bottom: 15px !important;
}

.qrcode-images img {
  width: 80px !important;
  height: 80px !important;
}

.app-download-notice {
  font-size: 12px !important;
  color: #999999 !important;
  text-align: center !important;
  line-height: 1.6 !important;
  margin: 15px 0 0 0 !important;
}
```

---

## 6. 使用说明

### 6.1 如何在 React 组件中使用

```tsx
import React from 'react';
import './RegistrationForm.css';

const RegistrationForm: React.FC = () => {
  return (
    <form className="register-form">
      {/* 用户名字段 */}
      <div className="form-row">
        <div className="form-label-wrapper">
          <label className="form-label">
            <span className="required-mark">*</span>用户名：
          </label>
        </div>
        <div className="form-input-container">
          <div className="form-input-wrapper">
            <input 
              className="form-input" 
              type="text" 
              placeholder="用户名设置成功后不可修改" 
            />
            <span className="form-hint-message">
              6-30位字母、数字或"_"，字母开头
            </span>
          </div>
        </div>
      </div>
      
      {/* 其他字段... */}
      
      <div className="submit-section">
        <button type="submit" className="submit-button">
          下一步
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
```

### 6.2 验证清单

在实现UI时，请确保：

- [ ] 所有CSS类名与样式规范一致
- [ ] 所有颜色值精确匹配（建议使用变量）
- [ ] 所有尺寸和间距精确匹配
- [ ] 所有文本内容与需求文档完全一致
- [ ] 输入框焦点状态正确显示
- [ ] 错误提示样式正确显示（参考 Phase 7 交互截图）
- [ ] 密码强度指示器正常工作
- [ ] 下拉框交互正常
- [ ] 所有图片资源路径正确
- [ ] 响应式布局适配各种屏幕尺寸

### 6.3 注意事项

1. **颜色值来源**: 所有颜色值基于视觉分析，建议使用浏览器取色器验证精确值
2. **交互状态**: ✅ 已完成 Phase 7 交互场景截图，所有错误提示和验证弹窗的精确样式已补充
3. **图片资源**: 所有Logo和二维码资源复用自登录页面，确保资源路径正确
4. **CSS优先级**: 所有样式使用 `!important` 确保优先级，实际项目中可根据需要调整
5. **交互场景覆盖**:
   - ✅ 两次密码不一致错误提示
   - ✅ 手机号格式错误提示
   - ✅ 注册验证弹窗初始状态
6. **HTML结构准确性**: 所有class名称和HTML结构都从实际DOM中提取，确保100%准确

---

**文档版本**: 1.0  
**生成日期**: 2026-01-15  
**更新状态**: ✅ Phase 7 交互场景已完成，所有交互状态样式已补充
