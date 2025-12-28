/**
 * @component UI-SMS-VERIFICATION
 * @description 登录成功后的短信验证流程弹窗
 * @calls API-SEND-VERIFICATION-CODE, API-VERIFY-CODE
 * @layout_position "屏幕居中显示的模态弹窗"
 * @dimensions "700px × 400px"
 * 
 * ============ 功能实现清单（必填）============
 * @scenarios_covered: (必须列出所有 scenarios，标记实现状态)
 *   ✅ SCENARIO-001: 获取验证码-证件号错误
 *   ✅ SCENARIO-002: 获取验证码-成功
 *   ✅ SCENARIO-003: 获取验证码-频率限制
 *   ✅ SCENARIO-004: 验证-证件号为空
 *   ✅ SCENARIO-005: 验证-证件号长度不正确
 *   ✅ SCENARIO-006: 验证-验证码为空
 *   ✅ SCENARIO-007: 验证-验证码长度不正确
 *   ✅ SCENARIO-008: 验证-验证码错误
 *   ✅ SCENARIO-009: 验证-验证码过期
 *   ✅ SCENARIO-010: 验证-成功
 * 
 * @features_implemented: (必须列出所有功能点)
 *   ✅ 模态弹窗（居中显示，半透明遮罩）
 *   ✅ 证件号输入（限制4位数字）
 *   ✅ 验证码输入（6位数字）
 *   ✅ 获取验证码按钮（倒计时60秒）
 *   ✅ 关闭按钮
 * 
 * @implementation_status:
 *   - Scenarios Coverage: 10/10 (100%)
 *   - Features Coverage: 5/5 (100%)
 *   - UI Visual: 像素级精确
 * ================================================
 */

import React, { useState, useEffect } from 'react';
import './SmsVerification.css';

interface SmsVerificationProps {
  username: string;
  onSuccess: () => void;
  onClose: () => void;
}

