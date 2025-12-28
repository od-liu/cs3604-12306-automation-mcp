# UI 样式规范 - 12306登录页面

> 本文档基于浏览器自动化分析生成，所有CSS代码可直接复制使用

生成时间: 2025-12-28

---

## 1. 颜色体系

### 1.1 品牌色

```css
:root {
  /* 主品牌色 - 橙色 */
  --color-primary: #FF7200;
  --color-primary-hover: #FF8A33;
  --color-primary-active: #E66600;
  
  /* 强调色 - 蓝色 */
  --color-accent: #0066CC;
  --color-accent-hover: #0052A3;
}
```

### 1.2 文本颜色

```css
:root {
  /* 文本色 */
  --color-text-primary: #333333;    /* 主要文本 */
  --color-text-secondary: #999999;  /* 次要文本 */
  --color-text-tertiary: #C1C1C1;   /* 浅色文本 */
  --color-text-placeholder: rgba(0, 0, 0, 0.3);  /* 占位符 */
  --color-text-link: #0066CC;       /* 链接 */
}
```

### 1.3 状态颜色

```css
:root {
  /* 状态色 */
  --color-error: #FF4D4F;     /* 错误 */
  --color-success: #52C41A;   /* 成功 */
  --color-warning: #FAAD14;   /* 警告 */
}
```

### 1.4 背景和边框

```css
:root {
  /* 背景色 */
  --color-bg-page: #FFFFFF;        /* 页面背景 */
  --color-bg-container: #FFFFFF;   /* 容器背景 */
  --color-bg-disabled: #F5F5F5;    /* 禁用背景 */
  
  /* 边框色 */
  --color-border: #DEDEDE;         /* 主边框 */
  --color-border-light: #EEEEEE;   /* 浅边框 */
}
```

---

## 2. 顶部导航

### 2.1 文件路径
- 组件: `frontend/src/components/Header/Header.tsx`
- 样式: `frontend/src/components/Header/Header.css`

### 2.2 组件位置说明
- 位置: 页面顶部，横向占满整个宽度
- 尺寸: 100% × ~80px
- 背景: 白色
- 布局: 居中容器 + Flexbox

### 2.3 完整样式代码

```css
/* ========== 顶部导航容器 ========== */
.header {
  width: 100% !important;
  height: 80px !important;
  background-color: #FFFFFF !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08) !important;
  position: relative !important;
  z-index: 1000 !important;
}

.header .wrapper {
  max-width: 1200px !important;
  margin: 0 auto !important;
  height: 100% !important;
  padding: 0 20px !important;
}

.header-con {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  height: 100% !important;
}

/* ========== Logo 样式 ========== */
.logo {
  margin: 0 !important;
  padding: 0 !important;
  height: 50px !important;
}

.logo a {
  display: block !important;
  width: 200px !important;
  height: 50px !important;
  background-image: url('/images/登录页面-顶部导航-Logo.png') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: left center !important;
  text-indent: -9999px !important;  /* 隐藏文字 */
  overflow: hidden !important;
}

/* ========== 欢迎文字 ========== */
.header-welcome {
  font-size: 16px !important;
  color: #333333 !important;
  font-weight: 400 !important;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .header {
    height: 60px !important;
  }
  
  .logo a {
    width: 160px !important;
    height: 40px !important;
  }
  
  .header-welcome {
    font-size: 14px !important;
  }
}
```

---

## 3. 登录表单

### 3.1 文件路径
- 组件: `frontend/src/components/LoginForm/LoginForm.tsx`
- 样式: `frontend/src/components/LoginForm/LoginForm.css`

### 3.2 组件位置说明
- 位置: 主内容区域右侧，绝对定位居中偏右
- 尺寸: 380px × auto (最小高度 450px)
- 背景: 白色卡片，圆角 8px，阴影效果
- 布局: 纵向 Flexbox

### 3.3 完整样式代码

