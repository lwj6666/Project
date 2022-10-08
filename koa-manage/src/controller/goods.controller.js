const goodsService = require('../service/goods.service')

class GoodsController{
    // 获取各种手机购买数据
    async phonePurchaseData(ctx,next){
        const result = await goodsService.getPhonePurchaseData()
        ctx.set('Access-Control-Allow-Origin','*')
        ctx.body = result
    }

    async phoneDailySalesData(ctx,next){
        const result = await goodsService.getphoneDailySalesData()
        ctx.set('Access-Control-Allow-Origin','*')
        ctx.body = result
    }
}

module.exports = new GoodsController()