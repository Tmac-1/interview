(function(graph){
            
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

            require('./src/index.js')
        })({"./src/index.js":{"dependcies":{"./hello.js":".\\src\\hello.js"},"code":"\"use strict\";\n\nvar _hello = require(\"./hello.js\");\n\n// console.log(1111)\ndocument.write('hello' + (0, _hello.say)(\"webapack\")); // import test from './test';\n// 获取配置 根据配置信息启动webpack，执行构建\n\n/**\r\n * 1.从入口模块开始分析（有哪些依赖，转换代码）\r\n * 2.递归的分析其他依赖模块（有哪些依赖，转换代码）\r\n * 3.生成可以在浏览器端执行bundle文件\r\n*/"},".\\src\\hello.js":{"dependcies":{"./a.js":".\\src\\a.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.say = say;\n\nvar _a = require(\"./a.js\");\n\nfunction say(str) {\n  return str + (0, _a.add)(10 + 8);\n}"},".\\src\\a.js":{"dependcies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.add = add;\n\nfunction add(a, b) {\n  return a + b;\n}"}})