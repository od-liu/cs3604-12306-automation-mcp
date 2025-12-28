/**
 * @component UI-TOP-NAV
 * @description 页面顶部导航栏，包含品牌Logo和欢迎文字
 * @layout_position "页面最上方，横向占据整个页面宽度"
 * @dimensions "100% × 80px"
 * @background_images ["/images/登录页面-顶部导航-12306Logo.png"]
 * 
 * ============ 功能实现清单 ============
 * @scenarios_covered: 
 *   无scenarios（纯展示组件）
 * 
 * @features_implemented:
 *   ✅ Logo区域（左侧）- 12306品牌Logo + 文字
 *   ✅ 欢迎文字（右侧）- "欢迎登录12306"
 *   ✅ Logo可点击跳转到首页
 * 
 * @implementation_status:
 *   - Scenarios Coverage: N/A (纯展示组件)
 *   - Features Coverage: 3/3 (100%)
 *   - UI Visual: 像素级精确
 * ================================================
 */

import React from 'react';
import './TopNavigation.css';

interface TopNavigationProps {
  onLogoClick?: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ onLogoClick }) => {
  // ========== Event Handlers ==========
  
  /**
   * @feature "Logo可点击跳转到首页"
   * 点击Logo区域跳转到首页
   */
  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      // 默认行为：跳转到首页
      console.log('跳转到首页');
      window.location.href = '/';
    }
  };

  // ========== UI Render ==========
  return (
    <header className="top-navigation-header" role="banner">
      {/* Logo区域 (左侧) - @feature "Logo区域" */}
      <a 
        href="/" 
        className="top-navigation-logo-area" 
        onClick={(e) => { e.preventDefault(); handleLogoClick(); }}
        data-testid="logo-link"
        role="link"
      >
        <div className="top-navigation-logo" title="中国铁路12306" data-testid="logo">
          <img src="/images/登录页面-顶部导航-12306Logo.png" alt="12306 Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div className="top-navigation-logo-info">
          <div className="top-navigation-logo-text">中国铁路12306</div>
          <div className="top-navigation-logo-subtitle">12306 CHINA RAILWAY</div>
        </div>
      </a>

      {/* 欢迎文字 (右侧) - @feature "欢迎文字" */}
      <div className="top-navigation-welcome-text">欢迎登录12306</div>
    </header>
  );
};

export default TopNavigation;

