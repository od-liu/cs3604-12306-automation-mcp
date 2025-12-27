/**
 * @component UI-TOP-NAV
 * @description 页面顶部导航栏，包含品牌Logo和欢迎文字
 * 
 * ============ 功能实现清单 ============
 * @scenarios_covered: N/A (纯展示组件，无业务场景)
 * 
 * @features_implemented:
 *   ✅ 显示品牌Logo图片（高度45px，宽度自适应）
 *   ✅ 显示品牌名称 "中国铁路12306"
 *   ✅ 显示副标题 "12306 CHINA RAILWAY"
 *   ✅ 显示欢迎文字 "欢迎登录12306"（右侧）
 *   ✅ Logo点击跳转首页（预留功能）
 * 
 * @implementation_status:
 *   - Scenarios Coverage: N/A (展示组件)
 *   - Features Coverage: 5/5 (100%)
 *   - UI Visual: 像素级精确（按照 ui-style-guide.md 第3节）
 * 
 * @layout_position "页面最上方，作为 login-page-container 的第一个子元素"
 * @dimensions "宽度100%，高度80px"
 * @background_images []
 * ================================================
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopNavigation.css';

const TopNavigation: React.FC = () => {
  const navigate = useNavigate();
  
  // ========== Event Handlers ==========
  
  /**
   * @feature "Logo点击跳转首页"
   * 点击Logo跳转到首页
   */
  const handleLogoClick = () => {
    navigate('/');
  };

  // ========== UI Render ==========
  return (
    <div className="top-navigation">
      {/* Logo区域 - 左侧 */}
      <div className="top-navigation-logo-section">
        {/* @feature "显示品牌Logo图片" */}
        <img 
          src="/images/登录页-顶部导航区域-中国铁路Logo.png" 
          alt="中国铁路Logo"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        />
        
        {/* Logo文字信息 */}
        <div className="top-navigation-logo">
          {/* @feature "显示品牌名称" */}
          <div className="top-navigation-logo-title">中国铁路12306</div>
          {/* @feature "显示副标题" */}
          <div className="top-navigation-logo-subtitle">12306 CHINA RAILWAY</div>
        </div>
      </div>

      {/* 欢迎文字 - 右侧 */}
      {/* @feature "显示欢迎文字" */}
      <div className="top-navigation-welcome">欢迎登录12306</div>
    </div>
  );
};

export default TopNavigation;
