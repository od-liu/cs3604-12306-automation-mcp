/**
 * @component UI-ORDER-FILL-PAGE
 * @description 订单填写页面容器组件，整合所有子组件
 * @page order-fill
 * @children_slots REQ-ORDER-TOP-NAV, REQ-ORDER-TRAIN-INFO, REQ-ORDER-PASSENGER-SELECT, REQ-ORDER-SUBMIT, REQ-ORDER-TIPS, REQ-ORDER-CONFIRM-MODAL
 * 
 * ============ 功能实现清单（必填）============
 * @scenarios_covered: 无独立scenarios（容器组件）
 * 
 * @features_implemented:
 * ✅ 整合顶部导航栏（复用首页）
 * ✅ 整合列车信息区域
 * ✅ 整合乘客信息选择区域
 * ✅ 整合提交订单区域
 * ✅ 整合温馨提示区域
 * ✅ 整合订单确认弹窗（条件渲染）
 * ✅ 整合底部导航（复用首页）
 * 
 * @implementation_status:
 * - Features Coverage: 7/7 (100%)
 * - UI Visual: 像素级精确
 * ================================================
 */

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeTopBar from '../components/HomeTopBar/HomeTopBar';
import MainNavigation from '../components/MainNavigation/MainNavigation';
import BottomNavigation from '../components/BottomNavigation/BottomNavigation';
import TrainInfo from '../components/OrderFill/TrainInfo';
import PassengerInfo from '../components/OrderFill/PassengerInfo';
import SubmitSection from '../components/OrderFill/SubmitSection';
import WarmTips from '../components/OrderFill/WarmTips';
import OrderConfirmModal from '../components/OrderFill/OrderConfirmModal';
import ErrorModal from '../components/OrderFill/ErrorModal';
import './OrderFillPage.css';

/**
 * 订单填写页面容器组件
 * 
 * @layout_position "全屏页面，垂直布局"
 * @dimensions "宽度100vw，高度100vh"
 * @background_images []
 * @resources {
 *   images: [
 *     "/images/order-fill-保险广告.jpg"
 *   ]
 * }
 */
const OrderFillPage: React.FC = () => {
  // ========== State Management ==========
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPassengers, setSelectedPassengers] = useState<any[]>([]);
  
  // 从路由state中获取车次信息
  const trainData = location.state?.trainData || {
    date: '2026-01-18（周日）',
    trainNo: 'G103',
    departureStation: '北京南',
    departureTime: '06:20',
    arrivalStation: '上海虹桥',
    arrivalTime: '11:58',
    prices: {
      secondClass: { price: 662.0, available: 960 },
      firstClass: { price: 1060.0, available: 80 },
      businessClass: { price: 2318.0, available: 10 }
    }
  };

  // 转换为PassengerInfo组件需要的格式
  const availableSeats = [
    { type: '二等座' as const, price: trainData.prices.secondClass.price, available: trainData.prices.secondClass.available },
    { type: '一等座' as const, price: trainData.prices.firstClass.price, available: trainData.prices.firstClass.available },
    { type: '商务座' as const, price: trainData.prices.businessClass.price, available: trainData.prices.businessClass.available }
  ];

  // ========== Event Handlers ==========
  const handleSubmitOrder = () => {
    // 验证是否选择了乘客
    if (selectedPassengers.length === 0) {
      setErrorMessage('请选择至少一位乘客！');
      setShowErrorModal(true);
      return;
    }
    
    // 显示确认弹窗
    setShowConfirmModal(true);
  };

  const handlePassengersChange = (passengers: any[]) => {
    setSelectedPassengers(passengers);
  };

  const handleConfirmOrder = async () => {
    // 提交订单到后端
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          trainNo: trainData.trainNo,
          date: trainData.date,
          departureStation: trainData.departureStation,
          arrivalStation: trainData.arrivalStation,
          passengers: selectedPassengers
        })
      });

      if (response.ok) {
        const data = await response.json();
        // 跳转到支付页面
        navigate('/payment', { state: { orderId: data.orderId } });
      } else {
        const error = await response.json();
        setErrorMessage(error.message || '提交订单失败');
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage('网络错误，请稍后重试');
      setShowErrorModal(true);
    } finally {
      setShowConfirmModal(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // 返回上一页
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  // ========== UI Render ==========
  return (
    <div className="order-fill-page">
      {/* 顶部导航栏（复用首页） */}
      <HomeTopBar />
      
      {/* 主导航菜单 */}
      <MainNavigation />
      
      {/* 主内容区域 */}
      <div className="order-fill-main-content">
        {/* REQ-ORDER-TRAIN-INFO: 列车信息区域 */}
        <TrainInfo
          date={trainData.date}
          trainNo={trainData.trainNo}
          departureStation={trainData.departureStation}
          departureTime={trainData.departureTime}
          arrivalStation={trainData.arrivalStation}
          arrivalTime={trainData.arrivalTime}
          prices={trainData.prices}
        />
        
        {/* REQ-ORDER-PASSENGER-SELECT: 乘客信息区域 */}
        <PassengerInfo
          trainNo={trainData.trainNo}
          availableSeats={availableSeats}
          onPassengersChange={handlePassengersChange}
        />
        
        {/* REQ-ORDER-SUBMIT: 提交订单区域 */}
        <SubmitSection
          onSubmit={handleSubmitOrder}
          onBack={handleBack}
        />
        
        {/* REQ-ORDER-TIPS: 温馨提示区域 */}
        <WarmTips />
      </div>
      
      {/* 底部导航（复用首页） */}
      <BottomNavigation />
      
      {/* REQ-ORDER-CONFIRM-MODAL: 订单确认弹窗（条件渲染） */}
      {showConfirmModal && (
        <OrderConfirmModal
          trainInfo={{
            date: trainData.date,
            trainNo: trainData.trainNo,
            departureStation: trainData.departureStation,
            departureTime: trainData.departureTime,
            arrivalStation: trainData.arrivalStation,
            arrivalTime: trainData.arrivalTime
          }}
          passengers={selectedPassengers.map(sp => ({
            id: sp.passenger.id,
            name: sp.passenger.name,
            idType: sp.passenger.idType,
            idNumber: sp.passenger.idNumber,
            seatType: sp.seatType,
            ticketType: sp.ticketType
          }))}
          seatAvailability={{
            businessClass: trainData.prices.businessClass.available,
            firstClass: trainData.prices.firstClass.available,
            secondClass: trainData.prices.secondClass.available
          }}
          onClose={handleCloseModal}
          onConfirm={handleConfirmOrder}
        />
      )}
      
      {/* REQ-ORDER-ERROR-MODAL: 错误提示弹窗 */}
      {showErrorModal && (
        <ErrorModal
          isOpen={showErrorModal}
          errorType="general"
          errorMessage={errorMessage}
          onClose={handleCloseErrorModal}
        />
      )}
    </div>
  );
};

export default OrderFillPage;
