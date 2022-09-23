const path = require('path')
const fs = require('fs')
// 配置信息写入到环境变量 dotenv第三方库
const dotenv = require('dotenv')
// 找到根目录.env
dotenv.config({
    path: path.resolve(__dirname, '../../.env')
})

const PRIVATE_KEY=fs.readFileSync(path.resolve(__dirname,'./keys/private.key'));
const PUBLIC_KEY=fs.readFileSync(path.resolve(__dirname,'./keys/public.key'));

module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
} = process.env

module.exports.PRIVATE_KEY=PRIVATE_KEY
module.exports.PUBLIC_KEY=PUBLIC_KEY