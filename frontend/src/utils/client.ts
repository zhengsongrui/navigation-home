/**
 * 封装的 fetch 请求工具函数
 * 支持开发环境和生产环境的不同 API 地址配置
 */

import { ApiResponse } from '../types/ApiInterface';

// 获取环境变量
const ENV = import.meta.env.REACT_APP_ENV || 'development';
const DEBUG = import.meta.env.REACT_APP_DEBUG === 'true';
const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:3082/api';

// 环境配置对象
export const envConfig = {
  env: ENV,
  isDevelopment: ENV === 'development',
  isProduction: ENV === 'production',
  debug: DEBUG,
  apiBaseUrl: API_BASE_URL,
};

// 开发环境日志
if (envConfig.isDevelopment && envConfig.debug) {
  console.log('🌱 当前环境:', envConfig.env);
  console.log('🔗 API 基础地址:', envConfig.apiBaseUrl);
}

/**
 * 通用的 fetch 请求封装
 */
export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `请求失败: ${response.status} ${response.statusText}`;
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error || errorMessage;
      } catch {
        if (errorText) {
          errorMessage = `${errorMessage} - ${errorText}`;
        }
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    }

    const data = await response.json();
    
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Fetch API error:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : '网络请求失败',
    };
  }
}

// 确保这是一个模块
export {}