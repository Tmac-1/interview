// const f1 = function(){
//     console.log(1)
// }
// const f2 = function(){
//     console.log(2)
// }

// f2(f1()) // 1 2

// const add = (x, y) => x + y
// const square = z => z * z

// // const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))

// const compose = (...[first,...other]) => (...args) => {
//     let ret = first(...args)
//     other.forEach( fn=> {
//         ret = fn(ret)
//     })
//     return ret
// }
// const fn = compose(add, square)
// console.log(fn(1, 2))

/**
 *  责任链模式 洋葱模型 react中redux的实现
 *  将`middleware`中的下一个中间件`fn`作为未来`next`的返回值
 * */

function compose(middlewares) {
    return function () {
        return dispatch(0)

        function dispatch(i) {
            let fn = middlewares[i]
            if (!fn) {
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(function next() {
                    return dispatch(i + 1)
                })
            )
        }
    }
}

async function fn1(next) {
    console.log('fn1')
    let res1 = await next();
    console.log('res1',res1)
    console.log('end fn1')
}

async function fn2(next) {
    console.log('fn2')
    let delay1 = await delay()
    console.log('delay1',delay1)
    await next()
    console.log('end fn2')
    return 222
}

async function fn3(next) {
    console.log('fn3')
}

function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1111)
        }, 2000)
    })
}

const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares)
finalFn()
// fn2()