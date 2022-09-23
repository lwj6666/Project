const app = require('./app/index')
const {APP_PORT} = require('./app/config')
require('./app/database')

console.log(APP_PORT);

app.listen(APP_PORT,()=>{
    console.log(`服务器启动成功`);
})