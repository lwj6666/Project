const Router = require('koa-router')

const fileRouter = new Router({prefix:'/upload'})

const { 
    verifyAuth 
} = require('../middleware/auth.middleware')
const {
    avatarHandler,
    pictureHandler,
    pictureResize
} = require('../middleware//file.middleware')
const {
    saveAvatarInfo,
    savePictureInfo
} = require('../controller/file.controller')

// 中间件(登录验证、保存图像) 控制器(保存图像信息)
fileRouter.post('/avatar',verifyAuth,avatarHandler,saveAvatarInfo)

// 动态配图
fileRouter.post('/picture',verifyAuth,pictureHandler,pictureResize,savePictureInfo)

module.exports = fileRouter