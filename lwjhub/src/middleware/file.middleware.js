const Multer = require('@koa/multer')
const Jimp = require('jimp')
const path = require('path')

const {
    AVATAR_PATH,
    PICTURE_PATH
} = require('../constants/file-path')

const avatarUpload = Multer({
    dest: AVATAR_PATH
})
const pictureUpload = Multer({
    dest: PICTURE_PATH
})


// 单传
const avatarHandler = avatarUpload.single('avatar')

const pictureHandler = pictureUpload.array('picture',9)

const pictureResize = async (ctx,next)=>{
    // 1.获取所有图像信息
    const files = ctx.files;
    // {
    //     fieldname: 'picture',
    //     originalname: 'roadmap-完整路线.jpeg',
    //     encoding: '7bit',
    //     mimetype: 'image/jpeg',
    //     destination: './uploads/picture',
    //     filename: '2d58c09dda179f7a938006e2b68e8146',
    //     path: 'uploads\\picture\\2d58c09dda179f7a938006e2b68e8146',
    //     size: 1588453
    //   }

    // 2.对图像进行处理(sharp/jimp)
    for (let file of files) {
        const destPath = path.join(file.destination,file.filename)
        // 异步先返回在慢慢处理文件
        Jimp.read(file.path).then(image =>{
            image.resize(1280,Jimp.AUTO).write(`${destPath}-large`)
            image.resize(640,Jimp.AUTO).write(`${destPath}-middle`)
            image.resize(320,Jimp.AUTO).write(`${destPath}-small`)
        })
    }

    await next()
}

module.exports = {
    avatarHandler,
    pictureHandler,
    pictureResize
}