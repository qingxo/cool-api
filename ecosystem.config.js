
module.exports = {
    // 应用名称
    name: 'cool-api',
    // Script 启动文件路径
    script: './bin/www',
    // 实例数
    instances: 2,
    // 自动重启
    autorestart: true,
    // 日志文件
    log_file: './logs/pm2.log',
    // 错误日志文件
    error_file: './logs/pm2_err.log',
    // 内存重启阈值
    max_memory_restart: '1G',
    env: {
        // 环境变量
        PORT: 4000,
        NODE_ENV: 'development'
    },

    env_production: {
        PORT: 4000,
        NODE_ENV: 'production'
    }
};