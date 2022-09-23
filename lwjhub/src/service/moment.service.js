const connection = require('../app/database')

const sqlFrangment = `
    SELECT 
        m.id id,m.content content,m.creatAt createTime,m.updataAt updateTime,
        JSON_OBJECT('id',users.id,"name",users.name) user
    FROM moments m
    LEFT JOIN users ON m.user_id = users.id
`

class MomentService {
    async insertIntoContent(useId, content) {
        const statement = `INSERT INTO moments (content,user_id) VALUES (?,?);`

        const result = await connection.execute(statement, [content, useId])

        return result[0]
    }

    async getMomentId(useId) {
        const statement = `
        ${sqlFrangment}
        WHERE m.id = ?
        `

        const result = await connection.execute(statement, [useId])

        return result[0]
    }

    async getMomentList(size, offset) {
        const statement = `
        ${sqlFrangment}
        LIMIT ? OFFSET ?
        `

        const result = await connection.execute(statement, [size, offset])

        return result[0]
    }
}

module.exports = new MomentService()