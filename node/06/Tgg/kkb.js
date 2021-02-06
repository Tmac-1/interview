const Koa = require('koa');

const {initRouter}=require('./kkb-loader')

class kkb {
    constructor(conf){
        this.$app = new Koa(conf)
        this.$router = initRouter()
        this.$app.use(this.$router.routes())
    }
    start(port){}
}