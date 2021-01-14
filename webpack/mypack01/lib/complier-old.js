const fs = require('fs');
const path = require('path');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");

module.exports = class Complier {
    constructor(options) {
        // console.log(options)
        this.entry = options.entry;
        this.output = options.output;
    }
    run() {
      this.build(this.entry)
    }
    build(entryFile) {
     // 1.分析入口，读取入口模块内容  
    //   console.log(entryFile)  ./src/index.js
       let content = fs.readFileSync(entryFile,"utf-8")
       const ast = parser.parse(content, {
           sourceType: "module"
       })
    //    console.log(ast.program)
     
    //   const dependcies = []; // 获取依赖路径
      const dependcies = {} ; //可以保留相对路径和绝对路径
      traverse(ast, {
          ImportDeclaration({ node }) {
            //   console.log(node)
            //   dependcies.push(node.source.value) 相对路径
            const dirname = path.dirname(entryFile)
            const newPath = ".\\" + path.join(dirname, node.source.value)
            // console.log(newPath)
            dependcies[node.source.value] = newPath;
          }
      })
   
      const { code } = transformFromAst(ast, null, {
          presets: ["@babel/preset-env"]
      })
      console.log(code)
    }
}