/**
 * @description 统一响应格式工具函数
 * 提供成功和失败响应的标准格式
 */

/**
 * 成功响应
 * @param {Object} res - Express response对象
 * @param {Object} data - 响应数据
 * @param {string} message - 提示信息
 */
function successResponse(res, data = {}, message = '操作成功') {
  return res.json({
    success: true,
    message,
    data
  });
}

/**
 * 失败响应
 * @param {Object} res - Express response对象
 * @param {string} message - 错误信息
 * @param {number} statusCode - HTTP状态码
 */
function errorResponse(res, message = '操作失败', statusCode = 400) {
  return res.status(statusCode).json({
    success: false,
    message
  });
}

module.exports = {
  successResponse,
  errorResponse
};
