/**
 * 项目相关的 API 函数
 */

import { fetchApi } from '../utils/client';
import { Project, ProjectsResponse, ApiResponse } from '../types/ApiInterface';

/**
 * 获取项目列表
 */
export async function fetchProjects(): Promise<ApiResponse<ProjectsResponse>> {
  return fetchApi<ProjectsResponse>('/projects');
}

/**
 * 获取单个项目详情
 */
export async function fetchProject(id: number): Promise<ApiResponse<Project>> {
  return fetchApi<Project>(`/projects/${id}`);
}

/**
 * 检查服务状态
 */
export async function checkServiceStatus(url: string): Promise<ApiResponse<{ online: boolean }>> {
  return fetchApi<{ online: boolean }>('/projects/check', {
    method: 'POST',
    body: JSON.stringify({ url }),
  });
}

// 确保这是一个模块
export {}