module.exports = {
    cerateUserRequest: {
      mobile: {
        type: "string",
        decsripition: "手机号",
        require: true,
        example: "18811112222",
        format: /^1[34578]\d{9}$/
      },
      password: {
        type: "string",
        decsripition: "密码",
        require: true,
        example: "123456",
      },
      realName: {
        type: "string",
        decsripition: "姓名",
        require: true,
        example: "Tom",
      },
    }
  };
  