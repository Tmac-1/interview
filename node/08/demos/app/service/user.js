const {Service} = require('egg');

class UserService extends Service {
    /**
     * 创建数据库
     * @param {any} payload
     * @returns {any}
     */
    async create(payload){
        const {ctx}=this;
        payload.password = await this.ctx.genHash(payload.password);
        return ctx.modal.User.create(payload)
    }
}

module.exports =  UserService 