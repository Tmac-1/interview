const fs = require('fs');
const path = require('path');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");

module.exports = {
    // 获取ast树
    getAst: (filename) => {
        let content = fs.readFileSync(filename, "utf-8")
        // console.log('content',content)
        const ast = parser.parse(content, {
            sourceType: "module"
        })
        // console.log('ast',ast)
        return ast
    },
    // 获取依赖 相对路径转换成绝对路径
    getDependencies: (ast,filename) => {
        const dependcies = {} ; //可以保留相对路径和绝对路径
        traverse(ast, {
            ImportDeclaration({ node }) {  // 如果没有解析到import声明，不会走这个函数
                // console.log('node',node)
                // console.log('node',node.source.value)
              //   dependcies.push(node.source.value) 相对路径
              const dirname = path.dirname(filename)
              const newPath = ".\\" + path.join(dirname, node.source.value)
              // console.log(newPath)
              dependcies[node.source.value] = newPath;
            }
        })
        return dependcies
    },
    // 转换代码
    getCode: (ast) => {
        const { code } = transformFromAst(ast, null, {
            presets: ["@babel/preset-env"]
        })
        return code
    }
}