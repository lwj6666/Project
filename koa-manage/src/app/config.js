// const fs = require('fs')
const path = require('path')

// 配置信息写入到环境变量 dotenv第三方库
const dotenv = require('dotenv')

// 相对路径的话在不同文件夹执行时会报错,按当前运行的地址
dotenv.config({
    path: path.resolve(__dirname, '../../.env')
})

module.exports = {
    APP_HOST,
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
} = process.env

