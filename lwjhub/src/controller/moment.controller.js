const momentService = require('../service/moment.service')

class Moment {
    async createmoment(ctx, next) {
        // 1.获取数据(user_id,content)
        const userId = ctx.user.id
        const content = ctx.request.body.content
        console.log(userId, content);

        // 2.将数据插入数据库中
        const result = await momentService.insertIntoContent(userId, content)
        ctx.body = result
    }

    async momentDatail(ctx, next) {
        // 1.获取数据(momentId)
        const momentId = ctx.request.params.momentId;
        console.log(momentId);
        // 2.根据id去查询这条数据
        const result = await momentService.getMomentId(momentId)
        console.log(result);
        ctx.body = result
    }

    async momentList(ctx, next) {
        // 获取分页信息(offset/size)
        const { offset, size } = ctx.query

        // 根据分页信息进行分页查询
        const result = await momentService.getMomentList(size, offset)

        ctx.body = result
    }

    async momentUpdata(ctx, next) {
        const { momentId } = ctx.params
        const { content } = ctx.request.body
        const { id } = ctx.user

        ctx.body = 'test'
    }
}

module.exports = new Moment()