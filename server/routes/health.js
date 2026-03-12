const express = require('express');
const router = express.Router();

// 健康检查路由
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'navigation-home-backend'
  });
});

module.exports = router;