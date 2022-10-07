const app = require('./app/index')

// 缓存数据库运行
require('./app/database')

const {
    APP_PORT
} = require('./app/config')

app.listen(APP_PORT, () => {
    console.log(`${APP_PORT}端口服务器启动`);
})