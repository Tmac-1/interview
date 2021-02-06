// const http = require('http');

// const server = http.createServer((req,res)=>{
//     res.writeHead(200)
//     res.end('Hi Tmac')
// })

// server.listen(3000,()=>{
//     console.log('listen 3000')
// })

const Koa = require('./koa')
const app = new Koa()

// app.use((req,res)=>{
//      res.writeHead(200)
//      res.end('HI Koa')
// })

function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 2000)
    })
}

// app.use(ctx => {
//     ctx.body = "HI CTx"
// })

app.use(async (ctx,next)=>{
    ctx.body = "1";
    await next()
    ctx.body += "5";
})
app.use(async (ctx,next)=>{
    ctx.body += "2";
    await delay()
    await next()
    ctx.body += "4";
})

app.use(async (ctx,next)=>{
    ctx.body += "3";
})



app.listen(3000, () => {
    console.log('listen start')
})