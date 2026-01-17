# 订单填写页 UI 样式规范

**生成时间**: 2026-01-17  
**页面**: 订单填写页 (order-fill)  
**参考宽度**: 1512px（实际DOM测量）

---

## 1. 颜色体系

### 1.1 主题色
```css
/* 主题橙色 - 用于主要按钮 */
--primary-orange: rgb(253, 129, 0); /* #FD8100 */
--primary-orange-hover: rgb(255, 136, 51); /* #FF8833 */

/* 蓝色 - 用于标题背景 */
--title-blue: rgb(39, 138, 204); /* #278ACC */
```

### 1.2 文本颜色
```css
/* 深色文字 */
--text-dark: rgb(51, 51, 51); /* #333333 */

/* 白色文字 */
--text-white: rgb(255, 255, 255); /* #FFFFFF */
```

### 1.3 背景和边框
```css
/* 白色容器背景 */
--bg-white: rgb(255, 255, 255); /* #FFFFFF */

/* 浅蓝灰边框 */
--border-light-blue: rgb(192, 215, 235); /* #C0D7EB */

/* 灰色边框 */
--border-gray: rgb(192, 192, 192); /* #C0C0C0 */

/* 浅灰边框 */
--border-light-gray: rgb(224, 224, 224); /* #E0E0E0 */

/* 温馨提示背景 */
--tips-bg-yellow: rgb(255, 251, 229); /* #FFFBE5 */
--tips-border-yellow: rgb(245, 230, 168); /* #F5E6A8 */
```

---

## 2. 列车信息区域

### 2.1 文件路径
- 组件: `frontend/src/components/OrderFill/TrainInfo.tsx`
- 样式: `frontend/src/components/OrderFill/TrainInfo.css`

### 2.2 组件位置说明
- 位置: 页面主内容区域顶部，位于导航栏下方
- 尺寸: 1100px × 169px
- 外边距: 20px 186px
- 布局: 块级元素，垂直堆叠

### 2.3 完整样式代码

📸 **参考截图**: `requirements/images/order-fill/组件特写截图/列车信息区域.png`

```css
/* ========== 列车信息区域容器 ========== */
.train-info-section {
  display: block !important;
  width: 1100px !important;
  background-color: rgb(255, 255, 255) !important; /* 白色背景 */
  border: 1px solid rgb(192, 215, 235) !important; /* 浅蓝灰边框 */
  border-radius: 10px !important;
  margin: 20px 186px !important;
  overflow: hidden !important;
}

/* ========== 标题栏 ========== */
.train-info-header {
  background-color: rgb(39, 138, 204) !important; /* 蓝色背景 */
  padding: 15px 20px !important;
}

.train-info-header .section-title {
  font-size: 18px !important;
  font-weight: bold !important;
  color: rgb(255, 255, 255) !important; /* 白色文字 */
  margin: 0 !important;
}

/* ========== 内容区 ========== */
.train-info-content {
  padding: 20px !important;
}

/* ========== 基础信息行 ========== */
.train-basic-info {
  display: flex !important;
  align-items: center !important;
  gap: 15px !important;
  margin-bottom: 15px !important;
  font-size: 16px !important;
  color: rgb(51, 51, 51) !important;
}

.train-date {
  font-weight: bold !important;
  color: rgb(51, 51, 51) !important;
}

.train-no {
  font-size: 20px !important;
  font-weight: bold !important;
  color: rgb(39, 138, 204) !important; /* 蓝色车次号 */
}

.train-station {
  font-weight: bold !important;
}

.train-bold-group {
  font-weight: bold !important;
}

/* ========== 票价信息区 ========== */
.train-fare-info {
  display: flex !important;
  gap: 40px !important;
  margin-bottom: 15px !important;
  padding: 10px 0 !important;
  border-top: 1px solid rgb(240, 240, 240) !important;
  border-bottom: 1px solid rgb(240, 240, 240) !important;
}

.fare-item {
  display: flex !important;
  align-items: center !important;
  gap: 5px !important;
  font-size: 15px !important;
}

.seat-type-label {
  font-weight: bold !important;
  color: rgb(51, 51, 51) !important;
}

.seat-price {
  color: rgb(253, 129, 0) !important; /* 橙色价格 */
  font-weight: bold !important;
}

.seat-available {
  color: rgb(102, 102, 102) !important; /* 中灰色 */
}

/* ========== 价格说明 ========== */
.train-info-notice {
  font-size: 13px !important;
  color: rgb(102, 102, 102) !important;
  line-height: 1.6 !important;
}

.train-info-notice a {
  color: rgb(39, 138, 204) !important; /* 蓝色链接 */
  text-decoration: underline !important;
}

.train-info-notice a:hover {
  color: rgb(253, 129, 0) !important; /* hover变橙色 */
}
```

