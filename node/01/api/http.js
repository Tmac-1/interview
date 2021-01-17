const fs = require('fs');
const http = require('http');
const server = http.createServer((req,res)=>{
    // console.log(('this is a request'),getPrototypeChain(req))
    // res.end('hello end')
    const { url, method, headers } = req;
    if(url === '/' && method === 'GET') {
        fs.readFile('index.html',(err,data)=>{
            if(err){
                res.writeHead(500,{
                    'Conetent-Type':'text/plain;charset=utf-8'
                })
                res.end('500 服务器挂了')
                return
            }
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html')
            res.end(data)
        })
    }else if(url == '/users' && method == 'GET'){
        res.writeHead(200,{
            'Conetent-Type':'application/json'
        })
        res.end(JSON.stringify([{name:'tom'}]))
    }else if( method === 'GET' && headers.accept.indexOf('image/*') !== -1){
        fs.createReadStream('.'+url).pipe(res)  // 以流的方式读取图片
    }else{
        res.statusCode = 404
        res.setHeader('Conetent-Type','text/plain;charset=utf-8')
        res.end('页面不存在')
    }
})

server.listen(3000,()=>{
    console.log('server start')
})


function getPrototypeChain(obj){
    const protoChain = []
    while(obj = Object.getPrototypeOf(obj)){
        protoChain.push(obj)
    }
    return protoChain
}