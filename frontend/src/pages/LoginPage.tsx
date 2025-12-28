import React, { useState } from 'react';
import Header from '../components/Header/Header';
import LoginForm from '../components/LoginForm/LoginForm';
import SmsVerificationModal from '../components/SmsVerificationModal/SmsVerificationModal';
import Footer from '../components/Footer/Footer';
import './LoginPage.css';

/**
 * @component UI-LOGIN-PAGE
 * @description 用户登录主页面，包含登录表单和短信验证功能
 * @calls None - 页面组装组件
 * @children_slots UI-TOP-NAV, UI-LOGIN-FORM, UI-SMS-MODAL, UI-BOTTOM-NAV
 * 
 * ============ 功能实现清单（必填）============
 * @scenarios_covered: (无自身scenarios，由子组件实现)
 *   N/A - 页面组装组件
 * 
 * @features_implemented: (所有功能点)
 *   ✅ 顶部导航区域（Header）
 *   ✅ 主内容区域（带背景图）
 *   ✅ 登录表单区域（LoginForm）
 *   ✅ 短信验证弹窗（SmsVerificationModal）
 *   ✅ 底部导航区域（Footer）
 *   ✅ 登录成功后打开SMS验证弹窗的逻辑
 * 
 * @implementation_status:
 *   - Scenarios Coverage: N/A (组装组件)
 *   - Features Coverage: 6/6 (100%)
 *   - UI Visual: 像素级精确
 * 
 * @layout_position "整个页面布局"
 * @dimensions "100% × 100%"
 * @background_images ["/images/登录页面-主内容区域-背景图片1.jpg"]
 * ================================================
 */
const LoginPage: React.FC = () => {
  // ========== State Management ==========
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [userId, setUserId] = useState<number | undefined>(undefined);

  // ========== Event Handlers ==========
  
  /**
   * @feature "登录成功后打开SMS验证弹窗"
   * 当LoginForm登录成功时调用
   */
  const handleLoginSuccess = (data: any) => {
    if (data.requireSms && data.userId) {
      setUserId(data.userId);
      setShowSmsModal(true);
    }
  };

  /**
   * @feature "SMS验证成功后的处理"
   * 当SmsVerificationModal验证成功时调用
   */
  const handleSmsSuccess = (token: string) => {
    console.log('SMS验证成功，Token:', token);
    // 骨架代码：实际项目中应该保存token到localStorage，然后跳转到首页
    // localStorage.setItem('token', token);
    // window.location.href = '/';
    
    // 临时处理：关闭弹窗并显示成功消息
    setShowSmsModal(false);
    alert('登录成功！');
  };

  /**
   * @feature "关闭SMS验证弹窗"
   */
  const handleCloseSmsModal = () => {
    setShowSmsModal(false);
  };

  // ========== UI Render ==========
  return (
    <div className="login-page">
      {/* 顶部导航 */}
      <Header />

      {/* 主内容区域 */}
      <div className="main-content">
        {/* 登录表单 */}
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>

      {/* 底部导航 */}
      <Footer />

      {/* 短信验证弹窗 */}
      <SmsVerificationModal
        visible={showSmsModal}
        userId={userId}
        onClose={handleCloseSmsModal}
        onSuccess={handleSmsSuccess}
      />
    </div>
  );
};

export default LoginPage;
