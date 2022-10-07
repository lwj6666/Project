const fs = require('fs')

const useRoutes = function () {
    // 读取当前文件目录
    fs.readdirSync(__dirname).forEach(filename => {
        if (filename === 'index.js') return;
        const router = require(`./${filename}`)
        this.use(router.routes())
        // 没有设置其他方法的话，返回方法没设置
        this.use(router.allowedMethods())
    })
}

module.exports = useRoutes