// (async ()=>{
//     const fs = require('fs')
//     const {promisify} = require('util')
//     const readFile = promisify(fs.readFile)
//     const data = await readFile('./confg.js')
//     console.log('data',data.toString())
// })()


// 同步读取
// const data = fs.readFileSync('./confg.js')
// console.log('data',data.toString())

// 异步读取
// fs.readFile('./confg.js', (err, data) =>{
//     if(err)throw err;
//     console.log('data',data.toString())
// })