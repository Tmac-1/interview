
const Controller = require('egg').Controller;


/**
 * @Controller 用户管理
 * @returns {any}
 */
class UserController extends Controller {
//   async index() {
//     const { ctx } = this;
//     ctx.body = 'hi, egg';
//   }
  /**
   * @summary 创建用户
   * @decsripition 创建用户 记录用户账号信息
   * @router post /api/user 
   * @request body cerateUserRequest *body
   * @response 200 baseResponse 创建成功
   * @returns {any}
   */
  async create() {
      const { ctx,service } = this;
      ctx.validate(ctx.rule.cerateUserRequest)
      // 组装参数
      const payload = ctx.request.body || {}
      // 调用service
      const res = await service.user.create(payload)
      ctx.helper.success({ctx,res})
    //   ctx.body = "user ctrl"
  }
}

module.exports = UserController;
