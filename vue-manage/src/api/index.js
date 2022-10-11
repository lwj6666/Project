import http from '../utils/request'

// 手机数据
const getData = ()=>{
    // 返回promise对象
    return http.get('/phones/phoneData')
}

// 获取各类手机周销量
const getphoneWeeklySales = ()=>{
    return http.get('/phones/phoneWeeklySales')
}

// 获取小米手机各型号定价
const getxiaomiPhoneModelsPricedData = ()=>{
    return http.get('/phones/xiaomiPhoneModelsPriced')
}

// 新老用户
const getactiveUserData = ()=>{
    return http.get('/productUsers/activeUser')
}

// 用户信息
const getUsersData = ()=>{
    return http.get('/productUsers')
}

// 添加用户信息
const addUserData = (data)=>{
    return http.post('/productUsers/addUser',data)
}

// 更新用户信息
const updateUserData = (userId,data)=>{
    return http.patch(`/roductUsers/${userId}`,data)
}

export {
    getData,
    getphoneWeeklySales,
    getactiveUserData,
    getxiaomiPhoneModelsPricedData,
    getUsersData,
    addUserData,
    updateUserData
}