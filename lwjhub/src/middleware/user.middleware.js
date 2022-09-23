const errorType = require('../constants/error-type')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
    // 1.获取用户名和密码 
    const { name, password } = ctx.request.body
    console.log(name);
    console.log(password);

    // 2.判断用户名或者密码不能空
    if (!name || !password) {
        // 处理错误信息
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        console.log('发生一个错误');
        return ctx.app.emit('error', error, ctx)
    }

    // 3.判断这次注册的用户名是没有注册过
    const result = await service.getUserByName(name)
    console.log(result);
    if (result.length) {
        const error = new Error(errorType.USER_ALREADY_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }

    await next()
}

const handlePassword = async (ctx, next) => {
    let { password } = ctx.request.body;
    // password加密之后的密码
    // ctx.request.body.password = md5password(password)
    ctx.request.body.password = md5password(password)
    
    await next()
}

module.exports = {
    verifyUser,
    handlePassword
}