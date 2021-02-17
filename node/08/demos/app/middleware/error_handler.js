module.exports = (option,app) => {
    return async function(ctx,next) {
        try {
            await next()
        }catch(err){
            // app异常触发err事件
            app.emit('error',err,this)
            const status = err.status || 500 ;
            // 判断是否是生产环境
            const error = status == 500 && app.config.env == 'prod' ? 'Internal Server Error' : err.message;
            ctx.body = {
                code: status,
                error: error
            }
            if(status == 422){
                ctx.body.detail =err.errors
            }
            ctx.status === 200
        }
    }
}