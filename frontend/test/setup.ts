import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// 每个测试后清理
afterEach(() => {
  cleanup();
});

// 全局配置
global.console = {
  ...console,
  error: vi.fn(), // 抑制测试中的错误日志
  warn: vi.fn(),
};
