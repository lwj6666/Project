const fileservice = require('../service/file.service')
const userservice = require('../service/user.service')

const {
    AVATAR_PATH
} = require('../constants/file-path')
const {
    APP_HOST,
    APP_PORT,
} = require('../app/config')
const fileService = require('../service/file.service')

class FileController {
    async saveAvatarInfo(ctx, next) {
        // 1.获取图形相关信息
        const { mimetype, filename, size } = ctx.file
        const { id: userId } = ctx.user

        // 2.将图像信息数据保存到数据库中
        const result = await fileservice.createAvatar(filename, mimetype, size, userId)

        // 3.将图片地址保存到user表中
        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${userId}/avatar`
        await userservice.updateAvatarUrlById(userId, avatarUrl)

        // 4.返回结果
        ctx.body = '上传成功'
    }

    async savePictureInfo(ctx, next) {
        // 1.获取图像信息
        const files = ctx.files
        const { id: userId } = ctx.user
        const { momentId } = ctx.query
        // console.log(momentId,userId);

        // 2.将所有文件信息保存到数据库中
        for (let file of files) {
            const { filename, mimetype, size } = file
            await fileService.createfile(filename, mimetype,size,userId,momentId)
        }

        ctx.body = '动态配图上传完成'
    }
}

module.exports = new FileController()