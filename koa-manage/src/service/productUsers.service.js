const connection = require('../app/database')

class usersNewActive {
    async getactiveUserData() {
        const statement = `
        SELECT 
        date,newuser,activeuser
        FROM active_new_user`

        const [result] = await connection.execute(statement)

        return result
    }

    async getUsersData() {
        const statement = `SELECT 
        id,name,age,sex,brith,address
        FROM users 
        LIMIT 0,20`

        const [result] = await connection.execute(statement)

        return result
    }

    async addUserData(name, age, sex, brith, address) {
        const statement = `INSERT INTO users (name,age,sex,brith,address) VALUES (?,?,?,?,?)`

        const [result] = await connection.execute(statement, [name, age, sex, brith, address])

        return result
    }

    async updateUserData(userId,name, age, sex, brith, address) {
        const statement = `UPDATE users SET name = ?,age = ?,sex = ?,brith = ?,address = ? WHERE id = ?`

        const [result] = await connection.execute(statement, [name, age, sex, brith, address, userId])

        return result
    }
}

module.exports = new usersNewActive()