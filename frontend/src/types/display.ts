import React from 'react';
import { Atom, FileCode, Server } from 'lucide-react';
import { Project } from './ApiInterface';

// 图标映射
export const iconMap: Record<string, JSX.Element> = {
  'Atom': React.createElement(Atom, { className: "project-icon" }),
  'FileCode': React.createElement(FileCode, { className: "project-icon" }),
  'Server': React.createElement(Server, { className: "project-icon" }),
};

// 技术栈映射（根据项目名称映射）
export const techMap: Record<string, string[]> = {
  '导航首页项目': ['React', 'TypeScript', 'Node.js'],
  'API 服务监控': ['Node.js', 'Express', 'MongoDB'],
  '个人博客': ['Next.js', 'React', 'Markdown'],
};

// 颜色映射
export const colorMap: Record<number, string> = {
  1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
};

// 图标名称映射
export const iconNameMap: Record<number, keyof typeof iconMap> = {
  1: 'Atom',
  2: 'FileCode',
  3: 'Server',
};

export interface DisplayProject {
  id: number;
  name: string;
  description: string;
  url?: string;
  github:string;
  writeStatus: string;
  online?: boolean;
  icon: JSX.Element;
  tech: string[];
  color: string;
}

// 将 API Project 转换为 DisplayProject
export function convertToDisplayProject(project: Project): DisplayProject {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    url: project.url,
    github:project.github,
    writeStatus: project.writeStatus,
    online: project.serviceStatus?.online,
    icon: iconMap[iconNameMap[project.id] || 'Atom'] || React.createElement(Atom, { className: "project-icon" }),
    tech: techMap[project.name] || ['React', 'Node.js'],
    color: colorMap[project.id] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  };
}