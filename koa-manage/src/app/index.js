const Koa = require('koa')

// json库
const bodyParser = require('koa-bodyparser')

const cors = require('koa2-cors')

// 集中使用use route
const useRoutes = require('../router/index.js')
// cors配置
const corsOption = require('./corsconfig')

const app = new Koa()

// 将useRoutes赋值到app属性上
app.useRoutes = useRoutes

// 使用处理跨域的库koa2-cors
app.use(cors(corsOption))

app.use(bodyParser()) //json处理
app.useRoutes()

module.exports = app