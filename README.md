# 🚀 导航首页项目 (Navigation Home)

一个现代化的个人项目导航系统，用于集中管理和展示个人项目，提供实时服务状态监控和美观的交互界面。

![项目截图](https://img.shields.io/badge/status-在线-success) ![React](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue) ![Node.js](https://img.shields.io/badge/Node.js-16+-green) ![Express](https://img.shields.io/badge/Express-4.18-lightgrey)

## 📋 目录

- [✨ 功能特性](#-功能特性)
- [🏗️ 技术栈](#️-技术栈)
- [📁 项目结构](#-项目结构)
- [🚀 快速开始](#-快速开始)
  - [前置要求](#前置要求)
  - [安装与运行](#安装与运行)
- [🔧 配置说明](#-配置说明)
- [📡 API 接口](#-api-接口)
- [🎨 界面展示](#-界面展示)
- [🧪 开发指南](#-开发指南)
- [📦 部署说明](#-部署说明)
- [🤝 贡献指南](#-贡献指南)
- [📄 许可证](#-许可证)

## ✨ 功能特性

### 🎯 核心功能
- **项目集中管理**：统一展示个人所有项目信息
- **实时状态监控**：自动检测项目服务在线状态
- **响应式设计**：完美适配桌面和移动设备
- **现代化交互**：平滑动画和视觉反馈
- **技术栈展示**：清晰展示每个项目的技术构成

### 🔍 状态监控
- ✅ 自动检测服务可用性
- 📊 响应时间测量
- 🟢 实时状态指示器
- 📈 健康度统计面板

### 🎨 用户体验
- 🌈 渐变色彩主题
- 🖱️ 鼠标跟随效果
- 💫 卡片悬停动画
- 📱 移动端优化

## 🏗️ 技术栈

### 前端 (Frontend)
- **框架**: React 18.2 + TypeScript
- **构建工具**: Create React App + Craco
- **样式**: Less + CSS 变量
- **图标**: Lucide React + React Icons
- **HTTP 客户端**: 自定义封装

### 后端 (Backend)
- **运行时**: Node.js 16+
- **框架**: Express 4.18
- **中间件**: CORS, Morgan, Body-parser
- **HTTP 客户端**: Axios
- **配置管理**: Dotenv

### 开发工具
- **包管理**: npm
- **开发服务器**: Nodemon (后端)
- **代码质量**: TypeScript 严格模式
- **样式预处理**: Less

## 📁 项目结构

```
navigation-home/
├── frontend/                    # 前端应用
│   ├── public/                 # 静态资源
│   ├── src/
│   │   ├── api/               # API 接口层
│   │   │   ├── api.ts         # API 基础配置
│   │   │   └── projects.ts    # 项目相关 API
│   │   ├── types/             # TypeScript 类型定义
│   │   │   └── ApiInterface.ts # API 接口类型
│   │   ├── utils/             # 工具函数
│   │   │   └── client.ts      # HTTP 客户端
│   │   ├── App.less           # 主样式文件
│   │   ├── App.tsx            # 主组件
│   │   └── index.tsx          # 应用入口
│   ├── craco.config.js        # Craco 配置
│   ├── package.json           # 前端依赖
│   └── tsconfig.json          # TypeScript 配置
├── server/                     # 后端服务
│   ├── src/
│   │   └── index.js           # 服务器入口
│   ├── routes/                # 路由定义
│   │   ├── health.js          # 健康检查路由
│   │   └── projects.js        # 项目路由
│   ├── config.js              # 项目配置
│   └── package.json           # 后端依赖
└── README.md                  # 项目文档
```

## 🚀 快速开始

### 前置要求

- **Node.js**: 版本 16.0.0 或更高
- **npm**: 版本 8.0.0 或更高
- **Git**: 用于版本控制

### 安装与运行

#### 1. 克隆项目
```bash
git clone https://github.com/zhengsongrui/navigation-home.git
cd navigation-home
```

#### 2. 安装依赖
```bash
# 安装前端依赖
cd frontend
npm install

# 安装后端依赖
cd ../server
npm install
```

#### 3. 启动开发服务器

**方式一：分别启动（推荐）**

```bash
# 终端1：启动后端服务器
cd server
npm run dev

# 终端2：启动前端开发服务器
cd frontend
npm start
```

**方式二：使用脚本启动**

```bash
# 在项目根目录创建启动脚本
# Windows (start.bat)
@echo off
start cmd /k "cd server && npm run dev"
timeout /t 3
start cmd /k "cd frontend && npm start"
```

#### 4. 访问应用
- **前端**: http://localhost:3003
- **后端 API**: http://localhost:3081
- **健康检查**: http://localhost:3081/health
- **项目 API**: http://localhost:3081/api/projects

## 🔧 配置说明

### 前端配置 (`frontend/.env`)
```env
SKIP_PREFLIGHT_CHECK=true
```

### 后端配置 (`server/config.js`)
```javascript
module.exports = {
  projects: [
    {
      id: 1,
      name: "个人博客v2",
      description: "用于测试AI全自动开发上限的demo博客...",
      url: "http://zhengsongrui.life/blog-v2",
      github: "https://github.com/zhengsongrui/frp/blog-v2",
      writeStatus: "维护中"
    },
    // 更多项目配置...
  ]
};
```

### 服务器配置 (`server/src/index.js`)
- **端口**: 3081
- **CORS 配置**: 允许 localhost:3000-3002
- **中间件**: JSON 解析、URL 编码、CORS

## 📡 API 接口

### 健康检查
```
GET /health
```
**响应示例**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345
}
```

### 获取项目列表
```
GET /api/projects
```
**响应示例**:
```json
{
  "projects": [
    {
      "id": 1,
      "name": "个人博客v2",
      "description": "用于测试AI全自动开发上限的demo博客...",
      "url": "http://zhengsongrui.life/blog-v2",
      "github": "https://github.com/zhengsongrui/frp/blog-v2",
      "writeStatus": "维护中",
      "serviceStatus": {
        "online": true,
        "status": "up",
        "statusCode": 200,
        "responseTime": 245,
        "checkedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "total": 3,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "serviceSummary": {
    "overallStatus": "healthy",
    "online": 3,
    "offline": 0,
    "total": 3,
    "healthPercentage": 100
  }
}
```

### 服务状态检查
```
POST /api/projects/check
```
**请求体**:
```json
{
  "url": "https://example.com"
}
```

## 🎨 界面展示

### 主要界面组件

1. **头部区域**
   - 项目标题和描述
   - GitHub 链接
   - 渐变标题效果

2. **项目卡片网格**
   - 响应式网格布局
   - 悬停动画效果
   - 技术栈标签
   - 状态指示器
   - 项目链接按钮

3. **状态指示器**
   - 在线/离线状态
   - 写作状态标签
   - 响应时间显示

4. **视觉效果**
   - 鼠标跟随光点
   - 背景装饰元素
   - 卡片渐变背景
   - 平滑过渡动画

### 响应式设计
- **桌面端**: 3列网格布局
- **平板端**: 2列网格布局  
- **移动端**: 1列垂直布局
- **自适应字体大小**
- **触摸友好交互**

## 🧪 开发指南

### 添加新项目

1. **修改后端配置** (`server/config.js`)
```javascript
{
  id: 4,
  name: "新项目名称",
  description: "项目描述",
  url: "https://项目地址",
  github: "https://github.com/用户名/仓库",
  writeStatus: "开发中" // 可选：开发中、维护中、已完成、未开发
}
```

2. **更新前端映射** (`frontend/src/App.tsx`)
```javascript
// 技术栈映射
const techMap: Record<string, string[]> = {
  '新项目名称': ['React', 'TypeScript', 'Tailwind'],
  // 现有映射...
};

// 图标映射
const iconNameMap: Record<number, keyof typeof iconMap> = {
  4: 'Atom', // 或其他图标名称
  // 现有映射...
};
```

### 自定义样式

项目使用 Less 作为 CSS 预处理器，主要样式变量在 `frontend/src/App.less` 中定义：

```less
// 颜色变量
@primary-color: #6366f1;
@secondary-color: #8b5cf6;
@accent-color: #10b981;

// 渐变变量
@gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
@gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

// 尺寸变量
@container-max-width: 1200px;
@border-radius-lg: 24px;
```

### 开发命令

```bash
# 前端开发
cd frontend
npm start          # 启动开发服务器
npm run build      # 构建生产版本
npm test           # 运行测试

# 后端开发  
cd server
npm run dev        # 开发模式（使用 nodemon）
npm start          # 生产模式
```

## 📦 部署说明

### 前端部署

1. **构建生产版本**
```bash
cd frontend
npm run build
```

2. **部署到静态托管服务**
   - Vercel
   - Netlify
   - GitHub Pages
   - 或任何静态文件服务器

### 后端部署

1. **环境准备**
```bash
cd server
npm install --production
```

2. **使用 PM2 管理进程**
```bash
npm install -g pm2
pm2 start src/index.js --name "navigation-home-api"
pm2 save
pm2 startup
```

3. **配置反向代理（Nginx）**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 环境变量配置

生产环境建议配置以下环境变量：

```bash
# 后端 .env 文件
NODE_ENV=production
PORT=3081
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. **Fork 项目仓库**
2. **创建功能分支**
   ```bash
   git checkout -b feature/新功能
   ```
3. **提交更改**
   ```bash
   git commit -m "添加: 新功能描述"
   ```
4. **推送到分支**
   ```bash
   git push origin feature/新功能
   ```
5. **创建 Pull Request**

### 代码规范
- 使用 TypeScript 严格模式
- 遵循 ESLint 配置
- 组件使用函数式组件和 Hooks
- 样式使用 Less 预处理器
- 提交信息遵循 Conventional Commits

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系与支持

- **GitHub Issues**: [报告问题或请求功能](https://github.com/zhengsongrui/navigation-home/issues)
- **项目作者**: zhengsongrui
- **项目地址**: https://github.com/zhengsongrui/navigation-home

---

<div align="center">
  
**✨ 感谢使用导航首页项目！**  
如果这个项目对你有帮助，请给个 ⭐️ Star 支持！

</div>