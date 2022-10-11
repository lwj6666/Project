const Router = require('@koa/router')

const productUsersRouter =new Router({
    prefix:'/productUsers'
})

const {
    activeUserData,
    usersData,
    addUser,
    updateUser
} = require('../controller/productUsers.controller')

// 返回用户活跃表
productUsersRouter.get('/activeUser',activeUserData)

// 返回用户列表
productUsersRouter.get('/',usersData)

// 添加用户
productUsersRouter.post('/addUser',addUser)

// 更新用户信息
productUsersRouter.patch('/:id',updateUser)

module.exports = productUsersRouter