```css
/* ========== 表单卡片容器 ========== */
.login-box {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  margin-left: 215px !important;
  margin-top: -225px !important;
  width: 380px !important;
  min-height: 450px !important;
  background-color: #FFFFFF !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  padding: 30px !important;
  box-sizing: border-box !important;
}

/* ========== 标签页 ========== */
.login-hd {
  display: flex !important;
  list-style: none !important;
  margin: 0 0 30px 0 !important;
  padding: 0 !important;
  border-bottom: 2px solid #EEEEEE !important;
}

.login-hd li {
  flex: 1 !important;
  text-align: center !important;
}

.login-hd li a {
  display: block !important;
  padding: 12px 0 !important;
  font-size: 16px !important;
  color: #999999 !important;
  text-decoration: none !important;
  position: relative !important;
  transition: all 0.3s !important;
}

/* 激活状态的标签 */
.login-hd li.active a {
  color: #0066CC !important;
  font-weight: 500 !important;
}

.login-hd li.active a::after {
  content: '' !important;
  position: absolute !important;
  bottom: -2px !important;
  left: 0 !important;
  right: 0 !important;
  height: 2px !important;
  background-color: #0066CC !important;
}

/* Hover 状态 */
.login-hd li a:hover {
  color: #0066CC !important;
}

/* ========== 表单主体 ========== */
.login-bd {
  width: 100% !important;
}

.login-account {
  display: block !important;
}

/* ========== 输入框容器 ========== */
.login-item {
  position: relative !important;
  margin-bottom: 20px !important;
  height: 44px !important;
}

.item-label {
  position: absolute !important;
  left: 12px !important;
  top: 11px !important;
  z-index: 2 !important;
}

.item-label .icon {
  display: inline-block !important;
  width: 20px !important;
  height: 20px !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
}

.icon-user {
  /* 用户图标 - 可用SVG或图标字体 */
  background-color: #999999 !important;
  mask: url('data:image/svg+xml,...') no-repeat center !important;
}

.icon-pwd {
  /* 密码图标 - 可用SVG或图标字体 */
  background-color: #999999 !important;
  mask: url('data:image/svg+xml,...') no-repeat center !important;
}

/* ========== 输入框样式 ========== */
.input {
  width: 100% !important;
  height: 44px !important;
  line-height: 44px !important;
  padding: 0 12px 0 42px !important;
  border: 1px solid #DEDEDE !important;
  border-radius: 4px !important;
  font-size: 14px !important;
  color: #333333 !important;
  box-sizing: border-box !important;
  transition: all 0.3s !important;
  outline: none !important;
}

.input::placeholder {
  color: rgba(0, 0, 0, 0.3) !important;
}

/* Focus 状态 */
.input:focus {
  border-color: #0066CC !important;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1) !important;
}

/* Error 状态 */
.input.error {
  border-color: #FF4D4F !important;
}

.input.error:focus {
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.1) !important;
}

/* ========== 错误提示 ========== */
.login-error {
  display: none !important;
  align-items: center !important;
  padding: 10px 12px !important;
  margin-bottom: 20px !important;
  background-color: #FFF1F0 !important;
  border: 1px solid #FFCCC7 !important;
  border-radius: 4px !important;
  font-size: 14px !important;
  color: #FF4D4F !important;
}

.login-error[style*="display: block"],
.login-error.show {
  display: flex !important;
}

.login-error .icon {
  margin-right: 8px !important;
  font-size: 16px !important;
}

/* ========== 登录按钮 ========== */
.login-btn {
  margin: 30px 0 20px 0 !important;
}

.btn {
  display: block !important;
  width: 100% !important;
  height: 44px !important;
  line-height: 44px !important;
  text-align: center !important;
  border: none !important;
  border-radius: 4px !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  text-decoration: none !important;
  cursor: pointer !important;
  transition: all 0.3s !important;
  outline: none !important;
}

.btn-primary {
  background: linear-gradient(135deg, #FF7200 0%, #FF8A33 100%) !important;
  color: #FFFFFF !important;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #FF8A33 0%, #FFA050 100%) !important;
  box-shadow: 0 4px 8px rgba(255, 114, 0, 0.3) !important;
}

.btn-primary:active {
  background: linear-gradient(135deg, #E66600 0%, #FF7200 100%) !important;
}

/* Disabled 状态 */
.btn-primary:disabled,
.btn-primary.disabled {
  background: #F5F5F5 !important;
  color: #999999 !important;
  cursor: not-allowed !important;
  box-shadow: none !important;
}

/* ========== 底部链接 ========== */
.login-txt {
  text-align: center !important;
  font-size: 14px !important;
  color: #999999 !important;
}

.login-txt a {
  color: #0066CC !important;
  text-decoration: none !important;
  transition: color 0.3s !important;
}

.login-txt a:hover {
  color: #0052A3 !important;
  text-decoration: underline !important;
}

.login-txt .txt-lighter {
  color: #999999 !important;
}

.login-txt .txt-lighter:hover {
  color: #666666 !important;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .login-box {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    margin: 20px auto !important;
    width: 90% !important;
    max-width: 380px !important;
  }
}
```

