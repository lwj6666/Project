const Service = require('../service/productUsers.service')

class usersNewActive {
    async activeUserData(ctx, next) {
        const result = await Service.getactiveUserData()

        ctx.body = result
    }

    async usersData(ctx, next) {
        // 处理分页查询数据

        const result = await Service.getUsersData()

        ctx.body = result
    }

    async addUser(ctx, next) {
        const { name, age, sex, brith, address } = ctx.request.body

        const result = Service.addUserData(name, age, sex, brith, address)
        
        ctx.body = "添加用户成功"
    }

    async updateUser(ctx,next){
        const {id:userId} = ctx.request.params
        const { name, age, sex, brith, address } = ctx.request.body

        const result = Service.updateUserData(userId,name, age, sex, brith, address)

        ctx.body = "更新用户成功"
    }
}

module.exports = new usersNewActive()