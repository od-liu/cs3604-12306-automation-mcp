import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../../src/components/LoginForm/LoginForm';

describe('LoginForm Component', () => {
  beforeEach(() => {
    // 清除所有mock
    vi.restoreAllMocks();
  });

  /**
   * SCENARIO-001: 校验用户名为空
   * @given 用户在登录页面未输入用户名或手机号或邮箱
   * @when 用户点击"立即登录"
   * @then 显示错误提示"请输入用户名！"
   */
  it('should show error when username is empty', async () => {
    render(<LoginForm />);
    
    const loginButton = screen.getByText('立即登录');
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      const errorMessage = screen.getByText('请输入用户名！');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  /**
   * SCENARIO-002: 校验密码为空
   * @given 用户在登录页面输入了用户名但未输入密码
   * @when 用户点击"立即登录"
   * @then 显示错误提示"请输入密码！"
   */
  it('should show error when password is empty', async () => {
    render(<LoginForm />);
    
    const usernameInput = screen.getByPlaceholderText('用户名/邮箱/手机号');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    
    const loginButton = screen.getByText('立即登录');
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      const errorMessage = screen.getByText('请输入密码！');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  /**
   * SCENARIO-003: 校验密码长度
   * @given 用户在登录页面输入了用户名和小于6位的密码
   * @when 用户点击"立即登录"
   * @then 显示错误提示"密码长度不能少于6位！"
   */
  it('should show error when password length is less than 6', async () => {
    render(<LoginForm />);
    
    const usernameInput = screen.getByPlaceholderText('用户名/邮箱/手机号');
    const passwordInput = screen.getByPlaceholderText('密码');
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    
    const loginButton = screen.getByText('立即登录');
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      const errorMessage = screen.getByText('密码长度不能少于6位！');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  /**
   * 测试登录成功场景
   */
  it('should call onLoginSuccess when login is successful', async () => {
    // Mock fetch API
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          success: true,
          requireSms: true,
          userId: 1
        }),
      } as Response)
    );

    const mockOnLoginSuccess = vi.fn();
    render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
    
    const usernameInput = screen.getByPlaceholderText('用户名/邮箱/手机号');
    const passwordInput = screen.getByPlaceholderText('密码');
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'test123456' } });
    
    const loginButton = screen.getByText('立即登录');
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(mockOnLoginSuccess).toHaveBeenCalledWith({
        success: true,
        requireSms: true,
        userId: 1
      });
    });
  });

  /**
   * 测试登录失败场景
   */
  it('should show error message when login fails', async () => {
    // Mock fetch API
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          success: false,
          message: '用户名或密码错误！'
        }),
      } as Response)
    );

    render(<LoginForm />);
    
    const usernameInput = screen.getByPlaceholderText('用户名/邮箱/手机号');
    const passwordInput = screen.getByPlaceholderText('密码');
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    
    const loginButton = screen.getByText('立即登录');
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      const errorMessage = screen.getByText('用户名或密码错误！');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  /**
   * 测试Tab切换功能
   */
  it('should switch between account and qrcode login modes', () => {
    render(<LoginForm />);
    
    const accountTab = screen.getByText('账号登录');
    const qrcodeTab = screen.getByText('扫码登录');
    
    // 默认是账号登录模式
    expect(screen.getByPlaceholderText('用户名/邮箱/手机号')).toBeInTheDocument();
    
    // 切换到扫码登录
    fireEvent.click(qrcodeTab);
    expect(screen.getByText('请使用12306手机客户端扫码登录')).toBeInTheDocument();
    
    // 切换回账号登录
    fireEvent.click(accountTab);
    expect(screen.getByPlaceholderText('用户名/邮箱/手机号')).toBeInTheDocument();
  });
});

