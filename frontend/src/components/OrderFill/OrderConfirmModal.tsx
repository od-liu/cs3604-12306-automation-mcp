/**
 * @component UI-ORDER-CONFIRM-MODAL
 * @description 订单确认弹窗，显示订单信息摘要并确认提交
 * @page order-fill
 * 
 * ============ 功能实现清单（必填）============
 * @scenarios_covered:
 * ✅ SCENARIO-005: 用户在信息核对弹窗点击返回修改
 * ✅ SCENARIO-006: 用户在信息核对弹窗点击确认（触发父组件提交订单）
 * ✅ SCENARIO-008: 返回修改（关闭弹窗）
 * 
 * @features_implemented:
 * ✅ 显示车次信息摘要（日期、车次号、站点、时间）
 * ✅ 显示乘客信息表格（序号、席别、票种、姓名、证件类型、证件号码）
 * ✅ 显示席位分配说明
 * ✅ 显示余票情况（红色强调数字）
 * ✅ 提供"返回修改"按钮（白底灰字有边框）
 * ✅ 提供"确认"按钮（橙色背景白字）- 点击后触发父组件的订单提交逻辑
 * ✅ 点击关闭按钮或遮罩关闭弹窗
 * ✅ 全屏遮罩（半透明黑色）
 * 
 * @implementation_status:
 * - Scenarios Coverage: 3/3 (100%)
 * - Features Coverage: 8/8 (100%)
 * - UI Visual: 像素级精确
 * 
 * @note 订单提交逻辑由父组件 OrderFillPage 处理，本组件只负责展示确认信息
 * ================================================
 * 
 * @layout_position "fixed，铺满整个视口"
 * @dimensions "全屏遮罩，弹窗内容宽度800px"
 * @resources {
 *   images: []
 * }
 */

import React from 'react';
import './OrderConfirmModal.css';

interface PassengerData {
  id: string;
  name: string;
  idType: string;
  idNumber: string;
  seatType: string;
  ticketType: string;
}

interface TrainInfoData {
  date: string;
  trainNo: string;
  departureStation: string;
  departureTime: string;
  arrivalStation: string;
  arrivalTime: string;
}

interface SeatAvailability {
  businessClass: number;
  firstClass: number;
  secondClass: number;
}

interface OrderConfirmModalProps {
  trainInfo: TrainInfoData;
  passengers: PassengerData[];
  seatAvailability: SeatAvailability;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean; // 由父组件控制提交状态
}

/**
 * 订单确认弹窗组件
 * 
 * 注意：本组件不直接提交订单，订单提交由父组件 OrderFillPage 的 handleConfirmOrder 处理。
 * 点击"确认"按钮时调用 onConfirm，由父组件执行：
 * 1. 调用后端 API 提交订单
 * 2. 根据结果跳转到支付页面或显示错误
 */
const OrderConfirmModal: React.FC<OrderConfirmModalProps> = ({
  trainInfo,
  passengers,
  seatAvailability,
  onClose,
  onConfirm,
  isSubmitting = false
}) => {
  // ========== Scenario Implementations ==========

  /**
   * @scenario SCENARIO-005 "用户在信息核对弹窗点击返回修改"
   * @given 用户在成功提交订单后跳转至信息核对弹窗
   * @when 用户点击"返回修改"按钮
   * @then 系统回到订单填写页（关闭弹窗）
   */
  const handleBack = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  /**
   * @scenario SCENARIO-006 "用户在信息核对弹窗点击确认"
   * @given 用户在信息核对弹窗中查看订单信息
   * @when 用户点击"确认"按钮
   * @then 触发父组件的订单提交逻辑（调用 onConfirm）
   * 
   * 父组件负责：
   * - 调用 API-SUBMIT-ORDER 提交订单
   * - 成功后跳转到支付页面 /payment/:orderId
   * - 失败时显示错误信息
   */
  const handleConfirm = () => {
    if (!isSubmitting) {
      onConfirm();
    }
  };

  // 点击遮罩关闭
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      /**
       * @scenario SCENARIO-008 "返回修改"
       * @given 用户在订单确认弹窗中发现信息有误
       * @when 用户点击遮罩区域
       * @then 关闭弹窗，返回订单填写页
       */
      onClose();
    }
  };

  // ========== UI Render ==========
  return (
    <div className="order-confirmation-modal" onClick={handleOverlayClick}>
      {/* 遮罩层 */}
      <div className="modal-overlay"></div>
      
      {/* 弹窗主体 */}
      <div className="modal-content">
        {/* 弹窗头部 */}
        <div className="modal-header blue-background">
          <h2 className="modal-title">请核对以下信息</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        {/* 弹窗内容 */}
        <div className="modal-body white-background">
          {/* 列车信息展示 */}
          <div className="train-info-display">
            <div className="train-info-line">
              <span className="info-date">{trainInfo.date}</span>
              <span className="info-group">
                <span className="info-train-no">{trainInfo.trainNo}</span>
                <span className="info-text">次</span>
              </span>
              <span className="info-group">
                <span className="info-station">{trainInfo.departureStation}</span>
                <span className="info-text">站</span>
                <span className="info-bold-group">（{trainInfo.departureTime}开）—{trainInfo.arrivalStation}</span>
                <span className="info-text">站（{trainInfo.arrivalTime}到）</span>
              </span>
            </div>
          </div>
          
          {/* 乘客信息表格 */}
          <div className="confirmation-table-container">
            <table className="confirmation-passenger-table">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>席别</th>
                  <th>票种</th>
                  <th>姓名</th>
                  <th>证件类型</th>
                  <th>证件号码</th>
                </tr>
              </thead>
              <tbody>
                {passengers.map((passenger, index) => (
                  <tr key={passenger.id}>
                    <td>{index + 1}</td>
                    <td>{passenger.seatType}</td>
                    <td>{passenger.ticketType}</td>
                    <td>{passenger.name}</td>
                    <td>{passenger.idType}</td>
                    <td>{passenger.idNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* 席位分配提示 */}
          <div className="seat-allocation-notice">
            系统将随机为您申请席位，暂不支持自选席位。
          </div>
          
          {/* 余票信息展示 */}
          <div className="seat-availability-display">
            <p className="availability-text">
              本次列车，<span>商务座余票 <span className="seat-count">{seatAvailability.businessClass}</span> 张</span>
              <span>，二等座余票 <span className="seat-count">{seatAvailability.secondClass}</span> 张</span>
              <span>，一等座余票 <span className="seat-count">{seatAvailability.firstClass}</span> 张</span>。
            </p>
          </div>
        </div>
        
        {/* 弹窗底部按钮 */}
        <div className="modal-footer">
          <button 
            type="button" 
            className="back-modal-button white-background gray-text"
            onClick={handleBack}
            disabled={isSubmitting}
          >
            返回修改
          </button>
          <button 
            type="button" 
            className={`confirm-modal-button orange-background white-text ${isSubmitting ? 'submitting' : ''}`}
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? '提交中...' : '确认'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmModal;
