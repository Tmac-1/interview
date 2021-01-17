#!/usr/bin/env node
console.log('cli ....tmac')

const program = require('commander')
program.version(require('../package.json').version) // 打印版本
program.command('init <name>')
       .description('init project')
    //    .action(name => {
    //        console.log('init' + name)
    //    })
      .action(require('../lib/init'))

program.command('refresh')
        .description('refresh')
        .action(require('../lib/refresh'))

program.parse(process.argv)  // 解析运行环境和参数
//解释器，告诉用nodejs环境运行，记得先执行npm link 建立软链接，相当于全局安装了一个包