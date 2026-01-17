/**
 * @component UI-ORDER-SUBMIT
 * @description 提交订单区域，包含同意条款提示和提交/返回按钮
 * @page order-fill
 * 
 * ============ 功能实现清单（必填）============
 * @scenarios_covered: 无独立scenarios（UI展示组件）
 * 
 * @features_implemented:
 * ✅ 显示"提交订单"按钮（醒目的橙色）
 * ✅ 显示"上一步"按钮（白色边框）
 * ✅ 显示同意条款提示文字和链接
 * ✅ 按钮点击后显示加载状态
 * ✅ 提供点击事件回调
 * 
 * @implementation_status:
 * - Features Coverage: 5/5 (100%)
 * - UI Visual: 像素级精确
 * ================================================
 * 
 * @layout_position "乘客信息区域下方"
 * @dimensions "1100px × 75px"
 * @resources {
 *   images: []
 * }
 */

import React from 'react';
import './SubmitSection.css';

interface SubmitSectionProps {
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

/**
 * 提交订单区域组件
 */
const SubmitSection: React.FC<SubmitSectionProps> = ({
  onSubmit,
  onBack,
  isSubmitting = false
}) => {
  // ========== UI Render ==========
  return (
    <div className="order-submit-section">
      {/* 同意条款提示 */}
      <div className="submit-notice">
        <p className="notice-text">
          *提交订单表示已阅读并同意
          <a href="#">《国铁集团铁路旅客运输规程》</a>
          <a href="#">《服务条款》</a>
        </p>
      </div>
      
      {/* 按钮区 */}
      <div className="submit-buttons">
        <button 
          className="order-back-button"
          onClick={onBack}
          disabled={isSubmitting}
        >
          上一步
        </button>
        <button 
          className="order-submit-button"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? '提交中...' : '提交订单'}
        </button>
      </div>
    </div>
  );
};

export default SubmitSection;
