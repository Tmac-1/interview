// async function async1() {
//     console.log("async1 start");
//     await  async2();
//     console.log("async1 end");
// }
// async  function async2() {
//     console.log( 'async2');
// }
// console.log("script start");
// setTimeout(function () {
//     console.log("settimeout");
// });
// async1()
// new Promise(function (resolve) {
//     console.log("promise1");
//     resolve();
//     console.log("111")
// }).then(function () {
//     console.log("promise2");
// });
// setImmediate(()=>{
//     console.log("setImmediate")
// })
// process.nextTick(()=>{
//     console.log("process")
// })
// console.log('script end'); 


//  1.srcipt start 2.async1 start 3.async2 4.promise1  5.script end 6.async1 end 7.promise2 8.process 9.settimeout 10.setImmediate


  
 
