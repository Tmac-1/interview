module.exports = {
   "get /": async ctx => {
       ctx.body = 'user page'
   },
   "get /info": ctx => {
       ctx.body = 'userinfo page'
   }
}