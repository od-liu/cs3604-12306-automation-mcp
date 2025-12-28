/**
 * @test UI-TOP-NAV
 * @description 顶部导航组件测试
 * @requirement REQ-TOP-NAV
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TopNavigation from '../../src/components/TopNavigation';

describe('TopNavigation Component', () => {
  it('应该渲染顶部导航容器', () => {
    render(<TopNavigation />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('top-navigation-header');
  });

  it('应该显示12306 Logo', () => {
    render(<TopNavigation />);
    const logo = screen.getByAltText(/12306.*[Ll]ogo/i) || screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  it('应该显示欢迎文字"欢迎登录12306"', () => {
    render(<TopNavigation />);
    const welcomeText = screen.getByText(/欢迎登录12306/i);
    expect(welcomeText).toBeInTheDocument();
    expect(welcomeText).toHaveClass('top-navigation-welcome-text');
  });

  it('Logo应该可以点击', () => {
    const onLogoClick = vi.fn();
    render(<TopNavigation onLogoClick={onLogoClick} />);
    const logo = screen.getByRole('link') || screen.getByTestId('logo-link');
    logo.click();
    expect(onLogoClick).toHaveBeenCalledTimes(1);
  });

  it('应该有正确的样式类名', () => {
    render(<TopNavigation />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('top-navigation-header');
  });
});

