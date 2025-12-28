/**
 * @test API-LOGIN
 * @description API路由集成测试
 * @requirement REQ-LOGIN-FORM
 */

import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiRoutes from '../../src/routes/api.js';
import { initTestDatabase, clearTestDatabase, insertTestFixtures } from '../../src/database/init_test_db.js';
import testDb from '../../src/database/test_db.js';

// 创建测试应用
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRoutes);

describe('API-LOGIN POST /api/auth/login', () => {
  beforeAll(async () => {
    await initTestDatabase();
  });

  beforeEach(async () => {
    await clearTestDatabase();
    await insertTestFixtures();
  });

  afterAll(() => {
    testDb.close();
  });

  it('应该在用户名和密码正确时返回成功', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.username).toBe('testuser');
    expect(response.body.data.email).toBe('test@example.com');
  });

  it('应该在用户名为空时返回错误', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: '',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('用户名');
  });

  it('应该在密码为空时返回错误', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: ''
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('密码');
  });

  it('应该在密码长度不足时返回错误', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: '12345'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('6位');
  });

  it('应该在用户名不存在时返回错误', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'nonexistent',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('用户名或密码错误');
  });

  it('应该在密码错误时返回错误', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('用户名或密码错误');
  });
});

