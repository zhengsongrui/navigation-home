# 环境配置说明

## 概述

本项目支持开发环境和生产环境的不同配置，通过环境变量文件进行管理。

## 环境变量文件

### 1. `.env` (默认配置)
- 包含通用配置
- 会被 `.env.development` 和 `.env.production` 覆盖
- 用于本地开发时的默认值

### 2. `.env.development` (开发环境)
- 开发环境专用配置
- 使用本地服务器 API 地址：`http://localhost:3082/api`
- 启用调试模式

### 3. `.env.production` (生产环境)
- 生产环境专用配置
- 使用相对路径 API 地址：`/api`
- 禁用调试模式

## 环境变量说明

| 变量名 | 说明 | 开发环境值 | 生产环境值 |
|--------|------|------------|------------|
| `REACT_APP_API_URL` | API 基础地址 | `http://localhost:3082/api` | `/api` |
| `REACT_APP_ENV` | 当前环境 | `development` | `production` |
| `REACT_APP_DEBUG` | 调试模式 | `true` | `false` |
| `SKIP_PREFLIGHT_CHECK` | 跳过预检检查 | `true` | `true` |

## 使用方法

### 开发环境
```bash
# 默认使用开发环境配置
npm start

# 或显式指定环境
NODE_ENV=development npm start
```

### 生产环境构建
```bash
# 构建生产版本（自动使用 .env.production）
npm run build

# 或显式指定环境
NODE_ENV=production npm run build
```

### 测试环境
```bash
# 测试时使用开发环境配置
npm test
```

## 在代码中使用环境变量

### 1. 直接使用
```typescript
const apiUrl = process.env.REACT_APP_API_URL;
const isDevelopment = process.env.REACT_APP_ENV === 'development';
```

### 2. 使用封装的配置对象
```typescript
import { envConfig } from './utils/client';

console.log('当前环境:', envConfig.env);
console.log('API 地址:', envConfig.apiBaseUrl);
console.log('是否开发环境:', envConfig.isDevelopment);
```

## 环境检测逻辑

在 `src/utils/client.ts` 中，我们提供了环境检测功能：

```typescript
// 环境配置对象
export const envConfig = {
  env: ENV,
  isDevelopment: ENV === 'development',
  isProduction: ENV === 'production',
  debug: DEBUG,
  apiBaseUrl: API_BASE_URL,
};

// 开发环境会自动显示日志
if (envConfig.isDevelopment && envConfig.debug) {
  console.log('🌱 当前环境:', envConfig.env);
  console.log('🔗 API 基础地址:', envConfig.apiBaseUrl);
}
```

## 注意事项

1. **环境变量命名**：所有自定义环境变量必须以 `REACT_APP_` 开头
2. **优先级**：`.env.local` > `.env.development`/`.env.production` > `.env`
3. **安全性**：不要在代码中提交敏感信息到版本控制
4. **服务器配置**：确保服务器端口与前端配置一致（默认 3082）

## 自定义环境

如果需要添加其他环境（如测试环境），可以创建 `.env.test` 文件：

```bash
# .env.test
REACT_APP_API_URL=http://localhost:3082/api
REACT_APP_ENV=test
REACT_APP_DEBUG=true
```

然后使用对应的命令运行：
```bash
NODE_ENV=test npm start
```

## 故障排除

### 环境变量未生效
1. 检查变量名是否正确（必须以 `REACT_APP_` 开头）
2. 重启开发服务器
3. 清除浏览器缓存

### API 连接失败
1. 确认服务器是否运行在正确端口
2. 检查 CORS 配置
3. 验证网络连接

### 构建问题
1. 确保所有环境变量文件存在
2. 检查 `.env` 文件语法
3. 查看构建日志获取详细错误信息