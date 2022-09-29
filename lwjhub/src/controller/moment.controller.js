const fs = require('fs')

const momentService = require('../service/moment.service')
const fileService = require('../service/file.service')
const {
    PICTURE_PATH
} = require('../constants/file-path')

class MomentController {
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
        const momentsId = ctx.request.params.momentsId;
        console.log(momentsId);
        // 2.根据id去查询这条数据
        const result = await momentService.getMomentId(momentsId)
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
        const { momentsId } = ctx.params
        const { content } = ctx.request.body

        // 修改内容
        const result =await momentService.update(content,momentsId)
        
        ctx.body = result
    }

    async momentDelete(ctx, next) {
        const { momentsId } = ctx.params

        // 删除内容
        const result =await momentService.remove(momentsId)

        ctx.body = result
    }

    async momentAddLabels(ctx,next){
        // 1.获取标签和动态id
        const {labels} = ctx
        const {momentsId} = ctx.params

        // 2.添加所有的标签
        for (const label of labels) {
            // 2.1 判断标签是否已经和动态有过关系了
            const isExist = await momentService.hasLabel(momentsId,label.id)
            if(!isExist){
                await momentService.addLabel(momentsId,label.id)
            }
        }

        ctx.body = '给动态添加标签成功'
    }

    async fileInfo(ctx,next){
        let {filename} = ctx.params
        const fileInfo = await fileService.getFileByFilename(filename)
        const {type} = ctx.query
        const types = ["small","middle","large"]
        
        if(types.some(item => item === type)){
            filename = filename + '-'+ type
        }

        ctx.response.set('content-type',fileInfo.mimetype)
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }
}

module.exports = new MomentController()