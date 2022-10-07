const goodsService = require('../service/goods.service')

class GoodsController{
    // 获取各种手机购买数据
    async phonePurchaseData(ctx,next){
        const result = await goodsService.getPhonePurchaseData()

        ctx.body = result
    }
}

module.exports = new GoodsController()