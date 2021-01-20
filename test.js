// function foo() {
//     console.log(value);
// }
// function bar() {
//     value = 2;
//     foo();
// }
// var value = 1;
// bar();

// var value = undefined

// function foo() {
//     console.log(value);
// }
// function bar() {
//     value = 2;
//     foo();
// }
//  value = 1;
// bar();



// function foo() {
//     return
//         {
//             foo:'bar'
//         }
// }
// console.log( foo() )


// var props={}
// var stateProps={num:1}
// console.log({...props,...stateProps})

// var a = 'hadh'
// console.log(~~a)

// let Person = {}

// Object.defineProperty(Person, 'name', {
//    value: 'jack',
//    writable: true // 是否可以改变
// })
// // Person.name = 111
// console.log(Person.name)



// let obj = {
//     a:1
// }

// function test(a,b){
//     console.log(this.a)
// }

// test.call(obj,1,2)
// console.log(obj)

// let i;
// for (let i = 0; i < 3; i++) {
//   const log = () => {
//     console.log(i);
//   }
//   setTimeout(log, 100);
// }


var  arr = [3,4,2,5,1,8,4,9,9,2]

// function bubleSort(arr) {
//   for (var i = 0; i < arr.length - 1; i++) {
//     for (var j = i + 1; j < arr.length; j++) {
//       if (arr[i] > arr[j]) {
//         [arr[i], arr[j]] = [arr[j], arr[i]]
//       }
//     }
//   }
//   return arr
// }
// console.log(bubleSort(arr)) 
    // i=2 j=1 j+1=2
    function insertSort(arr){
       for(var i=1;i<arr.length;i++){
           var tem = arr[i]
           var j = i-1
           while(j>=0 && arr[j]>tem){
              arr[j+1]=arr[j]
              j--;
           }
           arr[j+1]=tem
       }
       return arr
    }
    console.log(insertSort(arr)) 