---

## 3. 乘客信息区域

### 3.1 文件路径
- 组件: `frontend/src/components/OrderFill/PassengerInfo.tsx`
- 样式: `frontend/src/components/OrderFill/PassengerInfo.css`

### 3.2 组件位置说明
- 位置: 列车信息区域下方
- 尺寸: 1100px × 383px
- 外边距: 20px 186px
- 布局: 块级元素，包含多个子区域

### 3.3 完整样式代码

📸 **参考截图**: `requirements/images/order-fill/组件特写截图/乘客信息区域.png`

```css
/* ========== 乘客信息区域容器 ========== */
.passenger-info-section {
  display: block !important;
  width: 1100px !important;
  background-color: rgb(255, 255, 255) !important;
  border: 1px solid rgb(192, 215, 235) !important;
  border-radius: 10px !important;
  margin: 20px 186px !important;
  padding: 20px !important;
}

/* ========== 标题栏 + 搜索框 ========== */
.passenger-info-header {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  margin-bottom: 20px !important;
  padding-bottom: 15px !important;
  border-bottom: 1px solid rgb(240, 240, 240) !important;
}

.passenger-info-header .section-title {
  font-size: 18px !important;
  font-weight: bold !important;
  color: rgb(51, 51, 51) !important;
  margin: 0 !important;
}

.passenger-search-box {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
}

.passenger-search-box .search-input {
  width: 200px !important;
  height: 32px !important;
  padding: 0 10px !important;
  border: 1px solid rgb(192, 192, 192) !important;
  border-radius: 4px !important;
  font-size: 14px !important;
}

.passenger-search-box .search-icon {
  cursor: pointer !important;
  font-size: 18px !important;
}

/* ========== 乘车人选择区 ========== */
.passenger-list-container {
  margin-bottom: 20px !important;
}

.subsection-title {
  font-size: 16px !important;
  font-weight: bold !important;
  color: rgb(51, 51, 51) !important;
  margin-bottom: 10px !important;
}

.passenger-list {
  display: flex !important;
  gap: 20px !important;
  flex-wrap: wrap !important;
}

.passenger-checkbox {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  cursor: pointer !important;
  padding: 8px 15px !important;
  border: 1px solid rgb(220, 220, 220) !important;
  border-radius: 4px !important;
  background-color: rgb(250, 250, 250) !important;
  transition: all 0.2s !important;
}

.passenger-checkbox:hover {
  background-color: rgb(240, 248, 255) !important;
  border-color: rgb(39, 138, 204) !important;
}

.passenger-checkbox-input {
  width: 16px !important;
  height: 16px !important;
  cursor: pointer !important;
}

.passenger-checkbox-label {
  font-size: 14px !important;
  color: rgb(51, 51, 51) !important;
  user-select: none !important;
}

/* ========== 购票信息表格 ========== */
.purchase-info-container {
  margin-bottom: 20px !important;
}

.purchase-info-table {
  width: 100% !important;
  border: 1px solid rgb(220, 220, 220) !important;
  border-radius: 4px !important;
  overflow: hidden !important;
}

/* 表头 */
.table-header {
  display: grid !important;
  grid-template-columns: 60px 120px 180px 150px 150px 200px 80px !important;
  background-color: rgb(245, 245, 245) !important;
  border-bottom: 1px solid rgb(220, 220, 220) !important;
}

.table-header-cell {
  padding: 12px 10px !important;
  font-size: 14px !important;
  font-weight: bold !important;
  color: rgb(51, 51, 51) !important;
  text-align: center !important;
}

/* 表格主体 */
.table-body {
  background-color: rgb(255, 255, 255) !important;
}

.purchase-info-row {
  display: grid !important;
  grid-template-columns: 60px 120px 180px 150px 150px 200px 80px !important;
  border-bottom: 1px solid rgb(240, 240, 240) !important;
}

.purchase-info-row:last-child {
  border-bottom: none !important;
}

.row-cell {
  padding: 10px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

/* 下拉框样式 */
.select-dropdown {
  position: relative !important;
  width: 100% !important;
  height: 32px !important;
  border: 1px solid rgb(192, 192, 192) !important;
  border-radius: 4px !important;
  background-color: rgb(255, 255, 255) !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  padding: 0 10px !important;
}

.select-dropdown:hover {
  border-color: rgb(39, 138, 204) !important;
}

.selected-value-display {
  flex: 1 !important;
  font-size: 14px !important;
  color: rgb(51, 51, 51) !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}

.arrow {
  width: 0 !important;
  height: 0 !important;
  border-left: 4px solid transparent !important;
  border-right: 4px solid transparent !important;
  border-top: 5px solid rgb(102, 102, 102) !important;
  margin-left: 8px !important;
}

/* 只读输入框 */
.readonly-input {
  width: 100% !important;
  height: 32px !important;
  padding: 0 10px !important;
  border: 1px solid rgb(220, 220, 220) !important;
  border-radius: 4px !important;
  background-color: rgb(245, 245, 245) !important;
  color: rgb(102, 102, 102) !important;
  font-size: 14px !important;
  cursor: not-allowed !important;
}

/* ========== 保险广告横幅 ========== */
.railway-insurance-banner {
  width: 100% !important;
  margin-top: 20px !important;
}

.railway-insurance-banner img {
  width: 100% !important;
  height: auto !important;
  object-fit: contain !important;
  display: block !important;
}
```

