const service = require('../service/comment.service')

class CommentController {
    // 发表动态评论
    async commentCreate(ctx, next) {
        const { momentId, content } = ctx.request.body
        const { id: userId } = ctx.user
        const result = await service.InsertIntoComment(content, userId, momentId)
        ctx.body = result
    }

    // 回复评论
    async commentReply(ctx, next) {    
        const commentId = ctx.params.commentId
        const { momentId, content } = ctx.request.body
        const { id: userId } = ctx.user
        const [result] = await service.ReplyToComments(content, userId, momentId, commentId)
        ctx.body = result
    }

    async commentUpdate(ctx, next) {
        const { commentId } = ctx.params
        const { content } = ctx.request.body

        const [result] = await service.EditComments(commentId,content)

        ctx.body = result
    }

    async commentRemove(ctx,next){
        const {commentId} = ctx.params

        const [result] = await service.RemoveComments(commentId)    

        ctx.body = result
    }

    // 获取某个动态的评论列表
    async commentList(ctx,next){
        const {momentId} = ctx.query
        
        const [result] = await service.getCommentsList(momentId)

        ctx.body = result
    }
}

module.exports = new CommentController()