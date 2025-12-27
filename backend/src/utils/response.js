/**
 * 统一响应格式工具函数
 */

/**
 * 成功响应
 */
function successResponse(res, data = null, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

/**
 * 错误响应
 */
function errorResponse(res, message = 'Error', statusCode = 400, error = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error : undefined
  });
}

/**
 * 未授权响应
 */
function unauthorizedResponse(res, message = 'Unauthorized') {
  return errorResponse(res, message, 401);
}

/**
 * 未找到响应
 */
function notFoundResponse(res, message = 'Not found') {
  return errorResponse(res, message, 404);
}

/**
 * 服务器错误响应
 */
function serverErrorResponse(res, message = 'Internal server error', error = null) {
  return errorResponse(res, message, 500, error);
}

module.exports = {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  notFoundResponse,
  serverErrorResponse
};
