/**
 * API 模块重新导出文件
 *
 * 注意：此文件已重构，实际实现在以下位置：
 * - 类型定义: ../types/api.ts
 * - 通用 fetch 封装: ../api/client.ts
 * - 项目相关 API: ../api/projects.ts
 */

// 导入函数用于默认导出
import { fetchApi } from '../utils/client';
import { fetchProjects, fetchProject, checkServiceStatus } from './projects';

// 重新导出所有类型
export type { ApiResponse, Project, ProjectsResponse } from '../types/ApiInterface';

// 重新导出通用 fetch 函数
export { fetchApi };

// 重新导出项目相关 API 函数
export { fetchProjects, fetchProject, checkServiceStatus };

// 保持向后兼容的默认导出
const api = {
  fetchApi,
  fetchProjects,
  fetchProject,
  checkServiceStatus,
};

export default api;