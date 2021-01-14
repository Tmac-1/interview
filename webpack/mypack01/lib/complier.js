const {getAst,getCode,getDependencies} = require('./parser.js');
const path = require('path');
const fs = require('fs')

module.exports = class Complier {
    constructor(options) {
        // console.log(options)
        this.entry = options.entry;
        this.output = options.output;
        this.modules = [];
    }
    run() {
      const info = this.build(this.entry);
      this.modules.push(info)
      for(let i=0; i<this.modules.length;i++){
          const item = this.modules[i];
          const { dependcies } = item;
          if(dependcies){
              for(let j in dependcies){ // 递归分析依赖
                  this.modules.push(this.build(dependcies[j]))
              }
          }
      }
      // 转换数据结构  
      let obj = {}
      this.modules.forEach(item => {
          obj[item.filename] = {
              dependcies: item.dependcies,
              code: item.code
          }
      })
      // console.log(obj)
      //  生成文件
      this.file(obj)
    }
    /**
     * 入口文件
     * 入口文件引用的模块
     *   引入路径
     *   在项目中的路径
     * 可以在浏览器执行的代码
     * */ 
    build(entryFile) {
    //   console.log('entryFile',entryFile)
      let ast = getAst(entryFile);
      let dependcies = getDependencies(ast, entryFile);
      let code = getCode(ast)
    //   console.log(code)
      return {
          filename:entryFile,
          dependcies,
          code
      }
      
    }
    /**
     * 生成文件
     * */ 
    file(code){
        // 获取输出信息 ../dist/main.js
        /**
         *  对require函数的理解
         *  1. code 里面有require函数，会执行，相当于require->localRequire函数执行了
         *  2. 并且code里面有exports对象，方法会赋值在exports对象上，所以require函数执行返回一个exports
         *     对象，这样require引用时候就得到一个新对象，就能执行对象下面的方法
         * */ 
        const filePath = path.join(this.output.path,this.output.filename)
        const newCode = JSON.stringify(code)
        const bundle = `(function(graph){
            
            function require(module){

              function localRequire(relativePath){
                  return require(graph[module].dependcies[relativePath])
              }

              var exports = {};
              (function(require,exports,code){
                 eval(code)
              })(localRequire,exports,graph[module].code)
              return exports

            }

            require('${this.entry}')
        })(${newCode})`
        console.log(filePath)
        fs.writeFileSync(filePath, bundle, "utf-8")
    }
}