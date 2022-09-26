const connection = require('../app/database')

class MomentService {
    async insertIntoContent(useId, content) {
        const statement = `INSERT INTO moments (content,user_id) VALUES (?,?);`

        const result = await connection.execute(statement, [content, useId])

        return result[0]
    }

    async getMomentId(useId) {
        const statement = `
        SELECT 
            m.id id,m.content content,m.creatAt createTime,m.updataAt updateTime,
            JSON_OBJECT('id',users.id,"name",users.name) user
        FROM moments m
        LEFT JOIN users ON m.user_id = users.id
        WHERE m.id = ?
        `

        // 2.请求动态的接口的时候,就会一起携带评论的列表(缺点：1.sql相对复杂 2.信息会很多) 
        // SELECT 
  		// m.id id,m.content content,m.creatAt createTime,m.updataAt updateTime,
  		// JSON_OBJECT('id',users.id,"name",users.name) user,
  		// JSON_ARRAYAGG(
  		// 	JSON_OBJECT('commentId',c.id,'commentContent',c.content,'createTime',c.creatAt,
 		// 							'user',JSON_OBJECT('id',cu.id,'name',cu.name))
  		// ) comments
        // FROM moments m
        // LEFT JOIN users ON m.user_id = users.id
        // LEFT JOIN comment c ON m.id = c.moment_id
        // LEFT JOIN users cu ON c.user_id = cu.id
        // WHERE m.id = ?


        const result = await connection.execute(statement, [useId])

        return result[0]
    }

    async getMomentList(size, offset) {
        const statement = `
        SELECT 
		    m.id id,m.content content,m.creatAt createTime,m.updataAt updateTime,
		JSON_OBJECT('id',users.id,"name",users.name) user,
		(SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) numberOfMoments
        FROM moments m
        LEFT JOIN users ON m.user_id = users.id
        `

        const result = await connection.execute(statement, [size, offset])

        return result[0]
    }

    async update(content, momentId) {
        const statement = `UPDATE moments SET content = ? WHERE id = ?;`

        const [result] = await connection.execute(statement, [content, momentId])

        return result
    }

    async remove(momentId) {
        const statement = `DELETE FROM moments WHERE id=?;`

        const [result] = await connection.execute(statement, [momentId])

        return result
    }
}

module.exports = new MomentService()