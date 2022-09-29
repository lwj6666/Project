const connection = require('../app/database')

class MomentService {
    async insertIntoContent(useId, content) {
        const statement = `INSERT INTO moments (content,user_id) VALUES (?,?);`

        const result = await connection.execute(statement, [content, useId])

        return result[0]
    }

    async getMomentId(useId) {
        // const statement = `
        // SELECT 
        //     m.id id,m.content content,m.creatAt createTime,m.updataAt updateTime,
        //     JSON_OBJECT('id',users.id,"name",users.name) user
        // FROM moments m
        // LEFT JOIN users ON m.user_id = users.id
        // WHERE m.id = ?
        // `

        // 2.请求动态的接口的时候,就会一起携带评论的列表(缺点：1.sql相对复杂 2.信息会很多) 
        const statement = `
            SELECT 
                m.id id,m.content content,m.creatAt createTime,m.updataAt updateTime,
                JSON_OBJECT('id',users.id,"name",users.name) author,
                IF(COUNT(l.id),JSON_ARRAYAGG(
                    JSON_OBJECT('id',l.id,'name',l.name)
                ),NULL) labels,
                (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
                    JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.creatAt,
                                                'user',JSON_OBJECT('id',cu.id,'name',cu.name))
                    ),NULL) 
                FROM comment c 
                LEFT JOIN user cu ON c.user_id = cu.id 
                WHERE m.id =c.moment_id) comments,
                (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename)) 
			    FROM file WHERE m.id = file.moment_id) images
            FROM moments m
            LEFT JOIN users ON m.user_id = users.id
            LEFT JOIN moment_label ml ON m.id = ml.moment_id
            LEFT JOIN label l ON ml.label_id = l.id
            WHERE m.id = ?
            GROUP BY m.id
        `

        const result = await connection.execute(statement, [useId])

        return result[0]
    }

    async getMomentList(size, offset) {
        const statement = `
        SELECT 
		    m.id id,m.content content,m.creatAt createTime,m.updataAt updateTime,
		    JSON_OBJECT('id',users.id,"name",users.name) user,
		    (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) numberOfMoments,
            (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) numberOfLabels,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename)) 
			FROM file WHERE m.id = file.moment_id) images
        FROM moments m
        LEFT JOIN users ON m.user_id = users.id
        LIMIT ?,?;
        `

        const result = await connection.execute(statement, [offset,size])
        
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

    // 动态是否有过标签
    async hasLabel(momentId,labelId){
        const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`

        const [result] = await connection.execute(statement,[momentId,labelId])

        return result[0] ? true : false
    }

    // 给动态添加标签
    async addLabel(momentId,labelId){
        const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES (?,?)`

        const [result] = await connection.execute(statement,[momentId,labelId])

        return result
    }
}

module.exports = new MomentService()