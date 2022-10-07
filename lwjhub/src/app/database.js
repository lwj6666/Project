const mysql = require('mysql2')

const config = require('./config')

console.log(config.MYSQL_HOST);

const connections = mysql.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    database: config.MYSQL_DATABASE,
    user: config.MYSQL_USER,
    password: config.MySQL_PASSWORD,
    connectionLimit: 10,//最多建立几个连接
    queueLimit: 0
})

connections.getConnection((err, conn) => {
    conn.connect((err) => {
        if (err) {
            console.error('连接失败');
        }
        console.log('数据库连接成功');
    })
    conn.release();
})

module.exports = connections.promise()