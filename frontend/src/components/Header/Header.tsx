import React from 'react';
import './Header.css';

/**
 * @component UI-TOP-NAV
 * @description 页面顶部导航栏，包含品牌Logo和欢迎文字
 * @calls None - 纯静态组件
 * @children_slots None
 * 
 * ============ 功能实现清单（必填）============
 * @scenarios_covered: (无scenarios，纯静态展示组件)
 *   N/A - 纯静态组件
 * 
 * @features_implemented: (所有功能点)
 *   ✅ 显示中国铁路12306 Logo（通过CSS背景图实现）
 *   ✅ 显示欢迎文字"欢迎登录12306"
 *   ✅ Logo链接到首页
 * 
 * @implementation_status:
 *   - Scenarios Coverage: N/A (静态组件)
 *   - Features Coverage: 3/3 (100%)
 *   - UI Visual: 像素级精确（基于ui-style-guide.md）
 * 
 * @layout_position "页面顶部，横向占满整个宽度"
 * @dimensions "100% × 80px"
 * @background_images ["/images/登录页面-顶部导航-Logo.png"]
 * ================================================
 */
const Header: React.FC = () => {
  return (
    <div className="header" role="complementary" aria-label="头部">
      <div className="wrapper">
        <div className="header-con">
          {/* Logo 区域 - 使用CSS背景图实现 */}
          <h1 className="logo" role="banner">
            <a href="https://www.12306.cn/index/index.html">
              中国铁路12306
            </a>
          </h1>
          
          {/* 欢迎文字 */}
          <div className="header-welcome">欢迎登录12306</div>
        </div>
      </div>
    </div>
  );
};

export default Header;