---

## 3.4 短信验证弹窗

### 3.4.1 文件路径
- 组件: `frontend/src/components/SmsVerificationModal/SmsVerificationModal.tsx`
- 样式: `frontend/src/components/SmsVerificationModal/SmsVerificationModal.css`

### 3.4.2 组件位置说明
- 类型: 模态弹窗 (Modal)
- 定位: fixed定位，居中显示
- 尺寸: 380px × 321px
- z-index: 19000
- 遮罩层: 半透明黑色背景

### 3.4.3 完整样式代码

```css
/* ========== 遮罩层 ========== */
/* 📸 参考截图: requirements/images/交互状态截图/短信验证-初始状态.png */
.modal-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
  z-index: 18999 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

/* ========== 弹窗容器 ========== */
/* 📸 参考截图: requirements/images/交互状态截图/短信验证-初始状态.png */
.modal-login {
  position: fixed !important;
  top: 35% !important;
  left: 50% !important;
  margin-top: -126px !important;
  margin-left: -190px !important;
  width: 380px !important;
  background-color: #FFFFFF !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2) !important;
  z-index: 19000 !important;
}

/* ========== 弹窗标题 ========== */
.modal-login-tit {
  position: relative !important;
  padding: 20px 20px 15px 20px !important;
  border-bottom: 1px solid #F0F0F0 !important;
  background-color: #FAFAFA !important;
  border-radius: 8px 8px 0 0 !important;
}

.modal-login-tit h2 {
  margin: 0 !important;
  font-size: 18px !important;
  font-weight: 500 !important;
  color: #333333 !important;
}

/* 关闭按钮 */
.modal-login-tit .close {
  position: absolute !important;
  top: 20px !important;
  right: 20px !important;
  width: 24px !important;
  height: 24px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.3s !important;
}

.modal-login-tit .close:hover {
  opacity: 0.7 !important;
}

.modal-login-tit .close .icon-close {
  font-size: 16px !important;
  color: #999999 !important;
}

/* ========== 证件号输入框 ========== */
/* 📸 参考截图: requirements/images/交互状态截图/短信验证-初始状态.png */
.login-code-item {
  padding: 20px !important;
}

#id_card {
  width: 320px !important;
  height: 44px !important;
  line-height: 34px !important;
  padding: 0 12px !important;
  border: 1px solid #DEDEDE !important;
  border-radius: 4px !important;
  font-size: 14px !important;
  color: #333333 !important;
  box-sizing: border-box !important;
  transition: all 0.3s !important;
  outline: none !important;
}

#id_card:focus {
  border-color: #0066CC !important;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1) !important;
}

#id_card::placeholder {
  color: rgba(0, 0, 0, 0.3) !important;
}

/* ========== 验证码区域 ========== */
.verification-code-area {
  margin-top: 20px !important;
  display: flex !important;
  align-items: center !important;
  gap: 20px !important;
}

/* 获取验证码按钮 */
/* 📸 参考截图: requirements/images/交互状态截图/短信验证-初始状态.png (初始状态) */
/* 📸 参考截图: requirements/images/交互状态截图/短信验证-成功-获取验证码成功.png (倒计时状态) */
#verification_code {
  width: 100px !important;
  height: 44px !important;
  line-height: 44px !important;
  text-align: center !important;
  background-color: #0066CC !important;
  color: #FFFFFF !important;
  border: none !important;
  border-radius: 4px !important;
  font-size: 14px !important;
  cursor: pointer !important;
  text-decoration: none !important;
  display: inline-block !important;
  transition: all 0.3s !important;
  outline: none !important;
}

#verification_code:hover {
  background-color: #0052A3 !important;
}

#verification_code:active {
  background-color: #004080 !important;
}

/* 倒计时状态（获取验证码后） */
/* 📸 参考截图: requirements/images/交互状态截图/短信验证-成功-获取验证码成功.png */
/* 
 * 从交互截图中提取的样式信息：
 * - 按钮文字: "重新发送(54)" (数字从60倒数)
 * - 按钮颜色: 灰色 #CCCCCC
 * - 按钮状态: disabled，不可点击
 */
#verification_code.countdown,
#verification_code:disabled {
  background-color: #CCCCCC !important;
  color: #666666 !important;
  cursor: not-allowed !important;
  pointer-events: none !important;
}

/* 验证码输入框 */
#code {
  flex: 1 !important;
  width: 200px !important;
  height: 44px !important;
  line-height: 34px !important;
  padding: 0 12px !important;
  border: 1px solid #DEDEDE !important;
  border-radius: 4px !important;
  font-size: 14px !important;
  color: #333333 !important;
  box-sizing: border-box !important;
  transition: all 0.3s !important;
  outline: none !important;
}

#code:focus {
  border-color: #0066CC !important;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1) !important;
}

#code::placeholder {
  color: rgba(0, 0, 0, 0.3) !important;
}

/* ========== 消息提示区域 ========== */
/* 📸 参考截图: requirements/images/交互状态截图/短信验证-错误-证件号错误.png (错误提示) */
/* 📸 参考截图: requirements/images/交互状态截图/短信验证-成功-获取验证码成功.png (成功提示) */
#message {
  margin-top: 15px !important;
  padding: 10px 12px !important;
  border-radius: 4px !important;
  font-size: 14px !important;
  display: none !important;
}

#message[style*="display: block"],
#message.show {
  display: block !important;
}

/* 错误消息样式 */
/* 📸 参考截图: requirements/images/交互状态截图/短信验证-错误-证件号错误.png */
/* 
 * 从交互截图中提取的样式信息：
 * - 错误提示文字: "请输入正确的用户信息!"
 * - 错误提示颜色: 红色 #FF4D4F
 * - 错误提示边框: 红色 #FFCCC7
 * - 错误提示背景: 浅红色 rgba(255, 77, 79, 0.1)
 */
#message.error {
  color: #FF4D4F !important;
  background-color: #FFF1F0 !important;
  border: 1px solid #FFCCC7 !important;
}

/* 成功消息样式 */
/* 📸 参考截图: requirements/images/交互状态截图/短信验证-成功-获取验证码成功.png */
/* 
 * 从交互截图中提取的样式信息：
 * - 成功提示文字: "获取手机验证码成功！"
 * - 成功提示颜色: 绿色 #52C41A
 * - 成功提示边框: 绿色 #B7EB8F
 * - 成功提示背景: 浅绿色 rgba(82, 196, 26, 0.1)
 */
#message.success {
  color: #52C41A !important;
  background-color: #F6FFED !important;
  border: 1px solid #B7EB8F !important;
}

/* ========== 确定按钮 ========== */
.login-code-item .btn-primary {
  margin-top: 20px !important;
  width: 320px !important;
  height: 44px !important;
  line-height: 44px !important;
  background: linear-gradient(135deg, #FF7200 0%, #FF8A33 100%) !important;
  color: #FFFFFF !important;
  border: none !important;
  border-radius: 4px !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  text-align: center !important;
  text-decoration: none !important;
  cursor: pointer !important;
  transition: all 0.3s !important;
  outline: none !important;
}

.login-code-item .btn-primary:hover {
  background: linear-gradient(135deg, #FF8A33 0%, #FFA050 100%) !important;
  box-shadow: 0 4px 8px rgba(255, 114, 0, 0.3) !important;
}

.login-code-item .btn-primary:active {
  background: linear-gradient(135deg, #E66600 0%, #FF7200 100%) !important;
}

.login-code-item .btn-primary:disabled {
  background: #F5F5F5 !important;
  color: #999999 !important;
  cursor: not-allowed !important;
  box-shadow: none !important;
}
```

