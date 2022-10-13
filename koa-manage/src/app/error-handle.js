const errorType = require('../constants/error-type')

const errorHandler = (err,ctx)=>{
    let status,message

    switch (err.message) {
        default:
            status = 404
            message = 'NOT FOUND'
            break;
    }

    ctx.status = status
    ctx.body = message
}

module.exports = errorHandler