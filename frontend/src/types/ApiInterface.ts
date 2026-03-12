/**
 * API 响应类型定义
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  url: string;
  writeStatus: string;
  github:string;
  serviceStatus?: {
    online: boolean;
    status: string;
    statusCode: number | null;
    responseTime: number | null;
    checkedAt: string;
    error?: string;
  };
}

export interface ProjectsResponse {
  projects: Project[];
  total: number;
  timestamp: string;
  serviceSummary: {
    overallStatus: string;
    online: number;
    offline: number;
    total: number;
    healthPercentage: number;
  };
}

// 确保这是一个模块
export {}