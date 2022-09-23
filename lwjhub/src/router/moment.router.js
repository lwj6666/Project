const { verify } = require('jsonwebtoken')
const Router = require('koa-router')

const momentRouter = new Router({
    prefix: '/moment'
})

const {
    createmoment,
    momentDatail,
    momentList,
    momentUpdata
} =require('../controller/moment.controller')
const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')

// 动态
momentRouter.post('/',verifyAuth,createmoment)

// 获取某一条动态详情
momentRouter.get('/:momentId',momentDatail)

// 查询多条动态详情
momentRouter.get('/',momentList)

// 修改某条动态 1.用户必须登录 2.用户是否具备权限
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,momentUpdata)

module.exports = momentRouter