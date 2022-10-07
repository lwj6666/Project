// 使用mysql2来连接数据库
const mysql = require('mysql2');

// 活动配置信息
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
} = require('../app/config')

const connections = mysql.createPool({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    connectionLimit: 10,//最多建立几个连接
    queueLimit: 0
})

module.exports = connections.promise()