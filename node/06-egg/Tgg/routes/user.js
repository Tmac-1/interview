module.exports = {
   "get /": async app => {
       const name = await app.$service.user.getName()
       app.ctx.body = 'user page' + name
   },
   "get /info":  app => {
       app.ctx.body = 'userinfo page' + app.$service.user.getAge()
   }
}