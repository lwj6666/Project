import http from '../utils/request'

// 请求首页数据
const getData = ()=>{
    // 返回promise对象
    return http.get('/goods/phoneData')
}

const getphoneDailySales = ()=>{
    return http.get('/goods/phoneDailySales')
}

export {
    getData,
    getphoneDailySales
}