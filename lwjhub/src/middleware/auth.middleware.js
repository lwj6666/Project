const jwt = require('jsonwebtoken')

const service = require('../service/user.service')
const errorType = require('../constants/error-type')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')
const authService = require('../service/auth.service')

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
    if (!ctx.header.authorization) {
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

/**
 * 1.很多的内容都需要验证权限：修改/删除动态，修改/删除评论
 * 2.接口：业务接口系统/后台管理系统
 *  一对一：user -> role 
 *  多对多：role -> menu(删除动态/修改动态)
 */
// 验证是否有权限修改
// 闭包思路传tableName
// const verifyPermission = (tableName) =>{
//     return async (ctx, next) => {
//         console.log('验证权限');

//         // 1.获取参数
//         const { momentId } = ctx.params
//         const { id } = ctx.user

//         // 2.查询是否具备权限
//         try {
//             const isPermission = await authService.checkResource(tableName,momentId, id)
//             if (!isPermission) throw new Error()
//         } catch (err) {
//             const error = new Error(errorType.UNPERMISSION)
//             return ctx.app.emit('error', error, ctx)
//         }

//         await next()
//     }
// }
// 根据RestFul路径风格
const verifyPermission = async (ctx, next) => {
    console.log('验证权限');

    // 1.获取参数
    const [resourceKey] = Object.keys(ctx.params)
    const tableName = resourceKey.replace('Id', '')
    const resourceId = ctx.params[resourceKey]
    const { id } = ctx.user

    // 2.查询是否具备权限
    try {
        const isPermission = await authService.checkResource(tableName, resourceId, id)
        if (!isPermission) throw new Error()
    } catch (err) {
        const error = new Error(errorType.UNPERMISSION)
        return ctx.app.emit('error', error, ctx)
    }

    await next()
}


module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}