---

## 4. 提交订单区域

### 4.1 文件路径
- 组件: `frontend/src/components/OrderFill/SubmitSection.tsx`
- 样式: `frontend/src/components/OrderFill/SubmitSection.css`

### 4.2 组件位置说明
- 位置: 乘客信息区域下方
- 尺寸: 1100px × 75px
- 外边距: 20px 186px

### 4.3 完整样式代码

📸 **参考截图**: `requirements/images/order-fill/组件特写截图/提交订单区域.png`

```css
/* ========== 提交订单区域容器 ========== */
.order-submit-section {
  display: block !important;
  width: 1100px !important;
  margin: 20px 186px !important;
}

/* ========== 同意条款提示 ========== */
.submit-notice {
  margin-bottom: 15px !important;
}

.submit-notice .notice-text {
  font-size: 13px !important;
  color: rgb(102, 102, 102) !important;
  line-height: 1.6 !important;
}

.submit-notice a {
  color: rgb(39, 138, 204) !important;
  text-decoration: underline !important;
  margin: 0 5px !important;
}

.submit-notice a:hover {
  color: rgb(253, 129, 0) !important;
}

/* ========== 按钮区 ========== */
.submit-buttons {
  display: flex !important;
  gap: 20px !important;
  justify-content: flex-end !important;
}

/* 上一步按钮 */
.order-back-button {
  min-width: 120px !important;
  height: 40px !important;
  padding: 0 20px !important;
  background-color: rgb(255, 255, 255) !important; /* 白色背景 */
  color: rgb(51, 51, 51) !important; /* 深灰文字 */
  border: 1px solid rgb(192, 192, 192) !important; /* 灰色边框 */
  border-radius: 3px !important;
  font-size: 15px !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
}

.order-back-button:hover {
  background-color: rgb(245, 245, 245) !important;
  border-color: rgb(150, 150, 150) !important;
}

/* 提交订单按钮 */
.order-submit-button {
  min-width: 120px !important;
  height: 40px !important;
  padding: 0 20px !important;
  background-color: rgb(253, 129, 0) !important; /* 橙色背景 */
  color: rgb(255, 255, 255) !important; /* 白色文字 */
  border: none !important;
  border-radius: 3px !important;
  font-size: 15px !important;
  font-weight: bold !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
}

.order-submit-button:hover {
  background-color: rgb(255, 136, 51) !important; /* hover变浅橙色 */
}

.order-submit-button:active {
  background-color: rgb(230, 115, 0) !important; /* active变深橙色 */
}

.order-submit-button:disabled {
  background-color: rgb(200, 200, 200) !important;
  cursor: not-allowed !important;
}
```

