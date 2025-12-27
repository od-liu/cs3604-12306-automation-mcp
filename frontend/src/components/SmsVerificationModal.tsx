/**
 * @component UI-SMS-VERIFICATION
 * @description 短信验证弹窗，登录成功后验证用户身份
 * @calls API-SEND-SMS - 发送短信验证码
 * @calls API-VERIFY-SMS - 验证短信验证码
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
 *   ✅ 证件号后4位输入
 *   ✅ 验证码输入
 *   ✅ 获取验证码按钮（含60秒倒计时）
 *   ✅ 错误和成功提示显示
 *   ✅ 关闭弹窗（X按钮、遮罩层、ESC键）
 *   ✅ 验证成功后跳转个人中心
 * 
 * @implementation_status:
 *   - Scenarios Coverage: 10/10 (100%)
 *   - Features Coverage: 6/6 (100%)
 *   - UI Visual: 像素级精确
 * 
 * @layout_position "屏幕居中，fixed定位，z-index: 1000"
 * @dimensions "宽度700px，高度auto"
 * ================================================
 */

import React, { useState, useEffect } from 'react';
import './SmsVerificationModal.css';

interface SmsVerificationModalProps {
  userId: number;
  onClose: () => void;
  onVerifySuccess: () => void;
}

const SmsVerificationModal: React.FC<SmsVerificationModalProps> = ({
  userId,
  onClose,
  onVerifySuccess
}) => {
  // ========== State Management ==========
  const [idNumber, setIdNumber] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);

  // ========== Countdown Timer ==========
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // ========== ESC Key Handler ==========
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // ========== Validation Helpers ==========
  
  /**
   * @scenario SCENARIO-004 "验证-证件号为空"
   * @given 用户未输入证件号后4位
   * @when 用户点击"确定"按钮
   * @then 显示错误提示"请输入登录账号绑定的证件号后4位"
   */
  const validateIdNumberEmpty = (): boolean => {
    if (!idNumber.trim()) {
      setErrorMessage('请输入登录账号绑定的证件号后4位');
      setSuccessMessage('');
      return false;
    }
    return true;
  };

  /**
   * @scenario SCENARIO-005 "验证-证件号长度不正确"
   * @given 用户输入的证件号后4位长度不为4位
   * @when 用户点击"确定"按钮
   * @then 显示错误提示"请输入登录账号绑定的证件号后4位"
   */
  const validateIdNumberLength = (): boolean => {
    if (idNumber.length !== 4) {
      setErrorMessage('请输入登录账号绑定的证件号后4位');
      setSuccessMessage('');
      return false;
    }
    return true;
  };

  /**
   * @scenario SCENARIO-006 "验证-验证码为空"
   * @given 用户输入了正确的证件号后4位但未输入验证码
   * @when 用户点击"确定"按钮
   * @then 显示错误提示"请输入验证码"
   */
  const validateSmsCodeEmpty = (): boolean => {
    if (!smsCode.trim()) {
      setErrorMessage('请输入验证码');
      setSuccessMessage('');
      return false;
    }
    return true;
  };

  /**
   * @scenario SCENARIO-007 "验证-验证码长度不正确"
   * @given 用户输入了正确的证件号后4位但验证码少于6位
   * @when 用户点击"确定"按钮
   * @then 显示错误提示"请输入正确的验证码"
   */
  const validateSmsCodeLength = (): boolean => {
    if (smsCode.length < 6) {
      setErrorMessage('请输入正确的验证码');
      setSuccessMessage('');
      return false;
    }
    return true;
  };

  // ========== API Handlers ==========
  
  /**
   * @scenario SCENARIO-001 "获取验证码-证件号错误"
   * @scenario SCENARIO-002 "获取验证码-成功"
   * @scenario SCENARIO-003 "获取验证码-频率限制"
   * @calls API-SEND-SMS
   */
  const handleGetSmsCode = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    // 基础验证
    if (!validateIdNumberEmpty()) return;
    if (!validateIdNumberLength()) return;

    // SCENARIO-003: 频率限制检查
    if (countdown > 0) {
      setErrorMessage('请求验证码过于频繁，请稍后再试！');
      return;
    }

    setLoading(true);

    try {
      // @calls API-SEND-SMS - 调用发送验证码API
      const response = await fetch('/api/auth/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, idNumber })
      });

      const data = await response.json();

      // 无论成功失败，都启动倒计时（按照需求）
      setCountdown(60);

      if (data.success) {
        // SCENARIO-002: 获取验证码成功
        setSuccessMessage('获取手机验证码成功！');
        setErrorMessage('');
        console.log('SMS Code sent:', data.code); // 输出到控制台
      } else {
        // SCENARIO-001: 证件号错误
        setErrorMessage(data.message || '请输入正确的用户信息！');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('网络请求失败，请稍后再试。');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  /**
   * @scenario SCENARIO-008 "验证-验证码错误"
   * @scenario SCENARIO-009 "验证-验证码过期"
   * @scenario SCENARIO-010 "验证-成功"
   * @calls API-VERIFY-SMS
   */
  const handleVerify = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    // 执行所有客户端验证（SCENARIO-004, 005, 006, 007）
    if (!validateIdNumberEmpty()) return;
    if (!validateIdNumberLength()) return;
    if (!validateSmsCodeEmpty()) return;
    if (!validateSmsCodeLength()) return;

    setLoading(true);

    try {
      // @calls API-VERIFY-SMS - 调用验证API
      const response = await fetch('/api/auth/verify-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, idNumber, smsCode })
      });

      const data = await response.json();

      if (data.success) {
        // SCENARIO-010: 验证成功
        setSuccessMessage('验证成功！');
        setErrorMessage('');
        // 触发成功回调，跳转到个人中心
        setTimeout(() => {
          onVerifySuccess();
        }, 1000);
      } else {
        // SCENARIO-008: 验证码错误 或 SCENARIO-009: 验证码过期
        if (data.message.includes('过期')) {
          setErrorMessage('验证码已过期');
        } else if (data.message.includes('有误')) {
          setErrorMessage('很抱歉，您输入的短信验证码有误。');
        } else {
          setErrorMessage(data.message || '验证失败');
        }
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('网络请求失败，请稍后再试。');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  // ========== UI Render ==========
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="sms-verification-modal" onClick={(e) => e.stopPropagation()}>
        {/* 弹窗标题栏 */}
        <div className="sms-verification-modal-header">
          <h2 className="sms-verification-modal-title">选择验证方式</h2>
          <button className="sms-verification-modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {/* 验证方式标题 */}
        <h3 className="sms-verification-title">短信验证</h3>

        {/* 证件号输入框 */}
        <input
          type="text"
          className="sms-verification-id-input"
          placeholder="请输入登录账号绑定的证件号后4位"
          value={idNumber}
          onChange={(e) => {
            setIdNumber(e.target.value);
            setErrorMessage('');
            setSuccessMessage('');
          }}
          maxLength={4}
        />

        {/* 验证码输入区域 */}
        <div className="sms-verification-code-row">
          <input
            type="text"
            className="sms-verification-code-input"
            placeholder="输入验证码"
            value={smsCode}
            onChange={(e) => {
              setSmsCode(e.target.value);
              setErrorMessage('');
              setSuccessMessage('');
            }}
            maxLength={6}
          />
          <button
            className="sms-verification-get-code-button"
            onClick={handleGetSmsCode}
            disabled={countdown > 0 || loading}
          >
            {countdown > 0 ? `重新发送(${countdown})` : '获取验证码'}
          </button>
        </div>

        {/* 错误提示 */}
        {errorMessage && (
          <div className="sms-verification-message-box sms-verification-error-message-box">
            {errorMessage}
          </div>
        )}

        {/* 成功提示 */}
        {successMessage && (
          <div className="sms-verification-message-box sms-verification-success-message-box">
            {successMessage}
          </div>
        )}

        {/* 确定按钮 */}
        <button
          className="sms-verification-confirm-button"
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? '验证中...' : '确定'}
        </button>
      </div>
    </div>
  );
};

export default SmsVerificationModal;
