const connection = require('../app/database')

class FileService{
    async createAvatar(filename,mimetype,size,user_id){
        const statement = `INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?)`

        const [result] = await connection.execute(statement,[filename,mimetype,size,user_id])

        return result
    }

    async getAvatarByUserId(userId){
        const statement = `SELECT * FROM avatar WHERE user_id = ?`

        const [result] = await connection.execute(statement,[userId])

        return result[0]
    }

    async createfile(filename,mimetype,size,userId,momentId){
        const statement = `INSERT INTO file (filename,mimetype,size,user_id,moment_id) VALUES (?,?,?,?,?)`

        const [result] = await connection.execute(statement,[filename,mimetype,size,userId,momentId])

        return result
    }

    async getFileByFilename(filename){
        const statement = `SELECT * FROM file WHERE filename = ?`

        const [result] = await connection.execute(statement,[filename])

        return result[0]
    }
}

module.exports = new FileService()