---

## 5. 温馨提示区域

### 5.1 文件路径
- 组件: `frontend/src/components/OrderFill/WarmTips.tsx`
- 样式: `frontend/src/components/OrderFill/WarmTips.css`

### 5.2 组件位置说明
- 位置: 提交订单区域下方
- 尺寸: 1100px × 282px
- 外边距: 20px 186px

### 5.3 完整样式代码

📸 **参考截图**: `requirements/images/order-fill/组件特写截图/温馨提示区域.png`

```css
/* ========== 温馨提示区域容器 ========== */
.warm-tips-section {
  display: block !important;
  width: 1100px !important;
  background-color: rgb(255, 251, 229) !important; /* 浅黄色背景 */
  border: 1px solid rgb(245, 230, 168) !important; /* 黄色边框 */
  border-radius: 10px !important;
  padding: 10px 15px !important;
  margin: 20px 186px !important;
}

/* ========== 标题 ========== */
.tips-title {
  font-size: 16px !important;
  font-weight: bold !important;
  color: rgb(153, 102, 0) !important; /* 深黄色文字 */
  margin: 0 0 10px 0 !important;
}

/* ========== 列表 ========== */
.tips-list {
  margin: 0 !important;
  padding-left: 25px !important;
  list-style-type: decimal !important;
}

.tip-item {
  font-size: 13px !important;
  color: rgb(102, 102, 102) !important;
  line-height: 1.8 !important;
  margin-bottom: 8px !important;
}

.tip-item:last-child {
  margin-bottom: 0 !important;
}

.tip-item a {
  color: rgb(39, 138, 204) !important;
  text-decoration: underline !important;
}

.tip-item a:hover {
  color: rgb(253, 129, 0) !important;
}
```

---

## 6. 响应式布局建议

### 6.1 移动端适配（宽度 < 768px）
```css
@media (max-width: 768px) {
  /* 容器宽度调整 */
  .train-info-section,
  .passenger-info-section,
  .order-submit-section,
  .warm-tips-section {
    width: 95% !important;
    margin: 15px auto !important;
  }
  
  /* 表格列宽度调整 */
  .table-header,
  .purchase-info-row {
    grid-template-columns: 50px 100px 140px 120px 120px 150px 60px !important;
    font-size: 12px !important;
  }
  
  /* 按钮全宽 */
  .submit-buttons {
    flex-direction: column !important;
  }
  
  .order-back-button,
  .order-submit-button {
    width: 100% !important;
  }
}
```

---

## 7. 使用说明

### 7.1 React组件示例

```tsx
import React from 'react';
import './TrainInfo.css';

const TrainInfo: React.FC = () => {
  return (
    <div className="train-info-section">
      <div className="train-info-header">
        <h2 className="section-title">列车信息（以下余票信息仅供参考）</h2>
      </div>
      <div className="train-info-content">
        {/* 基础信息 */}
        <div className="train-basic-info">
          <span className="train-date">2026-01-18（周日）</span>
          <span className="train-info-group">
            <span className="train-no">G103</span>
            <span className="train-text">次</span>
          </span>
          {/* ... 其他内容 */}
        </div>
        
        {/* 票价信息 */}
        <div className="train-fare-info">
          <div className="fare-item">
            <span className="seat-type-label">二等座</span>
            <span className="seat-price">¥662.0元</span>
            <span className="seat-available"> 960张票</span>
          </div>
          {/* ... 其他席别 */}
        </div>
        
        {/* 价格说明 */}
        <div className="train-info-notice">
          <p className="notice-text">
            *显示的价格均为实际活动折扣后票价...
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainInfo;
```

