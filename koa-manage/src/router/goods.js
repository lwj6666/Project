const Router = require('@koa/router')

const {
    phonePurchaseData
} = require('../controller/goods.controller')

const goodsRouter =new Router({
    prefix:'/goods'
})

goodsRouter.get('/phoneData',phonePurchaseData)

module.exports = goodsRouter