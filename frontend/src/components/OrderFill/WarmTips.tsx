/**
 * @component UI-ORDER-TIPS
 * @description 温馨提示区域，显示购票规则和注意事项
 * @page order-fill
 * 
 * ============ 功能实现清单（必填）============
 * @scenarios_covered: 无独立scenarios（纯展示组件）
 * 
 * @features_implemented:
 * ✅ 显示购票规则和注意事项（7条）
 * ✅ 使用浅黄色背景和黄色边框
 * ✅ 有序列表格式展示
 * ✅ 包含链接到规程和政策文档
 * 
 * @implementation_status:
 * - Features Coverage: 4/4 (100%)
 * - UI Visual: 像素级精确
 * ================================================
 * 
 * @layout_position "提交订单区域下方"
 * @dimensions "1100px × 282px"
 * @resources {
 *   images: []
 * }
 */

import React from 'react';
import './WarmTips.css';

/**
 * 温馨提示区域组件
 */
const WarmTips: React.FC = () => {
  // ========== UI Render ==========
  return (
    <div className="warm-tips-section order-page-tips">
      <h3 className="tips-title">温馨提示：</h3>
      <ol className="tips-list">
        <li className="tip-item">
          一张有效身份证件同一乘车日期同一车次只能购买一张车票。高铁动卧列车除外，改签或变更到站后车票的乘车日期在春运期间，如再办理退票将按票面价格20%核收退票费，请合理安排行程，更多改签规则请查看
          <a href="#">《退改说明》</a>
        </li>
        <li className="tip-item">
          购买儿童票时，乘车儿童有有效身份证件的，请填写本人有效身份证件信息。自2023年1月1日起，每一名持票成人旅客可免费携带一名未满6周岁且不单独占用座位的儿童乘车，超过一名时，超过人数应购买儿童优惠票，免费儿童是以在购票成功后添加。
        </li>
        <li className="tip-item">
          购买残疾军人（伤残警察）优待票的，须在购票后，并在前往提检票进站前应出站乘车。换票时，不符合规定的减价优待条件，没有有效"中华人民共和国残疾军人证"或"中华人民共和国伤残人民警察证"的，不予换票，所购车票按规定办理退票手续。
        </li>
        <li className="tip-item">
          一天内3次申请车票成功后取消订单（包含允席票时取消5次后取消1次），当日将不能在12306继续购票。
        </li>
        <li className="tip-item">
          购买铁路乘意险的注册用户年龄须在18周岁以上。使用非中国居民身份证注册的用户如购买铁路乘意险，须在我的
          <a href="#">12306—个人信息</a> 
          如实填写"出生日期"。
        </li>
        <li className="tip-item">
          父母为未成年子女投保，须在我的
          <a href="#">乘车人</a> 
          登记未成年子女的有效身份证件信息。
        </li>
        <li className="tip-item">
          未尽事宜详见《<a href="#">铁路旅客运输规程</a>》等有关规定和车站公告。
        </li>
      </ol>
    </div>
  );
};

export default WarmTips;
