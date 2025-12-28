/**
 * @test UI-BOTTOM-NAV
 * @description 底部导航组件测试
 * @requirement REQ-BOTTOM-NAV
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BottomNavigation from '../../src/components/BottomNavigation';

describe('BottomNavigation Component', () => {
  it('应该渲染底部导航容器', () => {
    render(<BottomNavigation />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('bottom-navigation-footer');
  });

  it('应该显示"友情链接"标题', () => {
    render(<BottomNavigation />);
    const title = screen.getByText(/友情链接/i);
    expect(title).toBeInTheDocument();
  });

  it('应该显示4个合作伙伴Logo', () => {
    render(<BottomNavigation />);
    // 中国国家铁路集团
    const logo1 = screen.getByAltText(/中国国家铁路集团/i);
    expect(logo1).toBeInTheDocument();
    
    // 中国铁路财产保险
    const logo2 = screen.getByAltText(/中国铁路财产保险/i);
    expect(logo2).toBeInTheDocument();
    
    // 中国铁路95306网
    const logo3 = screen.getByAltText(/中国铁路95306网/i);
    expect(logo3).toBeInTheDocument();
    
    // 中铁快运
    const logo4 = screen.getByAltText(/中铁快运/i);
    expect(logo4).toBeInTheDocument();
  });

  it('应该显示4个二维码', () => {
    render(<BottomNavigation />);
    // 中国铁路官方微信
    const qr1 = screen.getByAltText(/中国铁路官方微信/i);
    expect(qr1).toBeInTheDocument();
    
    // 中国铁路官方微博
    const qr2 = screen.getByAltText(/中国铁路官方微博/i);
    expect(qr2).toBeInTheDocument();
    
    // 12306公众号
    const qr3 = screen.getByAltText(/12306.*公众号/i);
    expect(qr3).toBeInTheDocument();
    
    // 铁路12306
    const qr4 = screen.getByAltText(/铁路12306/i);
    expect(qr4).toBeInTheDocument();
  });

  it('应该显示版权信息', () => {
    render(<BottomNavigation />);
    const copyright = screen.getByText(/版权所有.*中国铁道科学研究院/i);
    expect(copyright).toBeInTheDocument();
  });

  it('应该显示备案信息', () => {
    render(<BottomNavigation />);
    const icp = screen.getByText(/京ICP备/i);
    expect(icp).toBeInTheDocument();
  });
});

