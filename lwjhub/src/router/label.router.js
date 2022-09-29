const Router = require('koa-router')

const labelRouter = new Router({ prefix: '/label' })

const {
    verifyAuth
} = require('../middleware/auth.middleware')
const {
    labelCreate, 
    labelList
} = require('../controller/label.controller.js')

// 标签一般不会通过接口创建
// 标签创建接口
labelRouter.post('/',verifyAuth,labelCreate)

// 获取标签接口
labelRouter.get('/',labelList)

module.exports = labelRouter