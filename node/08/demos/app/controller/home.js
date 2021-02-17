'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let res = { aaa: 111}
    ctx.helper.success({ctx,res})
    // ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
