const fs = require('fs')

const userservice = require('../service/user.service')
const fileService = require('../service/file.service')
const { 
    AVATAR_PATH
} = require('../constants/file-path')

class UserController{
    async create(ctx,next){
        // 获取用户请求传递的参数
        const user = ctx.request.body

        // 查询数据
        const result =await userservice.create(user)

        // 返回数据
        ctx.body = result
    }

    async avatarInfo(ctx,next){
        // 1.获取用户id
        const {userId} = ctx.params

        const avatarInfo = await fileService.getAvatarByUserId(userId)

        // 2.提供图像信息
        // 普通文件下载直接这样就行了 fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
        ctx.response.set('content-type',avatarInfo.mimetype) //设置这个浏览器帮你展示
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
    }
}

module.exports = new UserController()