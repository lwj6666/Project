const connection = require('../app/database')

class CommentService{
    async InsertIntoComment(content,userId,momentId){
        const statement = `INSERT INTO comment (content,user_id,moment_id) VALUES(?,?,?)`

        const result =await connection.execute(statement,[content,userId,momentId])

        return result[0]
    }

    async ReplyToComments(content,userId,momentId,commentId){
        const statement = `INSERT INTO comment (content,user_id,moment_id,comment_id) VALUES(?,?,?,?)`

        const result =await connection.execute(statement,[content,userId,momentId,commentId])

        return result
    }

    async EditComments(commentId,content){
        const statement = `UPDATE comment SET content = ? WHERE id = ?`

        const result = await connection.execute(statement,[content,commentId])

        return result
    }

    async RemoveComments(commentId){
        const statement = `DELETE FROM comment WHERE id=?;`

        const result = await connection.execute(statement,[commentId])

        return result
    }

    // 获取某个动态的评论列表
    async getCommentsList(momentId){
        const statement = `SELECT 
            c.id id,c.content content,c.comment_id commentId,creatAt createTime,
            JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt) user
        FROM comment c
        LEFT JOIN users u ON c.user_id = u.id
        WHERE c.moment_id = ?`

        const result = connection.execute(statement,[momentId])

        return result 
    }
}

module.exports = new CommentService()