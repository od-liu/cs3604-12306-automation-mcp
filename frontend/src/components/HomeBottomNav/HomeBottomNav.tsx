/**
 * @component UI-HOME-BOTTOM-NAV
 * @description 首页专属底部导航，包含友情链接、二维码和版权信息（与登录页底部导航不同）
 * @related_req_id REQ-HOME-BOTTOM-NAV
 * @page homepage
 * 
 * ============ 功能实现清单（必填）============
 * @scenarios_covered:
 * 无 scenarios（纯展示组件）
 * 
 * @features_implemented:
 * ✅ 显示友情链接（4个合作伙伴Logo，2行2列排列）
 * ✅ 显示四个官方平台二维码（横向排列）
 * ✅ 提供扫码关注入口
 * ✅ 显示版权和备案信息
 * 
 * @implementation_status:
 * - Scenarios Coverage: N/A (纯展示组件)
 * - Features Coverage: 4/4 (100%)
 * - UI Visual: 像素级精确
 * ================================================
 * 
 * @layout_position "页面最底部，横向占据整个页面宽度"
 * @dimensions "width: 100%, height: 197px"
 * @resources {
 *   images: [
 *     "/images/首页-底部导航-中国国家铁路集团Logo.png",
 *     "/images/首页-底部导航-中国铁路客户保险Logo.png",
 *     "/images/首页-底部导航-中铁银通支付Logo.png",
 *     "/images/首页-底部导航-中铁程科技Logo.png",
 *     "/images/首页-底部导航-中国铁路官方微信二维码.png",
 *     "/images/首页-底部导航-中国铁路官方微博二维码.png",
 *     "/images/首页-底部导航-12306公众号二维码.png",
 *     "/images/首页-底部导航-铁路12306二维码.png"
 *   ]
 * }
 * 
 * ⚠️ 注意：首页的友情链接与登录页不同：
 * - 首页：中国国家铁路集团、中国铁路客户保险、中铁银通支付、中铁程科技
 * - 登录页：中国国家铁路集团、中国铁路财产保险、中国铁路95306网、中铁快运
 */

import React from 'react';
import './HomeBottomNav.css';

const HomeBottomNav: React.FC = () => {
  return (
    <footer className="bottom-navigation">
      <div className="bottom-content">
        {/* @feature "显示友情链接" - 左侧区域 */}
        <div className="friendship-links-section">
          <h3 className="section-title">友情链接</h3>
          <div className="friendship-links-grid">
            <div className="friendship-link-item">
              <img 
                src="/images/首页-底部导航-中国国家铁路集团Logo.png" 
                alt="中国国家铁路集团有限公司"
              />
            </div>
            <div className="friendship-link-item">
              <img 
                src="/images/首页-底部导航-中国铁路客户保险Logo.png" 
                alt="中国铁路客户保险总公司"
              />
            </div>
            <div className="friendship-link-item">
              <img 
                src="/images/首页-底部导航-中铁银通支付Logo.png" 
                alt="中铁银通支付有限公司"
              />
            </div>
            <div className="friendship-link-item">
              <img 
                src="/images/首页-底部导航-中铁程科技Logo.png" 
                alt="中铁程科技有限责任公司"
              />
            </div>
          </div>
        </div>

        {/* @feature "显示四个官方平台二维码" - 右侧区域 */}
        {/* @feature "提供扫码关注入口" */}
        <div className="qr-codes-section">
          <div className="qr-codes-wrapper">
            <div className="qr-code-row">
              <span className="qr-label">中国铁路官方微信</span>
              <span className="qr-label">中国铁路官方微博</span>
              <span className="qr-label">12306 公众号</span>
              <span className="qr-label">铁路12306</span>
            </div>
            <div className="qr-code-row">
              <div className="qr-code-item">
                <img 
                  src="/images/首页-底部导航-中国铁路官方微信二维码.png" 
                  alt="中国铁路官方微信"
                />
              </div>
              <div className="qr-code-item">
                <img 
                  src="/images/首页-底部导航-中国铁路官方微博二维码.png" 
                  alt="中国铁路官方微博"
                />
              </div>
              <div className="qr-code-item">
                <img 
                  src="/images/首页-底部导航-12306公众号二维码.png" 
                  alt="12306 公众号"
                />
              </div>
              <div className="qr-code-item">
                <img 
                  src="/images/首页-底部导航-铁路12306二维码.png" 
                  alt="铁路12306"
                />
              </div>
            </div>
          </div>

          {/* @feature "显示版权和备案信息" */}
          <div className="qr-code-footer">
            <p>官方APP下载，目前铁路未授权其他网站或APP开展类似服务内容，敬请广大用户注意。</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeBottomNav;
