### HOOKS
 > hook详细解释文章 https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/
 hook文章 https://juejin.cn/post/6944863057000529933
### Taro
 > taro 源码分析 
   https://juejin.cn/post/6906417392931307534
   https://juejin.cn/post/6907481305655705614
 * tarojs/taro 
   1. 核心打包模块，据不同的编译环境变量，引入了对应的编译包，对各平台的小程序API进行了二次封装，挂载在Taro对象下
   2. 对请求进行了Promise化的封装，挂载在Taro对象下
 * tarojs/taro-cli
   打包的脚手架工具，里面的核心Kernel提供了loader的文件解析和plugin的注入