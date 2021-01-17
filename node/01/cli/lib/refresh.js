const fs = require('fs');
const handlebars = require('handlebars')
const chalk = require('chalk')

module.exports = async ()=>{
    // 获取页面列表
    const list = fs.readdirSync('../test/src/views')
             .filter(v=>v !=="Home.vue")
             .map(v => ({
                 name:v.replace('.vue','').toLowerCase(),
                 file:v
             }))
    // 路由
    compile({list},'../test/src/router.js','../test/template/router.js.hbs')
    // 菜单
    compile({list},'../test/src/App.vue','../test/template/App.vue.hbs')
    // 编译模板
    function compile(meta,filePath,templatePath){
       if(fs.existsSync(templatePath)){
           const content = fs.readFileSync(templatePath).toString()
           const result = handlebars.compile(content)(meta)
           fs.writeFileSync(filePath,result)
           console.log(`${filePath} successed`)
       }
    }
}