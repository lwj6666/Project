const connection = require('../app/database')

class AuthService {
    async checkResource(tableName,resourceId, useId) {
        const statement = `SELECT * FROM ${tableName} where id = ? AND user_id = ?`

        const [result] = await connection.execute(statement,[resourceId,useId])

        return result.length === 0 ? false : true
    }
}

module.exports = new AuthService()