const Koa = require('koa')
// json库
const bodyParser = require('koa-bodyparser')

// 路径 中间件处理映射(koa-router)
// const UsersRouter = require('../router/user.router')
// const AuthRouter = require('../router/auth.router')
// 集中使用use route
const useRoutes = require('../router/index')
const errorHandler = require('./error-handle')

const app = new Koa()

app.useRoutes = useRoutes

app.use(bodyParser()) //json处理
app.useRoutes()

// 错误的集中处理
app.on('error',errorHandler)

// 导出app给main.js让其启动服务器
module.exports = app