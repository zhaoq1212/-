module.exports = {
    /* webpack-dev-server 相关配置 */
    devServer: {
        /* 自动打开浏览器 */
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '127.0.0.1',
        port: 8080,
        https: false,
        hotOnly: false,
        /* 使用代理 */
        proxy: {
            '/api': {
                /* 目标代理服务器地址 */
                target: 'https://api.binstd.com/recipe',
                /* 允许跨域 */
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        },
    },
}