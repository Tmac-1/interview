class CopyrightWebapckPlugin {
    constructor(options){
        // console.log(options)
    }
    // complier:webpack实例
    apply(complier){
        // emit 生成资源文件到输出目录之前
       complier.hooks.emit.tapAsync(
           "CopyrightWebapckPlugin",
           (compilation,cb)=>{
              compilation.assets["copyright.txt"] = {
                  // 文件内容   
                  source:function(){
                      return "hello copy"
                  },
                 // 文件大小  
                  size:function(){
                      return 20
                  }
              };
              //  完成之后，走回调，告诉compilation事情结束
              cb()
           }
       );
       // 同步的写法
       complier.hooks.compile.tap("CopyrightWebapckPlugin",compilation=>{
           console.log('开始了')
       })
    }
}
module.exports = CopyrightWebapckPlugin;