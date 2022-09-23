const connection = require('../app/database')

class UserService{
    async create(user){
        const {name,password} = user
        const statement = `INSERT INTO users (name,password) VALUES (?,?)`

        // 将user储存到数据库中
        const result = await connection.execute(statement,[name,password])

        return result[0]
    }

    async getUserByName(name){
        const statement = `SELECT * FROM users WHERE name = ?`

        const result = await connection.execute(statement,[name])

        return result[0]
    }
}

module.exports = new UserService()

   