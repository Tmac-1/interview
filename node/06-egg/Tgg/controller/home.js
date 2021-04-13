module.exports = app => ({
    index : async ctx => {
    //    console.log(app.$service)
        const name = await app.$service.user.getName()
        app.ctx.body = 'index page CTRL' + name
    },
    detail:  ctx => {
        app.ctx.body = 'detail page CTRL'
    }
 })