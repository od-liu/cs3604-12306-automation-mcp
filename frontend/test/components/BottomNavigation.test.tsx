/**
 * BottomNavigation 组件测试
 * 测试底部导航栏的功能和渲染
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BottomNavigation from '../../src/components/BottomNavigation';

describe('BottomNavigation', () => {
  it('应该渲染友情链接标题', () => {
    render(<BottomNavigation />);
    const title = screen.getByText('友情链接');
    expect(title).toBeInTheDocument();
  });

  it('应该渲染友情链接图片', () => {
    render(<BottomNavigation />);
    const image = screen.getByAltText('友情链接');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/友情链接.png');
  });

  it('应该渲染4个二维码', () => {
    render(<BottomNavigation />);
    
    const wechatQr = screen.getByAltText('中国铁路官方微信二维码');
    expect(wechatQr).toBeInTheDocument();
    expect(wechatQr).toHaveAttribute('src', '/images/中国铁路官方微信二维码.png');
    
    const weiboQr = screen.getByAltText('中国铁路官方微博二维码');
    expect(weiboQr).toBeInTheDocument();
    expect(weiboQr).toHaveAttribute('src', '/images/中国铁路官方微博二维码.png');
    
    const officialAccountQr = screen.getByAltText('12306公众号二维码');
    expect(officialAccountQr).toBeInTheDocument();
    expect(officialAccountQr).toHaveAttribute('src', '/images/12306公众号二维码.png');
    
    const appQr = screen.getByAltText('铁路12306二维码');
    expect(appQr).toBeInTheDocument();
    expect(appQr).toHaveAttribute('src', '/images/铁路12306二维码.png');
  });

  it('应该渲染二维码标题', () => {
    render(<BottomNavigation />);
    expect(screen.getByText('中国铁路官方微信')).toBeInTheDocument();
    expect(screen.getByText('中国铁路官方微博')).toBeInTheDocument();
    expect(screen.getByText('12306 公众号')).toBeInTheDocument();
    expect(screen.getByText('铁路12306')).toBeInTheDocument();
  });

  it('应该渲染免责声明文字', () => {
    render(<BottomNavigation />);
    const disclaimer = screen.getByText(/官方APP下载/);
    expect(disclaimer).toBeInTheDocument();
  });

  it('应该应用正确的CSS类名', () => {
    const { container } = render(<BottomNavigation />);
    const nav = container.querySelector('.bottom-navigation');
    expect(nav).toBeInTheDocument();
    
    const partnerSection = container.querySelector('.bottom-navigation-partner-links-section');
    expect(partnerSection).toBeInTheDocument();
    
    const qrcodeSection = container.querySelector('.bottom-navigation-qrcode-section');
    expect(qrcodeSection).toBeInTheDocument();
  });
});


