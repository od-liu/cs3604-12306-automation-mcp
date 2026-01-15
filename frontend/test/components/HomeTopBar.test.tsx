/**
 * HomeTopBar Component Tests
 * REQ-HOME-TOP-NAV: 首页顶部导航栏测试
 * 
 * 测试覆盖所有 11 个 scenarios：
 * 1. 用户未登录点击登录按钮且系统响应
 * 2. 用户未登录点击登录按钮但系统未响应
 * 3. 用户未注册点击注册按钮且系统响应
 * 4. 用户未注册点击注册按钮但系统未响应
 * 5. 用户已登录12306账号
 * 6. 已登录用户点击个人中心且系统响应
 * 7. 已登录用户点击个人中心但系统未响应
 * 8. 未登录用户点击个人中心且系统响应
 * 9. 未登录用户点击个人中心但系统未响应
 * 10. 用户点击车票查询入口且系统响应
 * 11. 用户点击车票查询入口但系统未响应
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomeTopBar from '../../src/components/HomeTopBar/HomeTopBar';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock window.alert
const mockAlert = vi.fn();
global.alert = mockAlert;

// Helper function to render component with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('UI-HOME-TOP-NAV: HomeTopBar Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockAlert.mockClear();
  });

  // ========== 基础渲染测试 ==========
  describe('基础渲染', () => {
    it('应该渲染顶部导航容器', () => {
      renderWithRouter(<HomeTopBar />);
      const container = document.querySelector('.home-top-bar-container');
      expect(container).toBeInTheDocument();
    });

    it('应该显示Logo图片', () => {
      renderWithRouter(<HomeTopBar />);
      const logo = screen.getByAltText('中国铁路12306');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/images/首页-顶部导航-Logo.png');
    });

    it('应该显示Logo中文文字"中国铁路12306"', () => {
      renderWithRouter(<HomeTopBar />);
      const chineseText = screen.getByText('中国铁路12306');
      expect(chineseText).toBeInTheDocument();
      expect(chineseText).toHaveClass('home-logo-chinese');
    });

    it('应该显示Logo英文文字"12306 CHINA RAILWAY"', () => {
      renderWithRouter(<HomeTopBar />);
      const englishText = screen.getByText('12306 CHINA RAILWAY');
      expect(englishText).toBeInTheDocument();
      expect(englishText).toHaveClass('home-logo-english');
    });

    it('应该显示搜索框', () => {
      renderWithRouter(<HomeTopBar />);
      const searchInput = screen.getByPlaceholderText('搜索车票、餐饮、常旅客、相关规章');
      expect(searchInput).toBeInTheDocument();
    });

    it('应该显示搜索按钮', () => {
      renderWithRouter(<HomeTopBar />);
      const searchButton = screen.getByAltText('搜索');
      expect(searchButton).toBeInTheDocument();
      expect(searchButton.closest('button')).toHaveClass('home-search-button');
    });

    it('应该显示所有主导航链接', () => {
      renderWithRouter(<HomeTopBar />);
      expect(screen.getByText('首页')).toBeInTheDocument();
      expect(screen.getByText('车票')).toBeInTheDocument();
      expect(screen.getByText('订单')).toBeInTheDocument();
    });

    it('应该显示所有辅助链接', () => {
      renderWithRouter(<HomeTopBar />);
      expect(screen.getByText('无障碍')).toBeInTheDocument();
      expect(screen.getByText('敬老版')).toBeInTheDocument();
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('我的12306')).toBeInTheDocument();
    });
  });

  // ========== Scenario 1: 用户未登录点击登录按钮且系统响应 ==========
  describe('Scenario 1: 用户未登录点击登录按钮且系统响应', () => {
    it('未登录时应该显示"登录"按钮', () => {
      renderWithRouter(<HomeTopBar isLoggedIn={false} />);
      const loginButton = screen.getByRole('button', { name: '登录' });
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toHaveClass('home-top-auth-link', 'login');
    });

    it('点击"登录"按钮应该跳转至登录页', async () => {
      renderWithRouter(<HomeTopBar isLoggedIn={false} />);
      const loginButton = screen.getByRole('button', { name: '登录' });
      
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      }, { timeout: 100 });
    });
  });

  // ========== Scenario 2: 用户未登录点击登录按钮但系统未响应 ==========
  describe('Scenario 2: 用户未登录点击登录按钮但系统未响应', () => {
    it('当navigate抛出错误时应该提示"登录失败，请稍后重试"', async () => {
      mockNavigate.mockImplementationOnce(() => {
        throw new Error('Navigation failed');
      });

      renderWithRouter(<HomeTopBar isLoggedIn={false} />);
      const loginButton = screen.getByRole('button', { name: '登录' });
      
      fireEvent.click(loginButton);
      
      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith('登录失败，请稍后重试');
      });
    });
  });

  // ========== Scenario 3: 用户未注册点击注册按钮且系统响应 ==========
  describe('Scenario 3: 用户未注册点击注册按钮且系统响应', () => {
    it('未登录时应该显示"注册"按钮', () => {
      renderWithRouter(<HomeTopBar isLoggedIn={false} />);
      const registerButton = screen.getByRole('button', { name: '注册' });
      expect(registerButton).toBeInTheDocument();
      expect(registerButton).toHaveClass('home-top-auth-link', 'register');
    });

    it('点击"注册"按钮应该跳转至注册页', async () => {
      renderWithRouter(<HomeTopBar isLoggedIn={false} />);
      const registerButton = screen.getByRole('button', { name: '注册' });
      
      fireEvent.click(registerButton);
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/register');
      }, { timeout: 100 });
    });
  });

  // ========== Scenario 4: 用户未注册点击注册按钮但系统未响应 ==========
  describe('Scenario 4: 用户未注册点击注册按钮但系统未响应', () => {
    it('当navigate抛出错误时应该提示"注册失败，请稍后重试"', async () => {
      mockNavigate.mockImplementationOnce(() => {
        throw new Error('Navigation failed');
      });

      renderWithRouter(<HomeTopBar isLoggedIn={false} />);
      const registerButton = screen.getByRole('button', { name: '注册' });
      
      fireEvent.click(registerButton);
      
      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith('注册失败，请稍后重试');
      });
    });
  });

  // ========== Scenario 5: 用户已登录12306账号 ==========
  describe('Scenario 5: 用户已登录12306账号', () => {
    it('已登录时不应该显示"登录"和"注册"按钮', () => {
      renderWithRouter(<HomeTopBar isLoggedIn={true} username="testuser" />);
      
      const loginButton = screen.queryByRole('button', { name: '登录' });
      const registerButton = screen.queryByRole('button', { name: '注册' });
      
      expect(loginButton).not.toBeInTheDocument();
      expect(registerButton).not.toBeInTheDocument();
    });

    it('已登录时应该显示用户名', () => {
      renderWithRouter(<HomeTopBar isLoggedIn={true} username="testuser" />);
      
      const usernameElement = screen.getByText('欢迎，testuser');
      expect(usernameElement).toBeInTheDocument();
      expect(usernameElement).toHaveClass('home-top-username');
    });

    it('已登录时应该显示"退出"按钮', () => {
      renderWithRouter(<HomeTopBar isLoggedIn={true} username="testuser" />);
      
      const logoutButton = screen.getByRole('button', { name: '退出' });
      expect(logoutButton).toBeInTheDocument();
      expect(logoutButton).toHaveClass('home-top-auth-link', 'logout');
    });
  });

  // ========== Scenario 6: 已登录用户点击个人中心且系统响应 ==========
  describe('Scenario 6: 已登录用户点击个人中心且系统响应', () => {
    it('已登录用户点击"我的12306"应该跳转至个人中心页', async () => {
      renderWithRouter(<HomeTopBar isLoggedIn={true} username="testuser" />);
      const myAccountLink = screen.getByText('我的12306');
      
      fireEvent.click(myAccountLink);
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/my-account');
      }, { timeout: 100 });
    });
  });

  // ========== Scenario 7: 已登录用户点击个人中心但系统未响应 ==========
  describe('Scenario 7: 已登录用户点击个人中心但系统未响应', () => {
    it('已登录用户点击个人中心时navigate失败应该提示"前往个人中心失败，请稍后重试"', async () => {
      mockNavigate.mockImplementationOnce(() => {
        throw new Error('Navigation failed');
      });

      renderWithRouter(<HomeTopBar isLoggedIn={true} username="testuser" />);
      const myAccountLink = screen.getByText('我的12306');
      
      fireEvent.click(myAccountLink);
      
      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith('前往个人中心失败，请稍后重试');
      });
    });
  });

  // ========== Scenario 8: 未登录用户点击个人中心且系统响应 ==========
  describe('Scenario 8: 未登录用户点击个人中心且系统响应', () => {
    it('未登录用户点击"我的12306"应该跳转至登录页', async () => {
      renderWithRouter(<HomeTopBar isLoggedIn={false} />);
      const myAccountLink = screen.getByText('我的12306');
      
      fireEvent.click(myAccountLink);
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      }, { timeout: 100 });
    });
  });

  // ========== Scenario 9: 未登录用户点击个人中心但系统未响应 ==========
  describe('Scenario 9: 未登录用户点击个人中心但系统未响应', () => {
    it('未登录用户点击个人中心时navigate失败应该提示"请先登录12306账号！"', async () => {
      mockNavigate.mockImplementationOnce(() => {
        throw new Error('Navigation failed');
      });

      renderWithRouter(<HomeTopBar isLoggedIn={false} />);
      const myAccountLink = screen.getByText('我的12306');
      
      fireEvent.click(myAccountLink);
      
      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith('请先登录12306账号！');
      });
    });
  });

  // ========== Scenario 10: 用户点击车票查询入口且系统响应 ==========
  describe('Scenario 10: 用户点击车票查询入口且系统响应', () => {
    it('应该显示"车票"导航链接', () => {
      renderWithRouter(<HomeTopBar />);
      const ticketLink = screen.getByText('车票');
      expect(ticketLink).toBeInTheDocument();
      expect(ticketLink).toHaveClass('home-top-link', 'home-nav-main');
    });

    it('点击"车票"链接应该跳转至车票查询页', async () => {
      renderWithRouter(<HomeTopBar />);
      const ticketLink = screen.getByText('车票');
      
      fireEvent.click(ticketLink);
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/ticket-query');
      }, { timeout: 100 });
    });
  });

  // ========== Scenario 11: 用户点击车票查询入口但系统未响应 ==========
  describe('Scenario 11: 用户点击车票查询入口但系统未响应', () => {
    it('当navigate抛出错误时应该提示"查询失败，请稍后重试"', async () => {
      mockNavigate.mockImplementationOnce(() => {
        throw new Error('Navigation failed');
      });

      renderWithRouter(<HomeTopBar />);
      const ticketLink = screen.getByText('车票');
      
      fireEvent.click(ticketLink);
      
      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith('查询失败，请稍后重试');
      });
    });
  });

  // ========== 附加功能测试 ==========
  describe('附加功能', () => {
    it('点击Logo应该返回首页', () => {
      renderWithRouter(<HomeTopBar />);
      const logoSection = document.querySelector('.home-logo-section');
      
      fireEvent.click(logoSection!);
      
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('点击"退出"按钮应该调用onLogout回调', () => {
      const mockLogout = vi.fn();
      renderWithRouter(<HomeTopBar isLoggedIn={true} username="testuser" onLogout={mockLogout} />);
      
      const logoutButton = screen.getByRole('button', { name: '退出' });
      fireEvent.click(logoutButton);
      
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    it('搜索框应该可以输入内容', () => {
      renderWithRouter(<HomeTopBar />);
      const searchInput = screen.getByPlaceholderText('搜索车票、餐饮、常旅客、相关规章') as HTMLInputElement;
      
      fireEvent.change(searchInput, { target: { value: '北京' } });
      
      expect(searchInput.value).toBe('北京');
    });

    it('点击搜索按钮时如果搜索框为空应该提示"请输入搜索关键词"', () => {
      renderWithRouter(<HomeTopBar />);
      const searchButton = document.querySelector('.home-search-button') as HTMLButtonElement;
      
      fireEvent.click(searchButton);
      
      expect(mockAlert).toHaveBeenCalledWith('请输入搜索关键词');
    });

    it('点击搜索按钮时如果有搜索内容应该显示搜索暂未实现提示', () => {
      renderWithRouter(<HomeTopBar />);
      const searchInput = screen.getByPlaceholderText('搜索车票、餐饮、常旅客、相关规章') as HTMLInputElement;
      const searchButton = document.querySelector('.home-search-button') as HTMLButtonElement;
      
      fireEvent.change(searchInput, { target: { value: '北京' } });
      fireEvent.click(searchButton);
      
      expect(mockAlert).toHaveBeenCalledWith('搜索功能暂未实现，搜索内容: 北京');
    });

    it('在搜索框按Enter键应该触发搜索', () => {
      renderWithRouter(<HomeTopBar />);
      const searchInput = screen.getByPlaceholderText('搜索车票、餐饮、常旅客、相关规章') as HTMLInputElement;
      
      fireEvent.change(searchInput, { target: { value: '北京' } });
      fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });
      
      expect(mockAlert).toHaveBeenCalledWith('搜索功能暂未实现，搜索内容: 北京');
    });
  });

  // ========== CSS 类名验证 ==========
  describe('CSS 类名验证', () => {
    it('容器应该有正确的类名', () => {
      renderWithRouter(<HomeTopBar />);
      const container = document.querySelector('.home-top-bar-container');
      expect(container).toHaveClass('home-top-bar-container');
    });

    it('Logo区域应该有正确的类名', () => {
      renderWithRouter(<HomeTopBar />);
      const logoSection = document.querySelector('.home-logo-section');
      expect(logoSection).toHaveClass('home-logo-section');
    });

    it('搜索框容器应该有正确的类名', () => {
      renderWithRouter(<HomeTopBar />);
      const searchBox = document.querySelector('.home-search-box');
      expect(searchBox).toHaveClass('home-search-box');
    });

    it('顶部链接容器应该有正确的类名', () => {
      renderWithRouter(<HomeTopBar />);
      const topLinks = document.querySelector('.home-top-links');
      expect(topLinks).toHaveClass('home-top-links');
    });
  });
});
