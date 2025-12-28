/**
 * @module ResponseHelper
 * @description 统一响应格式化工具
 */

export const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data
  };
};

export const errorResponse = (message = 'Error', code = 500) => {
  return {
    success: false,
    message,
    code
  };
};