### 3.4.4 使用说明

**组件集成：**

```tsx
import React, { useState, useEffect } from 'react';
import './SmsVerificationModal.css';

interface SmsVerificationModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (idCard: string, code: string) => void;
}

const SmsVerificationModal: React.FC<SmsVerificationModalProps> = ({
  visible,
  onClose,
  onSubmit
}) => {
  const [idCard, setIdCard] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 倒计时逻辑
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleGetCode = async () => {
    if (!idCard || idCard.length !== 4) {
      setMessage({ type: 'error', text: '请输入正确的用户信息!' });
      return;
    }

    // 调用获取验证码API
    // const response = await fetchVerificationCode(idCard);
    
    // 模拟成功
    setMessage({ type: 'success', text: '获取手机验证码成功！' });
    setCountdown(60); // 开始60秒倒计时
  };

  if (!visible) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-login" role="complementary" aria-label="请选择登录验证方式框">
        <div className="modal-login-tit">
          <h2>选择验证方式</h2>
          <a href="javascript:;" className="close" onClick={onClose}>
            <i className="icon icon-close" />
          </a>
        </div>
        <div className="login-code-item">
          <div style={{ width: '320px', padding: '20px 0', margin: '0 auto' }}>
            {/* 证件号输入框 */}
            <div>
              <input
                type="text"
                id="id_card"
                placeholder="请输入登录账号绑定的证件号后4位"
                maxLength={4}
                value={idCard}
                onChange={(e) => setIdCard(e.target.value)}
              />
            </div>
            
            {/* 验证码区域 */}
            <div className="verification-code-area">
              <a
                href="javascript:;"
                id="verification_code"
                onClick={handleGetCode}
                className={countdown > 0 ? 'countdown' : ''}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `重新发送(${countdown})` : '获取验证码'}
              </a>
              <input
                type="text"
                id="code"
                placeholder="输入验证码"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            
            {/* 消息提示 */}
            {message.text && (
              <div id="message" className={`show ${message.type}`}>
                <p>{message.text}</p>
              </div>
            )}
            
            {/* 确定按钮 */}
            <div style={{ marginTop: '20px' }}>
              <a
                href="javascript:;"
                className="btn btn-primary"
                onClick={() => onSubmit(idCard, code)}
              >
                确定
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmsVerificationModal;
```

