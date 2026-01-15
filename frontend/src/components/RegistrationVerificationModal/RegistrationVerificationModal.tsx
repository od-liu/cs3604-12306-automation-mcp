/**
 * Registration Verification Modal Component
 * 注册验证弹窗组件，用于手机验证
 */

import React, { useState } from 'react';
import './RegistrationVerificationModal.css';

interface RegistrationVerificationModalProps {
  phoneNumber: string;
  onClose: () => void;
  onComplete: (code: string) => void;
  onBack: () => void;
}

const RegistrationVerificationModal: React.FC<RegistrationVerificationModalProps> = ({
  phoneNumber,
  onClose,
  onComplete,
  onBack
}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  // 处理关闭按钮点击
  const handleClose = () => {
    if (isSuccess) {
      // 如果已成功，直接关闭
      onClose();
    } else {
      // 如果未成功，弹出确认对话框
      const confirmed = window.confirm('确定要关闭验证弹窗吗？关闭后需要重新提交注册信息。');
      if (confirmed) {
        onClose();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode) {
      setError('请输入验证码');
      return;
    }
    
    if (verificationCode.length !== 6) {
      setError('验证码应为6位数字');
      return;
    }

    // 调用 API-VERIFY-REGISTRATION-CODE
    setIsVerifying(true);
    setError('');
    try {
      const response = await fetch('/api/auth/verify-registration-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          code: verificationCode
        })
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        onComplete(verificationCode);
        // 2秒后自动跳转到登录页
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(result.message || '验证码错误');
        setVerificationCode('');
      }
    } catch (error) {
      console.error('验证失败:', error);
      setError('网络错误，请稍后再试');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="reg-verification-modal-backdrop">
      <div className="reg-verification-modal">
        <div className="reg-verification-modal-header">
          <h3>手机验证</h3>
          <button className="close-button" onClick={handleClose} aria-label="关闭">
            ×
          </button>
        </div>
        
        <div className="reg-verification-modal-content">
          {isSuccess ? (
            // 成功状态UI
            <div className="success-content">
              <div className="success-icon">
                <div className="success-circle">✓</div>
              </div>
              <p className="success-message">恭喜您注册成功！正在跳转登录页...</p>
            </div>
          ) : (
            // 普通状态UI
            <>
              <p className="verification-message">
                验证码已发送至{phoneNumber}
              </p>
              
              <form className="verification-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label className="form-label">验证码：</label>
                  <div className="input-wrapper">
                    <input 
                      type="text" 
                      className={`form-input ${error ? 'error' : ''}`}
                      maxLength={6}
                      placeholder="请输入6位验证码"
                      value={verificationCode}
                      onChange={(e) => {
                        setVerificationCode(e.target.value);
                        setError('');
                      }}
                    />
                    {error && <div className="error-message">{error}</div>}
                  </div>
                </div>
                
                <div className="button-group">
                  <button type="submit" className="complete-button" disabled={isVerifying}>
                    {isVerifying ? '验证中...' : '完成注册'}
                  </button>
                  <button type="button" className="back-button" onClick={onBack} disabled={isVerifying}>
                    返回修改
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationVerificationModal;