---

## 7.2 订单确认弹窗组件

### 7.2.1 文件路径
- 组件: `frontend/src/components/OrderConfirmationModal/OrderConfirmationModal.tsx`
- 样式: `frontend/src/components/OrderConfirmationModal/OrderConfirmationModal.css`

### 7.2.2 组件位置说明
- 类型: 模态弹窗 (Modal)
- 定位: fixed，铺满整个视口，弹窗内容居中
- 尺寸: 弹窗内容宽度 800px
- z-index: 1000
- 遮罩层: 半透明黑色背景 rgba(0, 0, 0, 0.5)

### 7.2.3 完整样式代码

```css
/* ========== 订单确认弹窗 ========== */
/* 📸 参考截图: requirements/images/order-fill/交互状态截图/订单填写-提交订单弹窗.png */

/* 弹窗容器（覆盖整个视口） */
.order-confirmation-modal {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: 1000 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

/* 遮罩层 */
.modal-overlay {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
}

/* 弹窗主体 */
.modal-content {
  position: relative !important;
  width: 800px !important;
  max-width: 800px !important;
  background-color: #FFFFFF !important;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.3) !important;
  display: flex !important;
  flex-direction: column !important;
  z-index: 1001 !important;
}

/* 弹窗头部 */
.modal-header {
  padding: 8px 20px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  /* 蓝色渐变背景，通过.blue-background类实现 */
}

.modal-header.blue-background {
  background: linear-gradient(to right, #2089D6, #278ACC) !important;
}

.modal-title {
  font-size: 18px !important;
  font-weight: 500 !important;
  color: #FFFFFF !important;
  margin: 0 !important;
}

.modal-close {
  width: 30px !important;
  height: 30px !important;
  padding: 0 !important;
  margin: 0 !important;
  background-color: transparent !important;
  color: #FFFFFF !important;
  font-size: 28px !important;
  font-weight: 500 !important;
  border: none !important;
  border-radius: 8px !important;
  cursor: pointer !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  transition: background-color 0.3s !important;
}

.modal-close:hover {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

/* 弹窗内容 */
.modal-body {
  padding: 15px 50px !important;
  background-color: #FFFFFF !important;
}

/* 列车信息展示 */
.train-info-display {
  margin-bottom: 15px !important;
}

.train-info-line {
  display: flex !important;
  gap: 15px !important;
  font-size: 16px !important;
  color: #213547 !important;
}

.info-date {
  font-weight: 500 !important;
}

.info-group {
  display: inline-flex !important;
  gap: 4px !important;
}

.info-train-no {
  color: #2089D6 !important;
  font-weight: 600 !important;
  font-size: 18px !important;
}

.info-station {
  color: #213547 !important;
  font-weight: 500 !important;
}

.info-bold-group {
  font-weight: 600 !important;
}

/* 乘客信息表格 */
.confirmation-table-container {
  margin: 15px 0 !important;
  width: 100% !important;
}

.confirmation-passenger-table {
  width: 100% !important;
  border-collapse: collapse !important;
  font-size: 16px !important;
}

.confirmation-passenger-table thead {
  background-color: #F5F5F5 !important;
}

.confirmation-passenger-table th {
  padding: 10px !important;
  text-align: center !important;
  border: 1px solid #E0E0E0 !important;
  font-weight: 500 !important;
  color: #213547 !important;
}

.confirmation-passenger-table td {
  padding: 10px !important;
  text-align: center !important;
  border: 1px solid #E0E0E0 !important;
  color: #555555 !important;
}

/* 席位分配提示 */
.seat-allocation-notice {
  text-align: center !important;
  color: #666666 !important;
  font-size: 14px !important;
  margin: 10px 0 !important;
}

/* 余票信息展示 */
.seat-availability-display {
  text-align: center !important;
  margin: 10px 0 !important;
}

.availability-text {
  font-size: 16px !important;
  color: #213547 !important;
}

.seat-count {
  color: #FF0000 !important;
  font-weight: 600 !important;
  font-size: 18px !important;
}

/* 弹窗底部 */
.modal-footer {
  padding: 0px 25px 25px !important;
  display: flex !important;
  justify-content: center !important;
  gap: 25px !important;
  background-color: #FFFFFF !important;
}

/* 返回修改按钮 */
.back-modal-button {
  width: 150px !important;
  height: 45px !important;
  padding: 10px 40px !important;
  background-color: #FFFFFF !important;
  color: #555555 !important;
  border: 1px solid #555555 !important;
  border-radius: 4px !important;
  font-size: 16px !important;
  cursor: pointer !important;
  transition: all 0.3s !important;
}

.back-modal-button:hover {
  background-color: #F5F5F5 !important;
  border-color: #333333 !important;
  color: #333333 !important;
}

/* 确认按钮 */
.confirm-modal-button {
  width: 150px !important;
  height: 45px !important;
  padding: 10px 40px !important;
  background-color: #FF9500 !important;
  color: #FFFFFF !important;
  border: none !important;
  border-radius: 4px !important;
  font-size: 16px !important;
  cursor: pointer !important;
  transition: background-color 0.3s !important;
}

.confirm-modal-button:hover {
  background-color: #FF8000 !important;
}

.confirm-modal-button:disabled {
  background-color: #CCCCCC !important;
  cursor: not-allowed !important;
}
```

