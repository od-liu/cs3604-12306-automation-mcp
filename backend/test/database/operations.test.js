/**
 * @test FUNC-VERIFY-USER-CREDENTIALS
 * @description 数据库操作函数测试
 * @requirement REQ-LOGIN-FORM
 */

import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { verifyUserCredentials } from '../../src/database/operations_test.js';
import { initTestDatabase, clearTestDatabase, insertTestFixtures } from '../../src/database/init_test_db.js';
import testDb from '../../src/database/test_db.js';

describe('verifyUserCredentials', () => {
  beforeAll(async () => {
    // 初始化测试数据库
    await initTestDatabase();
  });

  beforeEach(async () => {
    // 每个测试前清空数据并插入测试数据
    await clearTestDatabase();
    await insertTestFixtures();
  });

  afterAll(() => {
    // 关闭数据库连接
    testDb.close();
  });

  it('应该在用户名和密码正确时返回用户信息', async () => {
    const result = await verifyUserCredentials('testuser', 'password123');
    expect(result).not.toBeNull();
    expect(result.username).toBe('testuser');
    expect(result.email).toBe('test@example.com');
    expect(result.phone).toBe('19805819256');
    expect(result.id_card_last4).toBe('4028');
  });

  it('应该支持使用邮箱登录', async () => {
    const result = await verifyUserCredentials('test@example.com', 'password123');
    expect(result).not.toBeNull();
    expect(result.username).toBe('testuser');
  });

  it('应该支持使用手机号登录', async () => {
    const result = await verifyUserCredentials('19805819256', 'password123');
    expect(result).not.toBeNull();
    expect(result.username).toBe('testuser');
  });

  it('应该在用户名不存在时返回null', async () => {
    const result = await verifyUserCredentials('nonexistent', 'password123');
    expect(result).toBeNull();
  });

  it('应该在密码错误时返回null', async () => {
    const result = await verifyUserCredentials('testuser', 'wrongpassword');
    expect(result).toBeNull();
  });

  it('应该在用户名和密码都错误时返回null', async () => {
    const result = await verifyUserCredentials('nonexistent', 'wrongpassword');
    expect(result).toBeNull();
  });
});

