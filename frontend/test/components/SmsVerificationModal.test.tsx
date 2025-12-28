import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SmsVerificationModal from '../../src/components/SmsVerificationModal/SmsVerificationModal';

describe('SmsVerificationModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
    mockOnClose.mockClear();
    mockOnSuccess.mockClear();
  });

  /**
   * SCENARIO-001: 校验证件号为空
   * @given 用户在短信验证弹窗中未输入证件号
   * @when 用户点击"确定"
   * @then 显示错误提示
   */
  it('should show error when id card is empty on confirm', async () => {
    render(
      <SmsVerificationModal 
        visible={true}
        userId={1}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );
    
    const confirmButton = screen.getByText('确定');
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      // 应该显示错误提示
      const errorElements = screen.queryAllByText(/请输入/i);
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  /**
   * SCENARIO-002: 校验证件号错误
   * @given 用户输入错误的证件号后4位
   * @when 用户点击"获取验证码"
   * @then 显示错误提示"请输入正确的用户信息!"
   */
  it('should show error when id card is incorrect', async () => {
    // Mock fetch API - 返回错误
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          success: false,
          message: '请输入正确的用户信息!'
        }),
      } as Response)
    );

    render(
      <SmsVerificationModal 
        visible={true}
        userId={1}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );
    
    const idCardInput = screen.getByPlaceholderText('请输入登录账号绑定的证件号后4位');
    fireEvent.change(idCardInput, { target: { value: '9999' } });
    
    const getCodeButton = screen.getByText('获取验证码');
    fireEvent.click(getCodeButton);
    
    await waitFor(() => {
      const errorMessage = screen.getByText('请输入正确的用户信息!');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  /**
   * SCENARIO-003: 获取验证码成功
   * @given 用户输入正确的证件号后4位
   * @when 用户点击"获取验证码"
   * @then 显示成功提示"获取手机验证码成功！"
   */
  it('should show success message when code is sent successfully', async () => {
    // Mock fetch API - 返回成功
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          success: true,
          message: '获取手机验证码成功！'
        }),
      } as Response)
    );

    render(
      <SmsVerificationModal 
        visible={true}
        userId={1}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );
    
    const idCardInput = screen.getByPlaceholderText('请输入登录账号绑定的证件号后4位');
    fireEvent.change(idCardInput, { target: { value: '1234' } });
    
    const getCodeButton = screen.getByText('获取验证码');
    fireEvent.click(getCodeButton);
    
    await waitFor(() => {
      const successMessage = screen.getByText('获取手机验证码成功！');
      expect(successMessage).toBeInTheDocument();
    });
  });

  /**
   * SCENARIO-004: 验证码倒计时
   * @given 用户成功获取验证码
   * @when 系统开始倒计时
   * @then "获取验证码"按钮显示为"重新发送(XX)"，XX从60倒数到0，按钮禁用
   */
  it('should show countdown after getting verification code', async () => {
    // Mock fetch API
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          success: true,
          message: '获取手机验证码成功！'
        }),
      } as Response)
    );

    render(
      <SmsVerificationModal 
        visible={true}
        userId={1}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );
    
    const idCardInput = screen.getByPlaceholderText('请输入登录账号绑定的证件号后4位');
    fireEvent.change(idCardInput, { target: { value: '1234' } });
    
    const getCodeButton = screen.getByText('获取验证码');
    fireEvent.click(getCodeButton);
    
    await waitFor(() => {
      // 应该显示倒计时文字
      const countdownButton = screen.getByText(/重新发送\(\d+\)/);
      expect(countdownButton).toBeInTheDocument();
    });
  });

  /**
   * 测试关闭弹窗
   */
  it('should call onClose when close button is clicked', () => {
    render(
      <SmsVerificationModal 
        visible={true}
        userId={1}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );
    
    const closeButton = screen.getByTitle('关闭');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  /**
   * 测试不可见状态
   */
  it('should not render when visible is false', () => {
    const { container } = render(
      <SmsVerificationModal 
        visible={false}
        userId={1}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });
});

