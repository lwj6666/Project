const Router = require("koa-router")

const autoRouter = new Router()

const {
    login,
    success
} = require('../controller/auth.controller')
const { 
    verifyLogin,
    verifyAuth
} = require("../middleware/auth.middleware")


autoRouter.post('/login',verifyLogin,login)
autoRouter.get('/test',verifyAuth,success)

module.exports = autoRouter