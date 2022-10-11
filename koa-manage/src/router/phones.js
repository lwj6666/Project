const Router = require('@koa/router')

const {
    phonePurchaseData,
    phoneWeeklySalesData,
    xiaomiPhoneModelsPricedData
} = require('../controller/phones.controller')

const phonesRouter =new Router({
    prefix:'/phones'
})

// 获取各类手机购买数据
phonesRouter.get('/phoneData',phonePurchaseData)
// 获取各类手机周销量
phonesRouter.get('/phoneWeeklySales',phoneWeeklySalesData)

// 获取小米手机各型号定价
phonesRouter.get('/xiaomiPhoneModelsPriced',xiaomiPhoneModelsPricedData)

module.exports = phonesRouter