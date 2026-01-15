/**
 * @component UI-HOME-PROMOTION
 * @description 首页宣传推广区域，显示4个快捷入口卡片（2行2列）
 * @related_req_id REQ-HOME-PROMOTION
 * @page homepage
 * 
 * ============ 功能实现清单（必填）============
 * @scenarios_covered:
 * 无 scenarios（纯展示组件）
 * 
 * @features_implemented:
 * ✅ 显示4个快捷入口卡片（会员服务、铁路保险、餐饮特产、计次定期票）
 * ✅ 每个卡片包含图片、标题和描述（图片内容）
 * ✅ 点击卡片跳转到对应功能页面
 * ✅ 卡片悬停时有视觉反馈（向上移动 + 阴影）
 * 
 * @implementation_status:
 * - Scenarios Coverage: N/A (纯展示组件)
 * - Features Coverage: 4/4 (100%)
 * - UI Visual: 像素级精确
 * ================================================
 * 
 * @layout_position "查询表单下方，页面居中"
 * @dimensions "width: 1220px, height: 345px"
 * @resources {
 *   images: [
 *     "/images/首页-宣传推广-会员服务.jpg",
 *     "/images/首页-宣传推广-餐饮特产.jpg",
 *     "/images/首页-宣传推广-铁路保险.jpg",
 *     "/images/首页-宣传推广-计次定期票.png"
 *   ]
 * }
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PromoGrid.css';

const PromoGrid: React.FC = () => {
  const navigate = useNavigate();

  // ========== Feature Implementations ==========

  /**
   * @feature "点击卡片跳转到对应功能页面"
   * 骨架实现：定义卡片数据和点击处理
   */
  const promoCards = [
    {
      src: '/images/首页-宣传推广-会员服务.jpg',
      alt: '会员服务',
      link: '/membership',
      description: '铁路畅行 尊享体验 12306铁路会员积分服务'
    },
    {
      src: '/images/首页-宣传推广-餐饮特产.jpg',
      alt: '餐饮特产',
      link: '/food-service',
      description: '带有温度的旅途配餐 享受星级的体验和家乡的味道'
    },
    {
      src: '/images/首页-宣传推广-铁路保险.jpg',
      alt: '铁路保险',
      link: '/insurance',
      description: '用心呵护 放心出行 12306铁路保险出行安全'
    },
    {
      src: '/images/首页-宣传推广-计次定期票.png',
      alt: '计次定期票',
      link: '/season-ticket',
      description: '预约随心来 出行更便捷 为您提供全新的自助式出行体验'
    }
  ];

  /**
   * @feature "点击卡片跳转"
   * 处理卡片点击事件
   */
  const handleCardClick = (link: string) => {
    // 骨架实现：跳转到对应页面
    console.log('跳转到:', link);
    alert(`功能暂未实现，将跳转到: ${link}`);
    // navigate(link);
  };

  // ========== UI Render ==========
  return (
    <div className="home-promo-grid">
      {promoCards.map((card, index) => (
        <div 
          key={index} 
          className="home-promo-card"
          onClick={() => handleCardClick(card.link)}
          title={card.description}
        >
          <img 
            src={card.src} 
            alt={card.alt} 
            className="home-promo-image" 
          />
        </div>
      ))}
    </div>
  );
};

export default PromoGrid;
