// module.exports = {
//     "get /": async ctx => {
//         ctx.body = 'index page'
//     },
//     "get /detail": async ctx => {
//         ctx.body = 'detail page'
//     }
//  }

module.exports = app =>({
    "get /": app.$ctrl.home.index,
    "get /detail": app.$ctrl.home.detail
})