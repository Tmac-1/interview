const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

/**
 * koa框架的业务流程是一个完全的异步编程模型，通过ctx上下文对象来贯穿http的上下游。
 * 所有的请求经过一个中间件的时候都会执行两次，对比 Express 形式的中间件，Koa 的模型可以非常方便的实现后置处理逻辑
 * https://blog.csdn.net/weixin_44287796/article/details/90702913
 * */ 
class Koa {
    constructor(){
        this.middlewares = []
    }
    listen(...arg) {
        // 创建http服务
        const server = http.createServer(async (req, res) => {
            let ctx = this.createContext(req,res)
            // this.callback(ctx)
            const fn = this.compose(this.middlewares)
            await fn(ctx)
            res.end(ctx.body)
        })
        // 启动监听
        server.listen(...arg)
    }
    // use(callback) {
    //     this.callback = callback
    // }
    use(middleware){
        this.middlewares.push(middleware)
    }
    compose(middlewares) {
        return function (ctx) {
            return dispatch(0)
    
            function dispatch(i) {
                let fn = middlewares[i]
                if (!fn) {
                    return Promise.resolve()
                }
                return Promise.resolve(
                    fn(ctx,function next() {
                        return dispatch(i + 1)
                    })
                )
            }
        }
    }
    // 创建上下文
    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
}

module.exports = Koa