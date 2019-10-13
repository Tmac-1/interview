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



function foo() {
    return
        {
            foo:'bar'
        }
}
console.log( foo() )


// var props={}
// var stateProps={num:1}
// console.log({...props,...stateProps})

// var a = 'hadh'
// console.log(~~a)

let Person = {}

Object.defineProperty(Person, 'name', {
   value: 'jack',
   writable: true // 是否可以改变
})
// Person.name = 111
console.log(Person.name)