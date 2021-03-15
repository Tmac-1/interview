
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