const Service = require('../service/phones.service')

class GoodsController{
    // 获取各种手机购买数据
    async phonePurchaseData(ctx,next){
        const result = await Service.getPhonePurchaseData()

        ctx.body = result
    }

    async phoneWeeklySalesData(ctx,next){
        const result = await Service.getPhoneWeeklySalesData()

        ctx.body = result
    }

    async xiaomiPhoneModelsPricedData(ctx,next){
        const result = await Service.getXiaomiPhoneModelsPricedData()

        ctx.body = result
    }
}

module.exports = new GoodsController()