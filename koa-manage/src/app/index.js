const Koa = require('koa')

// 集中使用use route
const useRoutes = require('../router/index.js')

const app = new Koa()

// 将useRoutes赋值到app属性上
app.useRoutes = useRoutes

app.useRoutes()

module.exports = app