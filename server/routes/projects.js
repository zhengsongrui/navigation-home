const express = require('express');
const axios = require('axios');
const router = express.Router();
const {projects} = require('../config');

// 服务检查函数 - 检查URL是否在线
async function checkServiceStatus(url) {
  try {
    const startTime = Date.now();
    const response = await axios.get(url, {
      timeout: 5000, // 5秒超时
      validateStatus: function (status) {
        return status >= 200 && status < 500; // 接受200-499的状态码
      }
    });
    const responseTime = Date.now() - startTime;
    
    // 根据状态码判断服务状态
    let status = 'unknown';
    if (response.status >= 200 && response.status < 300) {
      status = 'up';
    } else if (response.status >= 300 && response.status < 400) {
      status = 'redirect';
    } else if (response.status >= 400 && response.status < 500) {
      status = 'client_error';
    } else if (response.status >= 500) {
      status = 'server_error';
    }
    
    return {
      online: response.status < 400, // 400以下认为在线
      status: status,
      statusCode: response.status,
      responseTime: responseTime,
      checkedAt: new Date().toISOString()
    };
  } catch (error) {
    // 请求失败，服务不可用
    return {
      online: false,
      status: 'down',
      statusCode: null,
      responseTime: null,
      checkedAt: new Date().toISOString(),
      error: error.code || error.message
    };
  }
}

// 个人项目信息接口 - 返回个人项目信息（包括地址）和服务状态
router.get('/', async (req, res) => {
  try {

    // 并行检查所有项目的服务状态
    const projectsWithStatus = await Promise.all(
      projects.map(async (project) => {
        const serviceStatus = await checkServiceStatus(project.url);
        return {
          ...project,
          serviceStatus: serviceStatus
        };
      })
    );

    // 计算总体服务状态
    const onlineProjects = projectsWithStatus.filter(p => p.serviceStatus.online).length;
    const totalProjects = projectsWithStatus.length;
    const overallStatus = onlineProjects === totalProjects ? 'healthy' :
                         onlineProjects > 0 ? 'degraded' : 'unhealthy';

    res.json({
      projects: projectsWithStatus,
      total: totalProjects,
      timestamp: new Date().toISOString(),
      serviceSummary: {
        overallStatus: overallStatus,
        online: onlineProjects,
        offline: totalProjects - onlineProjects,
        total: totalProjects,
        healthPercentage: Math.round((onlineProjects / totalProjects) * 100)
      }
    });
  } catch (error) {
    console.error('获取项目信息时出错:', error);
    res.status(500).json({
      error: '获取项目信息时出错',
      message: error.message
    });
  }
});

module.exports = router;