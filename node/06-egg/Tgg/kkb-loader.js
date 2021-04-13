const fs = require('fs');
const path = require('path');
const Router = require('koa-router');


function loader(dir,cb){
   const url = path.resolve(__dirname,dir);
   const files = fs.readdirSync(url);
   files.forEach(filename=>{
       filename = filename.replace('.js','');
       const file = require(url + '/' + filename)
       cb(filename,file)
   })
}

function initRouter(app){
    const router = new Router();
    loader('routes',(filename,routes)=>{
       const prefix = filename === 'index' ? '' : `/${filename}`
       routes = typeof routes === 'function' ? routes(app) : routes;
    //    console.log('routes',routes)
       Object.keys(routes).forEach(key=>{
           const [method, path] = key.split(' ')
           console.log(`正在映射：${method.toLocaleUpperCase()} ${prefix}${path}`)
        //    router[method](prefix + path,routes[key])
           router[method](prefix + path, async ctx => {
               app.ctx = ctx;
               await routes[key](app)
           })
       })
    })
    return router
}

function initController(app){
    const controllers = {}
    loader('controller',(filename,controller)=>{
        // controller = typeof controller === 'function' ? controller(app) : controller;
        controllers[filename] = controller(app)
    })
    return controllers
}

function initService(){
    const services = {};
    loader('service',(filename,service)=>{
        services[filename] = service
    })
    return services
}


module.exports = { initRouter, initController, initService }