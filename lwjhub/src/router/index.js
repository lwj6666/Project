const fs = require('fs')

const useRoutes = function(){
    // 读取当前文件目录
    fs.readdirSync(__dirname).forEach(file =>{
        if(file === 'index.js') return;
        const router = require(`./${file}`)
        this.use(router.routes())
        this.use(router.allowedMethods())
    })
}

module.exports = useRoutes
