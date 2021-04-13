
// https://www.cnblogs.com/yzhihao/p/6409098.html
function a(){
    var a = {n:1};
    var b = a;
    a.x = a ;  // 先建立引用
    a = {n:2};
    console.log(a,b)
}
function b(){
    var a = {n:1};
    var b = a;
    a = {n:2}; // 先创建对象
    a.x = a ;  
    console.log(a,b)
}

// 关于this https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this
// 箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this

function fun(n, o) {
      console.log(o);
      return {
          fun: function (m) {
              return fun(m, n);
          }
      };
    }
    
var a = fun(0);
a.fun(1);
a.fun(2);
a.fun(3);

var b = fun(0).fun(1).fun(2).fun(3);

var c = fun(0).fun(1);
c.fun(2);
c.fun(3);