### 3.4.5 验证清单

- [ ] 弹窗居中显示，z-index为19000
- [ ] 遮罩层半透明黑色背景
- [ ] 证件号输入框限制4位
- [ ] "获取验证码"按钮点击后显示成功提示
- [ ] 成功后按钮变为"重新发送(60)"并开始倒计时
- [ ] 倒计时期间按钮为灰色不可点击
- [ ] 验证码输入框限制6位
- [ ] 错误提示为红色，成功提示为绿色
- [ ] 关闭按钮可正常关闭弹窗

---

## 4. 底部导航

### 4.1 文件路径
- 组件: `frontend/src/components/Footer/Footer.tsx`
- 样式: `frontend/src/components/Footer/Footer.css`

### 4.2 组件位置说明
- 位置: 页面底部，横向占满整个宽度
- 尺寸: 100% × ~274px
- 背景: 上半部分白色，下半部分深灰色(#4A4A4A)
- 布局: Flexbox (友情链接 + 二维码)

### 4.3 完整样式代码

```css
/* ========== 底部容器 ========== */
.footer {
  width: 100% !important;
  background-color: #FFFFFF !important;
  border-top: 1px solid #EEEEEE !important;
}

.footer-con {
  max-width: 1200px !important;
  margin: 0 auto !important;
  padding: 40px 20px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
}

/* ========== 友情链接 ========== */
.foot-links {
  flex-shrink: 0 !important;
  margin-right: 60px !important;
}

.foot-con-tit {
  font-size: 14px !important;
  color: #333333 !important;
  font-weight: 500 !important;
  margin: 0 0 20px 0 !important;
}

.foot-links-list {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 20px !important;
}

.foot-links-list li {
  width: 200px !important;
  height: 34px !important;
}

.foot-links-list li a {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
}

.foot-links-list li img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  transition: transform 0.3s !important;
}

.foot-links-list li a:hover img {
  transform: scale(1.05) !important;
}

/* ========== 二维码区域 ========== */
.foot-code {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
  display: flex !important;
  gap: 40px !important;
}

.foot-code li {
  text-align: center !important;
}

.code-pic {
  margin-top: 10px !important;
  position: relative !important;
}

.code-pic img {
  width: 80px !important;
  height: 80px !important;
  display: block !important;
  border: 1px solid #EEEEEE !important;
  border-radius: 4px !important;
}

.code-tips {
  position: absolute !important;
  top: 90px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 200px !important;
  padding: 10px !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: #FFFFFF !important;
  font-size: 12px !important;
  line-height: 1.5 !important;
  border-radius: 4px !important;
  opacity: 0 !important;
  visibility: hidden !important;
  transition: all 0.3s !important;
  z-index: 100 !important;
}

.code-pic:hover .code-tips {
  opacity: 1 !important;
  visibility: visible !important;
  top: 95px !important;
}

/* ========== 版权信息 ========== */
.footer-txt {
  background-color: #4A4A4A !important;
  padding: 20px 0 !important;
  text-align: center !important;
}

.footer-txt p {
  margin: 5px 0 !important;
  font-size: 12px !important;
  color: #C1C1C1 !important;
  line-height: 1.8 !important;
}

.footer-txt span {
  margin: 0 8px !important;
}

.footer-txt a {
  color: #C1C1C1 !important;
  text-decoration: none !important;
  transition: color 0.3s !important;
}

.footer-txt a:hover {
  color: #FFFFFF !important;
}

.footer-txt img {
  vertical-align: middle !important;
  margin-right: 4px !important;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .footer-con {
    flex-direction: column !important;
    padding: 30px 20px !important;
  }
  
  .foot-links {
    margin-right: 0 !important;
    margin-bottom: 30px !important;
  }
  
  .foot-code {
    flex-wrap: wrap !important;
    gap: 20px !important;
    justify-content: center !important;
  }
  
  .foot-code li {
    width: 100px !important;
  }
}
```

---

## 5. 使用说明

### 5.1 在 React 组件中使用

```tsx
import './Header.css';

export const Header = () => {
  return (
    <div className="header">
      <div className="wrapper">
        <div className="header-con">
          <h1 className="logo">
            <a href="/">中国铁路12306</a>
          </h1>
          <div className="header-welcome">欢迎登录12306</div>
        </div>
      </div>
    </div>
  );
};
```

### 5.2 图片资源引用

所有图片资源已下载至 `requirements/images/` 目录，在实际项目中需要：

1. 将图片复制到 `public/images/` 或 `src/assets/images/` 目录
2. 在 CSS 中使用相对路径或绝对路径引用
3. 或使用 webpack/vite 的 import 语法引入

### 5.3 验证清单

- [ ] 所有颜色使用 CSS 变量定义
- [ ] 所有尺寸单位为 px (使用 !important 确保优先级)
- [ ] 所有交互状态 (hover, focus, active, disabled) 都有定义
- [ ] 所有图片资源路径正确
- [ ] 响应式断点设置合理 (768px)
- [ ] 所有 transition 动画流畅 (0.3s)
- [ ] 所有文字内容与需求文档一致

---

## 6. 注意事项

1. **颜色值来源**: 颜色值基于浏览器开发者工具提取，建议在实际开发中使用浏览器取色器验证精确值
2. **!important 使用**: 所有样式使用 !important 确保优先级，实际项目中可根据需要调整
3. **图标实现**: 示例中的图标使用占位符，实际项目中建议使用 SVG 图标或图标字体库
4. **浏览器兼容**: 样式代码兼容现代浏览器，如需支持 IE11 等旧浏览器需要额外处理
5. **无障碍**: 保留原页面的 ARIA 属性和语义化标签，确保可访问性

---

生成时间: 2025-12-28  
数据来源: 浏览器自动化分析 + DOM 结构提取  
目标页面: https://kyfw.12306.cn/otn/resources/login.html

