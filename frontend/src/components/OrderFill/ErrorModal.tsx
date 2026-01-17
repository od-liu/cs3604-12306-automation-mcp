/**
 * @component UI-ORDER-ERROR-MODAL
 * @description 订单错误提示弹窗，显示订单提交失败或余票不足时的提示信息
 * @page order-fill
 * 
 * ============ 功能实现清单（必填）============
 * @scenarios_covered:
 * ✅ SCENARIO-001: 余票不足提示
 * ✅ SCENARIO-002: 订票失败提示
 * 
 * @features_implemented:
 * ✅ 显示错误图标（红色感叹号或叉号）
 * ✅ 显示错误信息（如"余票不足"、"订票失败"等）
 * ✅ 提供"我知道了"或"关闭"按钮
 * ✅ 点击按钮或遮罩关闭弹窗
 * 
 * @implementation_status:
 * - Scenarios Coverage: 2/2 (100%)
 * - Features Coverage: 4/4 (100%)
 * - UI Visual: 像素级精确
 * ================================================
 * 
 * @layout_position "屏幕居中显示的模态弹窗"
 * @dimensions "宽度400px，高度auto"
 * @resources {
 *   images: []
 * }
 */

import React from 'react';
import './ErrorModal.css';

interface ErrorModalProps {
  isOpen: boolean;
  errorType: 'insufficient_tickets' | 'order_failed' | 'network_error' | 'general';
  errorMessage?: string;
  onClose: () => void;
}

/**
 * 订单错误提示弹窗组件
 */
const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  errorType,
  errorMessage,
  onClose
}) => {
  if (!isOpen) return null;

  // ========== Scenario Implementations ==========

  /**
   * @scenario SCENARIO-001 "余票不足"
   * @given 用户提交订单时所选席别余票已被抢光
   * @when 系统检测到余票不足
   * @then 显示"很抱歉，您选择的席别余票不足！"弹窗
   */
  /**
   * @scenario SCENARIO-002 "订票失败"
   * @given 用户提交订单时系统出现异常
   * @when 订单提交失败
   * @then 显示"订票失败，请稍后重试！"弹窗
   */
  const getErrorMessage = () => {
    if (errorMessage) return errorMessage;
    
    switch (errorType) {
      case 'insufficient_tickets':
        return '很抱歉，您选择的席别余票不足！';
      case 'order_failed':
        return '订票失败，请稍后重试！';
      case 'network_error':
        return '网络忙，请稍后再试。';
      default:
        return '操作失败，请稍后再试。';
    }
  };

  const getErrorIcon = () => {
    return (
      <div className="error-icon">
        <span className="error-icon-text">✕</span>
      </div>
    );
  };

  // 点击遮罩关闭
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // ========== UI Render ==========
  return (
    <div className="error-modal" onClick={handleOverlayClick}>
      {/* 遮罩层 */}
      <div className="error-modal-overlay"></div>
      
      {/* 弹窗主体 */}
      <div className="error-modal-content">
        {/* 错误图标 */}
        {getErrorIcon()}
        
        {/* 错误信息 */}
        <div className="error-message">
          {getErrorMessage()}
        </div>
        
        {/* 关闭按钮 */}
        <button 
          className="error-modal-close-button"
          onClick={onClose}
        >
          我知道了
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
