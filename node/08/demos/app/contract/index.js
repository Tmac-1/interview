module.exports = {
  baseRequest: {
    id: {
      type: "string",
      decsripition: "id 唯一键",
      require: true,
      example: "1",
    },
  },
  baseResponse: {
    code: {
      type: "integer",
      require: true,
      example: 0,
    },
    data: {
      type: "string",
      example: "请求成功",
    },
    errMessage: {
      type: "string",
      example: "请求失败",
    },
  },
};
