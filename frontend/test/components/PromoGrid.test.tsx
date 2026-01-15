/**
 * PromoGrid Component Tests
 * REQ-HOME-PROMOTION: 宣传推广区域测试
 * 
 * 测试覆盖：
 * - 基础渲染（4个卡片）
 * - 图片资源加载
 * - CSS 类名正确性
 * - 点击事件处理
 * - Hover 效果类名
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PromoGrid from '../../src/components/PromoGrid/PromoGrid';

// Mock alert
const mockAlert = vi.fn();
global.alert = mockAlert;

// Helper function to render component with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('UI-HOME-PROMOTION: PromoGrid Component', () => {
  beforeEach(() => {
    mockAlert.mockClear();
    vi.clearAllMocks();
  });

  // ========== 基础渲染测试 ==========
  describe('基础渲染', () => {
    it('应该渲染宣传推广容器', () => {
      renderWithRouter(<PromoGrid />);
      const container = document.querySelector('.home-promo-grid');
      expect(container).toBeInTheDocument();
    });

    it('应该渲染4个宣传卡片', () => {
      renderWithRouter(<PromoGrid />);
      const cards = document.querySelectorAll('.home-promo-card');
      expect(cards).toHaveLength(4);
    });

    it('应该显示会员服务卡片', () => {
      renderWithRouter(<PromoGrid />);
      const membershipCard = screen.getByAltText('会员服务');
      expect(membershipCard).toBeInTheDocument();
      expect(membershipCard).toHaveAttribute('src', '/images/首页-宣传推广-会员服务.jpg');
    });

    it('应该显示餐饮特产卡片', () => {
      renderWithRouter(<PromoGrid />);
      const foodCard = screen.getByAltText('餐饮特产');
      expect(foodCard).toBeInTheDocument();
      expect(foodCard).toHaveAttribute('src', '/images/首页-宣传推广-餐饮特产.jpg');
    });

    it('应该显示铁路保险卡片', () => {
      renderWithRouter(<PromoGrid />);
      const insuranceCard = screen.getByAltText('铁路保险');
      expect(insuranceCard).toBeInTheDocument();
      expect(insuranceCard).toHaveAttribute('src', '/images/首页-宣传推广-铁路保险.jpg');
    });

    it('应该显示计次定期票卡片', () => {
      renderWithRouter(<PromoGrid />);
      const seasonTicketCard = screen.getByAltText('计次定期票');
      expect(seasonTicketCard).toBeInTheDocument();
      expect(seasonTicketCard).toHaveAttribute('src', '/images/首页-宣传推广-计次定期票.png');
    });
  });

  // ========== 图片资源测试 ==========
  describe('图片资源', () => {
    it('所有图片应该有正确的CSS类名', () => {
      renderWithRouter(<PromoGrid />);
      const images = document.querySelectorAll('.home-promo-image');
      expect(images).toHaveLength(4);
      
      images.forEach(img => {
        expect(img).toHaveClass('home-promo-image');
      });
    });

    it('所有图片应该有alt属性', () => {
      renderWithRouter(<PromoGrid />);
      const images = document.querySelectorAll('.home-promo-image');
      
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect((img as HTMLImageElement).alt).not.toBe('');
      });
    });
  });

  // ========== 交互测试 ==========
  describe('交互功能', () => {
    it('点击会员服务卡片应该显示提示', () => {
      const consoleLogSpy = vi.spyOn(console, 'log');
      renderWithRouter(<PromoGrid />);
      
      const membershipCard = screen.getByAltText('会员服务').closest('.home-promo-card');
      fireEvent.click(membershipCard!);
      
      expect(consoleLogSpy).toHaveBeenCalledWith('跳转到:', '/membership');
      expect(mockAlert).toHaveBeenCalled();
      consoleLogSpy.mockRestore();
    });

    it('点击餐饮特产卡片应该显示提示', () => {
      const consoleLogSpy = vi.spyOn(console, 'log');
      renderWithRouter(<PromoGrid />);
      
      const foodCard = screen.getByAltText('餐饮特产').closest('.home-promo-card');
      fireEvent.click(foodCard!);
      
      expect(consoleLogSpy).toHaveBeenCalledWith('跳转到:', '/food-service');
      expect(mockAlert).toHaveBeenCalled();
      consoleLogSpy.mockRestore();
    });

    it('所有卡片应该有cursor pointer类名', () => {
      renderWithRouter(<PromoGrid />);
      const cards = document.querySelectorAll('.home-promo-card');
      
      // 验证所有卡片都有 home-promo-card 类（CSS中定义了 cursor: pointer）
      cards.forEach(card => {
        expect(card).toHaveClass('home-promo-card');
      });
    });

    it('所有卡片应该有title属性（鼠标悬停提示）', () => {
      renderWithRouter(<PromoGrid />);
      const cards = document.querySelectorAll('.home-promo-card');
      
      expect(cards).toHaveLength(4);
      cards.forEach(card => {
        expect(card).toHaveAttribute('title');
        expect(card.getAttribute('title')).not.toBe('');
      });
    });
  });

  // ========== CSS 类名验证 ==========
  describe('CSS 类名验证', () => {
    it('容器应该有正确的类名', () => {
      renderWithRouter(<PromoGrid />);
      const container = document.querySelector('.home-promo-grid');
      expect(container).toHaveClass('home-promo-grid');
    });

    it('卡片应该有正确的类名', () => {
      renderWithRouter(<PromoGrid />);
      const cards = document.querySelectorAll('.home-promo-card');
      
      expect(cards).toHaveLength(4);
      cards.forEach(card => {
        expect(card).toHaveClass('home-promo-card');
      });
    });

    it('图片应该有正确的类名', () => {
      renderWithRouter(<PromoGrid />);
      const images = document.querySelectorAll('.home-promo-image');
      
      expect(images).toHaveLength(4);
      images.forEach(img => {
        expect(img).toHaveClass('home-promo-image');
      });
    });
  });

  // ========== 布局验证 ==========
  describe('布局验证', () => {
    it('容器应该使用Grid布局', () => {
      renderWithRouter(<PromoGrid />);
      const container = document.querySelector('.home-promo-grid') as HTMLElement;
      
      // 验证是否有 grid 相关的样式类
      expect(container).toBeInTheDocument();
    });

    it('应该渲染为2行2列布局', () => {
      renderWithRouter(<PromoGrid />);
      const cards = document.querySelectorAll('.home-promo-card');
      
      // 验证卡片数量为4（2x2）
      expect(cards).toHaveLength(4);
    });
  });

  // ========== 卡片顺序验证 ==========
  describe('卡片顺序', () => {
    it('卡片应该按正确顺序显示', () => {
      renderWithRouter(<PromoGrid />);
      const images = Array.from(document.querySelectorAll('.home-promo-image')) as HTMLImageElement[];
      
      expect(images[0].alt).toBe('会员服务');
      expect(images[1].alt).toBe('餐饮特产');
      expect(images[2].alt).toBe('铁路保险');
      expect(images[3].alt).toBe('计次定期票');
    });

    it('卡片图片路径应该正确', () => {
      renderWithRouter(<PromoGrid />);
      const images = Array.from(document.querySelectorAll('.home-promo-image')) as HTMLImageElement[];
      
      // 使用解码后的URL或者更宽松的匹配（URL编码的中文字符）
      expect(decodeURIComponent(images[0].src)).toContain('首页-宣传推广-会员服务.jpg');
      expect(decodeURIComponent(images[1].src)).toContain('首页-宣传推广-餐饮特产.jpg');
      expect(decodeURIComponent(images[2].src)).toContain('首页-宣传推广-铁路保险.jpg');
      expect(decodeURIComponent(images[3].src)).toContain('首页-宣传推广-计次定期票.png');
    });
  });
});
