const Router = require('koa-router')

const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')
const {
    commentCreate,
    commentReply,
    commentUpdate,
    commentRemove,
    commentList
} =require('../controller/comment.controller')
const { verify } = require('jsonwebtoken')


const commentRouter = new Router({prefix: '/comment'})

// 对动态发表评论
commentRouter.post('/',verifyAuth,commentCreate)
 
// 对评论回复
commentRouter.post('/:commentId/reply',verifyAuth,commentReply)

// 修改评论
commentRouter.patch('/:commentId',verifyAuth,verifyPermission,commentUpdate)

// 删除评论
commentRouter.delete('/:commentId',verifyAuth,verifyPermission,commentRemove)

// 获取某个动态的评论列表
commentRouter.get('/',commentList)

module.exports = commentRouter

