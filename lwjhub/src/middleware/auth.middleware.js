const jwt = require('jsonwebtoken')

const service = require('../service/user.service')
const errorType = require('../constants/error-type')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
    // 1.获取用户名和密码
    const { name, password } = ctx.request.body

    // 2.判断用户名和密码是否为空
    if (!name || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }

    // 3.判断用户是否存在(用户不存在)
    let result = await service.getUserByName(name)
    const user = result[0]
    if (!user) {
        const error = new Error(errorType.USER_NOT_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }

    // 4.判断密码是否和数据库中的密码是一致(加密)
    if (md5password(password) !== user.password) {
        const error = new Error(errorType.PASSWORD_IS_INCORRENT)
        return ctx.app.emit('error', error, ctx)
    }

    ctx.user = user;
    // console.log(ctx.user);

    await next()
}

const verifyAuth = async (ctx, next) => {
    // 1.获取token
    console.log('验证授权middleware');
    // 如果没有携带token报错
    if(!ctx.header.authorization){
        const error = new Error(errorType.UNAUTHORIZATION)
        return ctx.app.emit('error', error, ctx)
    }
    const authorization = ctx.header.authorization
    const token = authorization.replace("Bearer", "").trim()
    // console.log(authorization);
    // console.log(token);

    // 2.验证token(id/name/iat/exp)
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256'] //可以多个算法验证
        })
        ctx.user = result
    } catch (e) {
        const error = new Error(errorType.UNAUTHORIZATION)
        return ctx.app.emit('error', error, ctx)
    }
    
    await next()
}

// 验证是否有权限修改
const verifyPermission = async (ctx,next)=>{
    const { momentId } = ctx.params
    const { id } = ctx.user

    

    await next()
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}