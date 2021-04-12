### requestAnimationFrame
https://www.cnblogs.com/goloving/p/14073738.html
与 setTimeout 相比，rAF 最大的优势是 由系统来决定回调函数的执行时机。具体一点讲就是，系统每次绘制之前会主动调用 rAF 中的回调函数

### requestIdleCallback
https://www.cnblogs.com/goloving/p/14074006.html
requestAnimationFrame 每一帧必定会执行不同，requestIdleCallback 是捡浏览器空闲来执行任务