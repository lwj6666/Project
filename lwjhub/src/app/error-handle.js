const errorType = require('../constants/error-type')

const errorHandler = (error, ctx) => {
    let status, message;

    switch (error.message) {
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400//Bad Request
            message = '用户名或者密码不能为空'
            break;
        case errorType.USER_ALREADY_EXISTS:
            status = 409//conflict
            message = '用户名已被占用'
            break;
        case errorType.USER_NOT_EXISTS:
            status = 400//参数错误
            message = '用户名不存在'
            break;
        case errorType.PASSWORD_IS_INCORRENT:
            status = 400//参数错误
            message = '密码错误'
            break;
        case errorType.UNAUTHORIZATION:
            status = 401//未经授权
            message = '无效的token~'
            break;
        case errorType.UNPERMISSION:
            status = 401 //未经授权
            message = '您不具备操作的权限'
            break;
        default:
            status = 404
            message = 'NOT FOUND'
            break;
    }

    console.log(error.message)

    ctx.status = status
    ctx.body = message
}

module.exports = errorHandler