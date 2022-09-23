const crypto = require('crypto') //node自带库

/**
 * 密码加密
 */
const md5password = (password) => {
    //创建哈希加密算法，后边可以是md5，sha1,sha256等
    let md5 = crypto.createHash('md5')
    return md5.update(password).digest('hex')
}

module.exports = md5password