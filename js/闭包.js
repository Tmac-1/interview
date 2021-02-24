/**
 * 参考文章 https://github.com/mqyqingfeng/Blog/issues/9 
 *         https://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html
 * 闭包：能够访问自由变量的函数、（理论上的闭包）
 * 自由变量：能够在函数中访问，并且不是函数的参数，也不是函数的局部变量
 * 结论：闭包 = 函数 + 函数能访问的自由变量 （理论上的闭包）
 * 
 *
 * 实际上的闭包 （简单来说就是：能够读到其他函数内部变量的函数）
 *  1. 函数的执行上下文栈被销毁，但这个函数依然存在（比如内部函数从父函数中返回）
 *  2. 在代码中引用了自由变量
 * */ 

 var scope = "global scope"
 function chainScope(){
     var scope = "local scope"
     function f(){
         return scope
     }
     return f
 }

 var foo = chainScope()
 console.log(foo()) // 'local scope'

 /**
  * 解释
  * 因为函数执行时候，会创建上下文栈的，上下文栈会初始化作用域链，
  * 虽然函数执行完成了，从执行栈里面弹出销毁，但是作用域链会保存在内存中，
  * 所以就成了foo函数在外部调用，但是可以读到checkscope函数内部的变量
  * （闭包就是能够读取其他函数内部变量的函数。）
 */



//  案例
for(var i=0; i<4; i++) {
    (function(i){
       setTimeout(()=>{
           console.log(i)
       },1000)
    })(i)
}  // 0 1 2 3

for(var i=0; i<4; i++){
    setTimeout(()=>{
        console.log(i)
    })
} // 4 4 4 4

for(let i=0; i<4; i++){
    setTimeout(()=>{
        console.log(i)
    })
} // 0 1 2 3