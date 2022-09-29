const connection = require('../app/database')

class LabelService {
    async createLabel(name) {
        const statement = `INSERT INTO label (name) VALUE (?)`

        const [result] = await connection.execute(statement, [name])

        return result
    }

    async getLabelByName(name) {
        const statement = `SELECT * FROM label WHERE name = ?;`

        const [result] = await connection.execute(statement, [name])

        return result[0]
    }

    async getLabels(limit,offset){
        const statement = `SELECT * FROM label LIMIT ? OFFSET ?; `

        const [result] = await connection.execute(statement, [limit,offset])

        return result
    }
}

module.exports = new LabelService()