const { verify } = require('jsonwebtoken')
const Router = require('koa-router')

const momentRouter = new Router({
    prefix: '/moment'
})

const {
    createmoment,
    momentDatail,
    momentList,
    momentUpdata,
    momentDelete,
    momentAddLabels,
    fileInfo
} =require('../controller/moment.controller')
const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')
// 验证标签是否存在
const {
    verifyLabelExists
} = require('../middleware/label.middleware')


// 动态
momentRouter.post('/',verifyAuth,createmoment)

// 获取某一条动态详情
momentRouter.get('/:momentsId',momentDatail)

// 查询多条动态详情
// 如何获取评论的列表
// 1.动态的接口和评论的接口是分开的
// 2.请求动态的接口的时候,就会一起携带评论的列表(缺点：1.sql相对复杂 2.信息会很多) 
momentRouter.get('/',momentList)

// 修改某条动态 1.用户必须登录 2.用户是否具备权限
momentRouter.patch('/:momentsId',verifyAuth,verifyPermission,momentUpdata)

// 删除某个动态 
momentRouter.delete('/:momentsId',verifyAuth,verifyPermission,momentDelete)

// 给动态添加标签
momentRouter.post('/:momentsId/labels',verifyAuth,verifyPermission,verifyLabelExists,momentAddLabels)

// 动态配图获取
momentRouter.get('/images/:filename',fileInfo)

module.exports = momentRouter