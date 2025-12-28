/**
 * @component UI-BOTTOM-NAV
 * @description 页面底部的友情链接和二维码展示区域
 * @layout_position "页面最底部，横向占据整个页面宽度"
 * @dimensions "100% × 274px"
 * @background_images [
 *   "/images/登录页面-底部导航-中国国家铁路集团logo.png",
 *   "/images/登录页面-底部导航-中国铁路财产保险logo.png",
 *   "/images/登录页面-底部导航-中国铁路95306网logo.png",
 *   "/images/登录页面-底部导航-中铁快运logo.png",
 *   "/images/登录页面-底部导航-中国铁路官方微信二维码.png",
 *   "/images/登录页面-底部导航-中国铁路官方微博二维码.png",
 *   "/images/登录页面-底部导航-12306公众号二维码.png",
 *   "/images/登录页面-底部导航-铁路12306二维码.png"
 * ]
 * 
 * ============ 功能实现清单 ============
 * @scenarios_covered: 
 *   无scenarios（纯展示组件）
 * 
 * @features_implemented:
 *   ✅ 友情链接区域（左侧）- 4个合作伙伴Logo，2行2列Grid布局
 *   ✅ 二维码区域（右侧）- 4个官方平台二维码，横向Flex布局
 *   ✅ 版权信息区域（底部）- 版权声明和备案信息
 * 
 * @implementation_status:
 *   - Scenarios Coverage: N/A (纯展示组件)
 *   - Features Coverage: 3/3 (100%)
 *   - UI Visual: 像素级精确
 * ================================================
 */

import React from 'react';
import './BottomNavigation.css';

interface BottomNavigationProps {}

const BottomNavigation: React.FC<BottomNavigationProps> = () => {
  // ========== 友情链接数据 ==========
  const partnerLogos = [
    {
      name: '中国国家铁路集团',
      src: '/images/登录页面-底部导航-中国国家铁路集团logo.png',
      alt: '中国国家铁路集团'
    },
    {
      name: '中国铁路财产保险',
      src: '/images/登录页面-底部导航-中国铁路财产保险logo.png',
      alt: '中国铁路财产保险'
    },
    {
      name: '中国铁路95306网',
      src: '/images/登录页面-底部导航-中国铁路95306网logo.png',
      alt: '中国铁路95306网'
    },
    {
      name: '中铁快运',
      src: '/images/登录页面-底部导航-中铁快运logo.png',
      alt: '中铁快运'
    }
  ];

  // ========== 二维码数据 ==========
  const qrCodes = [
    {
      title: '中国铁路官方微信',
      src: '/images/登录页面-底部导航-中国铁路官方微信二维码.png',
      alt: '中国铁路官方微信二维码'
    },
    {
      title: '中国铁路官方微博',
      src: '/images/登录页面-底部导航-中国铁路官方微博二维码.png',
      alt: '中国铁路官方微博二维码'
    },
    {
      title: '12306公众号',
      src: '/images/登录页面-底部导航-12306公众号二维码.png',
      alt: '12306公众号二维码'
    },
    {
      title: '铁路12306',
      src: '/images/登录页面-底部导航-铁路12306二维码.png',
      alt: '铁路12306二维码',
      description: '扫码下载客户端'
    }
  ];

  // ========== UI Render ==========
  return (
    <footer className="bottom-navigation-footer" role="contentinfo">
      <div className="bottom-navigation-content">
        {/* @feature "友情链接区域（左侧）" */}
        <div className="bottom-navigation-partner-section">
          <h2>友情链接</h2>
          <div className="bottom-navigation-partner-logos">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="bottom-navigation-partner-logo-item">
                <img
                  src={partner.src}
                  alt={partner.alt}
                  style={{
                    width: '200px',
                    height: '34px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* @feature "二维码区域（右侧）" */}
        <div className="bottom-navigation-qrcode-section">
          {qrCodes.map((qr, index) => (
            <div key={index} className="bottom-navigation-qrcode-item">
              <h3>{qr.title}</h3>
              <img
                src={qr.src}
                alt={qr.alt}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'contain'
                }}
              />
              {qr.description && (
                <p className="bottom-navigation-qr-description">{qr.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* @feature "版权信息区域（底部）" */}
      <div className="bottom-navigation-copyright-section">
        <p className="bottom-navigation-copyright-text">
          版权所有©2008-2025 中国铁道科学研究院集团有限公司 技术支持：铁旅科技有限公司
        </p>
        <p className="bottom-navigation-icp-text">
          京公网安备 11010802038392号 | 京ICP备05020493号-4 | ICP证：京B2-20202537
        </p>
      </div>
    </footer>
  );
};

export default BottomNavigation;

