const Router = require('koa-router')
const {
    create
} = require('../controller/user.controller')
const {
    verifyUser,
    handlePassword
} = require('../middleware/user.middleware')

const UsersRouter = new Router({ prefix: '/users' }) 

UsersRouter.post('/',verifyUser,handlePassword,create)


module.exports = UsersRouter