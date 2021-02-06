module.exports = {
    "get /": async ctx => {
        ctx.body = 'index page'
    },
    "get /detail": ctx => {
        ctx.body = 'detail page'
    }
 }