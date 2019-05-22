function foo() {
    console.log(value);
}
function bar() {
    value = 2;
    foo();
}
var value = 1;
bar();

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