### 7.2.4 React组件示例

```tsx
import React, { useState } from 'react';
import './OrderConfirmationModal.css';

interface PassengerInfo {
  id: number;
  seatType: string;
  ticketType: string;
  name: string;
  idType: string;
  idNumber: string;
}

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  trainInfo: {
    date: string;
    trainNo: string;
    departStation: string;
    departTime: string;
    arriveStation: string;
    arriveTime: string;
  };
  passengers: PassengerInfo[];
  seatAvailability: {
    business: number;
    firstClass: number;
    secondClass: number;
  };
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  trainInfo,
  passengers,
  seatAvailability
}) => {
  if (!isOpen) return null;

  return (
    <div className="order-confirmation-modal">
      {/* 遮罩层 */}
      <div className="modal-overlay" onClick={onClose}></div>
      
      {/* 弹窗主体 */}
      <div className="modal-content">
        {/* 弹窗头部 */}
        <div className="modal-header blue-background">
          <h2 className="modal-title">请核对以下信息</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        {/* 弹窗内容 */}
        <div className="modal-body">
          {/* 列车信息展示 */}
          <div className="train-info-display">
            <div className="train-info-line">
              <span className="info-date">{trainInfo.date}</span>
              <span className="info-group">
                <span className="info-train-no">{trainInfo.trainNo}</span>
                <span className="info-text">次</span>
              </span>
              <span className="info-group">
                <span className="info-station">{trainInfo.departStation}</span>
                <span className="info-text">站</span>
                <span className="info-bold-group">
                  （{trainInfo.departTime}开）—{trainInfo.arriveStation}
                </span>
                <span className="info-text">站（{trainInfo.arriveTime}到）</span>
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
              本次列车，
              <span>商务座余票 <span className="seat-count">{seatAvailability.business}</span> 张</span>
              <span>，二等座余票 <span className="seat-count">{seatAvailability.secondClass}</span> 张</span>
              <span>，一等座余票 <span className="seat-count">{seatAvailability.firstClass}</span> 张</span>。
            </p>
          </div>
        </div>
        
        {/* 弹窗底部按钮 */}
        <div className="modal-footer">
          <button type="button" className="back-modal-button" onClick={onClose}>
            返回修改
          </button>
          <button type="button" className="confirm-modal-button" onClick={onConfirm}>
            确认
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
```

### 7.2.5 使用示例

