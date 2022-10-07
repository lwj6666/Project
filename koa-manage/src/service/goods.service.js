const connection = require('../app/database')

class goodsService {
    async getPhonePurchaseData() {
        const statement = `SELECT name,todayBuy,monthBuy,totalBuy FROM phone_buy;`

        const [result] = await connection.execute(statement)

        return result
    }
}

module.exports = new goodsService()