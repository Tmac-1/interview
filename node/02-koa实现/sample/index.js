const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router');

var router = new Router();

app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const end = Date.now()
    console.log(`请求${ctx.url} 耗时${parseInt(end - start)}ms`)
})

// app.use((ctx, next) => {
//     const expire = Date.now() + 102
//     while(Date.now() < expire) {}
//     ctx.body = {
//         name: 'tom'
//     }
// })

router.get('/test',(ctx, next) => {
    //   ctx.body = 'hello test'
    ctx.body = {
        errorCode: 1,
        data: {
            name: 111
        }
    }
})

//使用路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('koa start')
})