const Router = require('@koa/router')

const {
    phonePurchaseData,
    phoneDailySalesData
} = require('../controller/goods.controller')

const goodsRouter =new Router({
    prefix:'/goods'
})

goodsRouter.get('/phoneData',phonePurchaseData)
goodsRouter.get('/phoneDailySales',phoneDailySalesData)

module.exports = goodsRouter