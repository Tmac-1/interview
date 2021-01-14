const fs = require('fs');
const path = require('path');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");

module.exports = {
    // 获取ast树
    getAst: (filename) => {
        let content = fs.readFileSync(filename, "utf-8")
        const ast = parser.parse(content, {
            sourceType: "module"
        })
        return ast
    },
    // 获取依赖
    getDependencies: (ast,filename) => {
        const dependcies = {} ; //可以保留相对路径和绝对路径
        traverse(ast, {
            ImportDeclaration({ node }) {
              //   console.log(node)
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