/**
 * @component UI-LOGIN-PAGE
 * @description 登录页面主容器，整合顶部导航、登录表单、底部导航和短信验证弹窗
 * @layout_position "全屏页面，三段式布局（Header + Main + Footer）"
 * @dimensions "100% × 954px"
 * @background_images ["/images/登录页面-主内容区-背景图1.jpg", "/images/登录页面-主内容区-背景图2.jpg"]
 * 
 * ============ 功能实现清单 ============
 * @scenarios_covered: 
 *   无直接scenarios（根节点，负责整合子组件）
 * 
 * @features_implemented:
 *   ✅ 三段式布局（顶部导航 + 主内容区 + 底部导航）
 *   ✅ 主内容区背景轮播（2张图片交替显示）
 *   ✅ 短信验证弹窗状态管理
 * 
 * @implementation_status:
 *   - Scenarios Coverage: N/A (根节点)
 *   - Features Coverage: 3/3 (100%)
 *   - UI Visual: 像素级精确
 * ================================================
 * 
 * @children_slots:
 *   - REQ-TOP-NAV: 顶部导航组件
 *   - REQ-LOGIN-FORM: 登录表单组件
 *   - REQ-BOTTOM-NAV: 底部导航组件
 *   - REQ-SMS-VERIFICATION: 短信验证弹窗组件
 */

import React, { useState, useEffect } from 'react';
import TopNavigation from '../components/TopNavigation';
import LoginForm from '../components/LoginForm';
import BottomNavigation from '../components/BottomNavigation';
import SmsVerification from '../components/SmsVerification';
import './LoginPage.css';

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  // ========== State Management ==========
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [loginData, setLoginData] = useState<{username: string} | null>(null);

  // ========== Feature: 背景图片轮播 ==========
  /**
   * @feature "主内容区背景轮播（2张图片交替显示）"
   * 每5秒切换一次背景图片
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ========== Event Handlers ==========
  
  /**
   * 处理登录成功事件
   * 当登录表单验证通过后，显示短信验证弹窗
   */
  const handleLoginSuccess = (data: {username: string}) => {
    setLoginData(data);
    setShowSmsModal(true);
  };

  /**
   * 处理短信验证成功事件
   * 验证通过后跳转到个人中心页面
   */
  const handleSmsVerificationSuccess = () => {
    setShowSmsModal(false);
    // TODO: 在实际实现时，这里应该跳转到个人中心页面
    console.log('验证成功，跳转到个人中心页面');
    alert('登录成功！');
  };

  /**
   * 关闭短信验证弹窗
   */
  const handleCloseSmsModal = () => {
    setShowSmsModal(false);
  };

  // ========== Background Images ==========
  const backgroundImages = [
    '/images/登录页面-主内容区-背景图1.jpg',
    '/images/登录页面-主内容区-背景图2.jpg'
  ];

  // ========== UI Render ==========
  return (
    <div className="page-login">
      <div className="toolbar_Div">
        {/* 顶部导航 - REQ-TOP-NAV */}
        <TopNavigation />

        {/* 主内容区域 - 包含背景轮播和登录表单 */}
        <div 
          className="login-panel"
          style={{
            backgroundImage: `url('${backgroundImages[currentBgIndex]}')`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* 登录表单 - REQ-LOGIN-FORM */}
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>

        {/* 底部导航 - REQ-BOTTOM-NAV */}
        <BottomNavigation />
      </div>

      {/* 短信验证弹窗 - REQ-SMS-VERIFICATION */}
      {showSmsModal && loginData && (
        <SmsVerification
          username={loginData.username}
          onSuccess={handleSmsVerificationSuccess}
          onClose={handleCloseSmsModal}
        />
      )}
    </div>
  );
};

export default LoginPage;

