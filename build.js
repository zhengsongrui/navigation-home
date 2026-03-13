#!/usr/bin/env node

/**
 * 简化版前端打包脚本
 * 将前端构建产物复制到 server/public 目录
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 控制台颜色（简单实现）
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}[INFO]${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}[WARNING]${colors.reset} ${msg}`)
};

// 路径定义
const ROOT_DIR = process.cwd();
const FRONTEND_DIR = path.join(ROOT_DIR, 'frontend');
const SERVER_DIR = path.join(ROOT_DIR, 'server');
const FRONTEND_BUILD_DIR = path.join(FRONTEND_DIR, 'build');
const SERVER_PUBLIC_DIR = path.join(SERVER_DIR, 'public');

function cleanServerPublic() {
  log.info('清理 server/public 目录...');
  try {
    if (fs.existsSync(SERVER_PUBLIC_DIR)) {
      // 删除目录中的所有文件
      const files = fs.readdirSync(SERVER_PUBLIC_DIR);
      for (const file of files) {
        const filePath = path.join(SERVER_PUBLIC_DIR, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(filePath);
        }
      }
      log.success('server/public 目录已清空');
    } else {
      fs.mkdirSync(SERVER_PUBLIC_DIR, { recursive: true });
      log.success('server/public 目录已创建');
    }
  } catch (error) {
    log.error(`清理目录失败: ${error.message}`);
    throw error;
  }
}

function buildFrontend() {
  log.info('构建前端应用...');
  try {
    // 检查 frontend 目录是否存在
    if (!fs.existsSync(FRONTEND_DIR)) {
      throw new Error('frontend 目录不存在');
    }

    // 检查 package.json 是否存在
    const packageJsonPath = path.join(FRONTEND_DIR, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('frontend/package.json 不存在');
    }

    // 执行构建命令
    log.info('执行 npm run build...');
    execSync('npm run build', {
      cwd: FRONTEND_DIR,
      stdio: 'inherit'
    });
    
    log.success('前端构建完成');
  } catch (error) {
    log.error(`前端构建失败: ${error.message}`);
    throw error;
  }
}

function copyFileSync(source, target) {
  const targetDir = path.dirname(target);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.copyFileSync(source, target);
}

function copyDirSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  const files = fs.readdirSync(source);
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      copyDirSync(sourcePath, targetPath);
    } else {
      copyFileSync(sourcePath, targetPath);
    }
  }
}

function copyBuildFiles() {
  log.info('复制构建文件到 server/public...');
  try {
    // 检查构建目录是否存在
    if (!fs.existsSync(FRONTEND_BUILD_DIR)) {
      throw new Error('前端构建目录不存在，请先运行构建');
    }

    // 复制所有文件
    copyDirSync(FRONTEND_BUILD_DIR, SERVER_PUBLIC_DIR);
    
    // 统计复制的文件数量
    const files = fs.readdirSync(SERVER_PUBLIC_DIR);
    log.success(`已复制 ${files.length} 个文件到 server/public`);
    
    // 显示主要文件
    const importantFiles = files.filter(f => 
      f.includes('index.html') || 
      f.includes('asset-manifest') || 
      f.endsWith('.js') || 
      f.endsWith('.css')
    );
    
    if (importantFiles.length > 0) {
      log.info('主要文件:');
      importantFiles.forEach(file => {
        console.log(`  - ${file}`);
      });
    }
  } catch (error) {
    log.error(`复制文件失败: ${error.message}`);
    throw error;
  }
}

function updatePackageJson() {
  log.info('更新 server/package.json 脚本...');
  try {
    const serverPackagePath = path.join(SERVER_DIR, 'package.json');
    
    if (!fs.existsSync(serverPackagePath)) {
      log.warning('server/package.json 不存在，跳过更新');
      return;
    }
    
    const packageJson = JSON.parse(fs.readFileSync(serverPackagePath, 'utf8'));
    
    // 添加或更新脚本
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.build = 'node ../build-simple.js';
    packageJson.scripts['build:frontend'] = 'cd ../frontend && npm run build';
    packageJson.scripts['build:copy'] = 'node ../build-simple.js --copy-only';
    packageJson.scripts.start = 'node src/index.js';
    packageJson.scripts['start:prod'] = 'npm run build && npm start';
    
    fs.writeFileSync(serverPackagePath, JSON.stringify(packageJson, null, 2));
    log.success('server/package.json 已更新');
  } catch (error) {
    log.warning(`更新 package.json 失败: ${error.message}`);
  }
}

function main() {
  log.info('开始打包流程...');
  log.info(`工作目录: ${ROOT_DIR}`);
  
  try {
    // 检查命令行参数
    const args = process.argv.slice(2);
    const copyOnly = args.includes('--copy-only');
    
    if (copyOnly) {
      log.info('仅复制模式...');
      copyBuildFiles();
      return;
    }
    
    // 1. 清理 server/public 目录
    cleanServerPublic();
    
    // 2. 构建前端
    buildFrontend();
    
    // 3. 复制构建文件
    copyBuildFiles();
    
    // 4. 更新 package.json
    updatePackageJson();
    
    log.success('打包完成！');
    log.info('');
    log.info('下一步:');
    log.info('1. 启动服务器: cd server && npm start');
    log.info('2. 访问: http://localhost:3081');
    log.info('3. 或直接运行: cd server && npm run start:prod');
    
  } catch (error) {
    log.error('打包流程失败');
    process.exit(1);
  }
}

// 执行主函数
if (require.main === module) {
  main();
}

module.exports = {
  cleanServerPublic,
  buildFrontend,
  copyBuildFiles,
  updatePackageJson,
  main
};