const connection = require('../app/database')

class goodsService {
    async getPhonePurchaseData() {
        const statement = `SELECT name,todayBuy,monthBuy,totalBuy FROM phone_buy;`

        const [result] = await connection.execute(statement)

        return result
    }

    async getPhoneWeeklySalesData() {
        const statement = `
        SELECT 
        p.name,JSON_ARRAYAGG(JSON_OBJECT('sale',pd.sale,'date',pd.date)) sale_info
        FROM phone p
        LEFT JOIN phone_daily_sales pd ON p.id = pd.phone_id
        GROUP BY p.id;`

        const [result] = await connection.execute(statement)

        return result
    }

    async getXiaomiPhoneModelsPricedData(){
        const statement = `
        SELECT 
        pt.name,pt.value
        FROM phone p
        RIGHT JOIN phone_type pt ON p.id=pt.phone_id`
        
        const [result] = await connection.execute(statement)

        return result
    }
}

module.exports = new goodsService()