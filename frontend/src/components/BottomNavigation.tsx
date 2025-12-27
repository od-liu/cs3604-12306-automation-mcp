/**
 * @component UI-BOTTOM-NAV
 * @description 页面底部导航，包含友情链接和二维码展示区域
 * 
 * ============ 功能实现清单 ============
 * @scenarios_covered: N/A (纯展示组件，无业务场景)
 * 
 * @features_implemented:
 *   ✅ 显示友情链接图片
 *   ✅ 显示4个二维码（中国铁路官方微信、微博、12306公众号、铁路12306）
 *   ✅ 显示免责声明文字
 *   ✅ 友情链接和二维码区域垂直布局
 * 
 * @implementation_status:
 *   - Scenarios Coverage: N/A (展示组件)
 *   - Features Coverage: 4/4 (100%)
 *   - UI Visual: 像素级精确（按照 ui-style-guide.md 第5节）
 * 
 * @layout_position "页面最底部，作为 login-page-container 的第三个子元素"
 * @dimensions "宽度100%，高度约180px（内容自适应）"
 * @background_images [
 *   "/images/友情链接.png",
 *   "/images/中国铁路官方微信二维码.png",
 *   "/images/中国铁路官方微博二维码.png",
 *   "/images/12306公众号二维码.png",
 *   "/images/铁路12306二维码.png"
 * ]
 * ================================================
 */

import React from 'react';
import './BottomNavigation.css';

const BottomNavigation: React.FC = () => {
  // ========== UI Render ==========
  return (
    <div className="bottom-navigation">
      {/* 友情链接区域 - 上半部分 */}
      <div className="bottom-navigation-partner-links-section">
        {/* @feature "显示友情链接图片" */}
        <h3 className="bottom-navigation-partner-links-title">友情链接</h3>
        <img 
          src="/images/友情链接.png" 
          alt="友情链接" 
          className="bottom-navigation-partner-links-image"
        />
      </div>

      {/* 二维码区域 - 下半部分 */}
      <div className="bottom-navigation-qrcode-section">
        {/* 二维码组 */}
        <div className="bottom-navigation-qrcode-groups">
          {/* @feature "显示4个二维码 - 中国铁路官方微信" */}
          <div className="bottom-navigation-qrcode-group">
            <h4 className="bottom-navigation-qrcode-title">中国铁路官方微信</h4>
            <img 
              src="/images/中国铁路官方微信二维码.png" 
              alt="中国铁路官方微信二维码" 
              className="bottom-navigation-qrcode-image"
            />
          </div>

          {/* @feature "显示4个二维码 - 中国铁路官方微博" */}
          <div className="bottom-navigation-qrcode-group">
            <h4 className="bottom-navigation-qrcode-title">中国铁路官方微博</h4>
            <img 
              src="/images/中国铁路官方微博二维码.png" 
              alt="中国铁路官方微博二维码" 
              className="bottom-navigation-qrcode-image"
            />
          </div>

          {/* @feature "显示4个二维码 - 12306公众号" */}
          <div className="bottom-navigation-qrcode-group">
            <h4 className="bottom-navigation-qrcode-title">12306 公众号</h4>
            <img 
              src="/images/12306公众号二维码.png" 
              alt="12306公众号二维码" 
              className="bottom-navigation-qrcode-image"
            />
          </div>

          {/* @feature "显示4个二维码 - 铁路12306" */}
          <div className="bottom-navigation-qrcode-group">
            <h4 className="bottom-navigation-qrcode-title">铁路12306</h4>
            <img 
              src="/images/铁路12306二维码.png" 
              alt="铁路12306二维码" 
              className="bottom-navigation-qrcode-image"
            />
          </div>
        </div>

        {/* @feature "显示免责声明文字" */}
        <p className="bottom-navigation-disclaimer-text">
          官方APP下载，目前铁路未授权其他网站或APP开展类似服务内容，敬请广大用户注意。
        </p>
      </div>
    </div>
  );
};

export default BottomNavigation;