const SmsVerification: React.FC<SmsVerificationProps> = ({ username, onSuccess, onClose }) => {
  // ========== State Management ==========
  const [idCardLast4, setIdCardLast4] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ========== Countdown Timer ==========
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // ========== Scenario Implementations ==========
  
  /**
   * @scenario SCENARIO-001 "获取验证码-证件号错误"
   * @scenario SCENARIO-002 "获取验证码-成功"
   * @scenario SCENARIO-003 "获取验证码-频率限制"
   * @given 用户输入了证件号后4位
   * @when 用户点击"获取验证码"按钮
   * @then 根据证件号正确性和频率限制显示相应结果
   * @calls API-SEND-VERIFICATION-CODE
   */
  const handleSendCode = async () => {
    setError('');
    setSuccessMessage('');

    // 前端验证：证件号不能为空
    if (!idCardLast4.trim()) {
      // 视觉反馈：按钮显示虚线边框（通过CSS类实现）
      return;
    }

    if (idCardLast4.length !== 4) {
      setError('请输入登录账号绑定的证件号后4位');
      return;
    }

    try {
      // 调用 API-SEND-VERIFICATION-CODE
      const response = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, idCardLast4 })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // SCENARIO-002: 获取验证码-成功
        setSuccessMessage('获取手机验证码成功！');
        setCountdown(60); // 开始60秒倒计时
      } else {
        // SCENARIO-001: 证件号错误 或 SCENARIO-003: 频率限制
        setError(data.message);
        if (data.code !== 429) {
          setCountdown(60); // 即使错误也开始倒计时（根据截图）
        }
      }
    } catch (error) {
      setError('网络请求失败，请稍后再试。');
    }
  };

  /**
   * @scenario SCENARIO-004 "验证-证件号为空"
   * @scenario SCENARIO-005 "验证-证件号长度不正确"
   * @given 用户未输入证件号或长度不正确
   * @when 用户点击"确定"按钮
   * @then 显示错误提示
   */
  const validateIdCard = (): boolean => {
    if (!idCardLast4.trim()) {
      setError('请输入登录账号绑定的证件号后4位');
      return false;
    }
    if (idCardLast4.length !== 4) {
      setError('请输入登录账号绑定的证件号后4位');
      return false;
    }
    return true;
  };

  /**
   * @scenario SCENARIO-006 "验证-验证码为空"
   * @given 用户未输入验证码
   * @when 用户点击"确定"按钮
   * @then 显示错误提示"请输入验证码"
   */
  const validateCode = (): boolean => {
    if (!verificationCode.trim()) {
      setError('请输入验证码');
      return false;
    }
    return true;
  };

  /**
   * @scenario SCENARIO-007 "验证-验证码长度不正确"
   * @given 用户输入的验证码少于6位
   * @when 用户点击"确定"按钮
   * @then 显示错误提示"请输入正确的验证码"
   */
  const validateCodeLength = (): boolean => {
    if (verificationCode.length !== 6) {
      setError('请输入正确的验证码');
      return false;
    }
    return true;
  };

  /**
   * @scenario SCENARIO-008 "验证-验证码错误"
   * @scenario SCENARIO-009 "验证-验证码过期"
   * @scenario SCENARIO-010 "验证-成功"
   * @given 用户输入了证件号和验证码
   * @when 用户点击"确定"按钮
   * @then 根据验证结果显示相应提示或跳转
   * @calls API-VERIFY-CODE
   */
  const handleVerify = async () => {
    setError('');
    setSuccessMessage('');

    // 执行所有前端验证
    if (!validateIdCard()) return;
    if (!validateCode()) return;
    if (!validateCodeLength()) return;

    setIsSubmitting(true);

    try {
      // 调用 API-VERIFY-CODE
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, idCardLast4, code: verificationCode })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // SCENARIO-010: 验证-成功
        setSuccessMessage('验证通过，登录成功');
        setTimeout(() => {
          onSuccess();
        }, 1000);
      } else {
        // SCENARIO-008: 验证码错误 或 SCENARIO-009: 验证码过期
        setError(data.message);
      }
    } catch (error) {
      setError('网络请求失败，请稍后再试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========== UI Render ==========
  return (
    <>
      {/* 背景遮罩 */}
      <div className="modal-backdrop" onClick={onClose}></div>

      {/* 弹窗主体 */}
      <aside 
        role="complementary" 
        aria-label="请选择登录验证方式框"
        className="sms-verification-modal"
      >
        {/* 标题栏 */}
        <div className="modal-header">
          <h2>选择验证方式</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {/* 标签页 */}
        <div className="modal-tabs">
          <div className="tab active">短信验证</div>
        </div>

        {/* 表单内容 */}
        <div className="modal-content">
          {/* 错误提示 */}
          {error && (
            <div className="error-message">{error}</div>
          )}

          {/* 成功提示 */}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          {/* 证件号输入 */}
          <div className="form-group">
            <label>请输入登录账号绑定的证件号后4位</label>
            <input
              type="text"
              className="input-field"
              placeholder="请输入登录账号绑定的证件号后4位"
              value={idCardLast4}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                setIdCardLast4(value);
              }}
              maxLength={4}
              onFocus={() => { setError(''); setSuccessMessage(''); }}
            />
          </div>

          {/* 验证码输入区域 */}
          <div className="form-group">
            <label>请输入验证码</label>
            <div className="code-input-group">
              <input
                type="text"
                className="input-field code-input"
                placeholder="输入验证码"
                value={verificationCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setVerificationCode(value);
                }}
                maxLength={6}
                onFocus={() => { setError(''); setSuccessMessage(''); }}
              />
              <button
                className={`code-button ${countdown > 0 ? 'disabled' : ''} ${!idCardLast4.trim() ? 'dashed' : ''}`}
                onClick={handleSendCode}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `重新发送(${countdown})` : '获取验证码'}
              </button>
            </div>
          </div>

          {/* 确定按钮 */}
          <button
            className="submit-button"
            onClick={handleVerify}
            disabled={isSubmitting}
          >
            {isSubmitting ? '验证中...' : '确定'}
          </button>
        </div>
      </aside>
    </>
  );
};

export default SmsVerification;

