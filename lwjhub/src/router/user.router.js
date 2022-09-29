const Router = require('koa-router')
const {
    create,
    avatarInfo
} = require('../controller/user.controller')
const {
    verifyUser,
    handlePassword
} = require('../middleware/user.middleware')

const UsersRouter = new Router({ prefix: '/users' }) 

UsersRouter.post('/',verifyUser,handlePassword,create)

// 展示头像
UsersRouter.get('/:userId/avatar',avatarInfo)

module.exports = UsersRouter