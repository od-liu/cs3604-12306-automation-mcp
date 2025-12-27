/**
 * @component UI-LOGIN-PAGE
 * @description 登录页面主容器，采用上中下三段式布局
 * @children_slots REQ-TOP-NAV, REQ-LOGIN-FORM, REQ-BOTTOM-NAV, REQ-SMS-VERIFICATION
 * 
 * ============ 功能实现清单 ============
 * @scenarios_covered: N/A (容器组件，无业务场景)
 * 
 * @features_implemented:
 *   ✅ 提供上中下三段式布局（TopNavigation + MainContent + BottomNavigation）
 *   ✅ 中间内容区域加载背景图片
 *   ✅ 为子组件预留插槽位置
 *   ✅ 响应式全屏布局（min-height: 100vh）
 * 
 * @implementation_status:
 *   - Scenarios Coverage: N/A (容器组件)
 *   - Features Coverage: 4/4 (100%)
 *   - UI Visual: 像素级精确（按照 ui-style-guide.md）
 * ================================================
 */

import React, { useState } from 'react';
import './LoginPage.css';
import TopNavigation from '../components/TopNavigation';
import BottomNavigation from '../components/BottomNavigation';
import LoginForm from '../components/LoginForm';
import SmsVerificationModal from '../components/SmsVerificationModal';

const LoginPage: React.FC = () => {
  // ========== State Management ==========
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [userId, setUserId] = useState<number>(0);

  // ========== Event Handlers ==========
  const handleLoginSuccess = (data: any) => {
    setUserId(data.userId);
    setShowSmsModal(true);
  };

  const handleVerifySuccess = () => {
    // 验证成功，跳转到个人中心（预留功能）
    console.log('Verification successful, redirect to user center');
    setShowSmsModal(false);
  };

  // ========== UI Render ==========
  return (
    <div className="login-page-container">
      {/* 顶部导航 - 第一个子元素 */}
      <TopNavigation />

      {/* 主内容区域 - 第二个子元素，flex: 1 */}
      <div className="main-content-area">
        {/* 左侧推广区域 - 预留给未来的推广内容 */}
        <div className="left-promotion">
          {/* 推广内容占位 */}
        </div>

        {/* 右侧登录表单容器 */}
        <div className="right-form-container">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>

      {/* 底部导航 - 第三个子元素 */}
      <BottomNavigation />

      {/* 短信验证弹窗 - 条件渲染 */}
      {showSmsModal && (
        <SmsVerificationModal
          userId={userId}
          onClose={() => setShowSmsModal(false)}
          onVerifySuccess={handleVerifySuccess}
        />
      )}
    </div>
  );
};

export default LoginPage;