```tsx
import React, { useState } from 'react';
import OrderConfirmationModal from './components/OrderConfirmationModal';

const OrderPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmitOrder = () => {
    // 验证乘客信息...
    setShowModal(true);
  };

  const handleConfirm = () => {
    // 提交订单逻辑
    console.log('订单已确认');
    setShowModal(false);
    // 跳转到支付页面...
  };

  return (
    <div>
      {/* 订单填写页面内容... */}
      <button onClick={handleSubmitOrder}>提交订单</button>
      
      {/* 订单确认弹窗 */}
      <OrderConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        trainInfo={{
          date: '2026-01-18（周日）',
          trainNo: 'G103',
          departStation: '北京南',
          departTime: '06:20',
          arriveStation: '上海虹桥',
          arriveTime: '11:58'
        }}
        passengers={[
          {
            id: 1,
            seatType: '二等座',
            ticketType: '成人票',
            name: '王三',
            idType: '居民身份证',
            idNumber: '330106200503102222'
          }
        ]}
        seatAvailability={{
          business: 10,
          firstClass: 80,
          secondClass: 960
        }}
      />
    </div>
  );
};
```

### 7.2.6 验证清单

- [ ] 弹窗覆盖整个视口，z-index为1000
- [ ] 遮罩层为半透明黑色 rgba(0, 0, 0, 0.5)
- [ ] 弹窗内容宽度800px，居中显示
- [ ] 弹窗头部蓝色渐变背景（#2089D6 到 #278ACC）
- [ ] 标题为白色，字体大小18px
- [ ] 关闭按钮hover时背景变化
- [ ] 列车信息显示正确（日期、车次、站点、时间）
- [ ] 表格样式正确（边框、内边距、居中对齐）
- [ ] 余票数字显示为红色并加粗
- [ ] "返回修改"按钮为白色背景+灰色边框
- [ ] "确认"按钮为橙色背景+白色文字
- [ ] 按钮hover效果正常
- [ ] 点击遮罩层或关闭按钮可关闭弹窗

---

## 8. 验证清单

### 8.1 列车信息区域
- [ ] 蓝色标题栏背景色正确（#278ACC）
- [ ] 白色容器背景和浅蓝灰边框
- [ ] 车次号显示为蓝色加粗
- [ ] 票价显示为橙色
- [ ] 圆角为10px

### 8.2 乘客信息区域
- [ ] 搜索框样式正确
- [ ] 乘车人复选框可点击，hover效果正常
- [ ] 表格列宽度合理，内容居中
- [ ] 下拉框有箭头图标
- [ ] 只读输入框显示为灰色背景
- [ ] 保险广告图片自适应宽度

### 8.3 提交订单区域
- [ ] "上一步"按钮为白色背景+灰色边框
- [ ] "提交订单"按钮为橙色背景+白色文字
- [ ] 按钮hover效果正常
- [ ] 按钮禁用状态显示为灰色

### 8.4 温馨提示区域
- [ ] 浅黄色背景（#FFFBE5）
- [ ] 黄色边框（#F5E6A8）
- [ ] 有序列表序号正常显示
- [ ] 链接颜色为蓝色，hover变橙色

### 8.5 订单确认弹窗
- [ ] 弹窗覆盖整个视口，遮罩层半透明
- [ ] 弹窗内容宽度800px，居中显示
- [ ] 弹窗头部蓝色渐变背景
- [ ] 标题和关闭按钮为白色
- [ ] 关闭按钮hover时背景变化
- [ ] 列车信息展示完整（日期、车次、站点、时间）
- [ ] 乘客表格样式正确（表头灰色背景、单元格有边框）
- [ ] 余票数字显示为红色加粗
- [ ] "返回修改"按钮为白底灰字有边框
- [ ] "确认"按钮为橙色背景白字
- [ ] 所有按钮hover效果正常
- [ ] 点击遮罩层或关闭按钮可关闭弹窗

---

## 9. 注意事项

1. **颜色精度**: 所有颜色值基于浏览器DOM测量，已转换为精确的RGB值
2. **尺寸单位**: 所有尺寸使用px单位，基于1512px参考宽度
3. **!important**: 为确保样式优先级，关键样式使用了 `!important`
4. **复用资源**: Logo、搜索图标、友情链接、二维码均复用首页资源
5. **响应式**: 建议根据实际需求添加媒体查询适配不同屏幕

---

**文档生成完成！** 🎉

所有CSS代码可直接复制使用，样式已根据实际DOM结构精确编写。
