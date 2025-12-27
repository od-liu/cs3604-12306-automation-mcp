/**
 * TopNavigation 组件测试
 * 测试顶部导航栏的功能和渲染
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TopNavigation from '../../src/components/TopNavigation';

describe('TopNavigation', () => {
  it('应该渲染品牌Logo图片', () => {
    render(<TopNavigation />);
    const logoImg = screen.getByAltText('中国铁路Logo');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', '/images/登录页-顶部导航区域-中国铁路Logo.png');
  });

  it('应该显示品牌名称"中国铁路12306"', () => {
    render(<TopNavigation />);
    const brandName = screen.getByText('中国铁路12306');
    expect(brandName).toBeInTheDocument();
  });

  it('应该显示副标题"12306 CHINA RAILWAY"', () => {
    render(<TopNavigation />);
    const subtitle = screen.getByText('12306 CHINA RAILWAY');
    expect(subtitle).toBeInTheDocument();
  });

  it('应该显示欢迎文字"欢迎登录12306"', () => {
    render(<TopNavigation />);
    const welcomeText = screen.getByText('欢迎登录12306');
    expect(welcomeText).toBeInTheDocument();
  });

  it('Logo应该可以点击', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<TopNavigation />);
    const logoImg = screen.getByAltText('中国铁路Logo');
    
    // 点击Logo
    logoImg.click();
    
    // 验证点击事件被触发（当前实现是console.log）
    expect(consoleSpy).toHaveBeenCalledWith('Navigate to home page');
    
    consoleSpy.mockRestore();
  });

  it('应该应用正确的CSS类名', () => {
    const { container } = render(<TopNavigation />);
    const nav = container.querySelector('.top-navigation');
    expect(nav).toBeInTheDocument();
    
    const logoSection = container.querySelector('.top-navigation-logo-section');
    expect(logoSection).toBeInTheDocument();
    
    const welcome = container.querySelector('.top-navigation-welcome');
    expect(welcome).toBeInTheDocument();
  });
});


