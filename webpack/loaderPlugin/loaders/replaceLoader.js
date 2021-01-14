const utils = require('loader-utils')

// loader的基本結構,不能使用箭頭函數

module.exports = function(source) {
    // console.log(source,this.query)
    const options = utils.getOptions(this)
    // console.log(options.name)

    // return source.replace('kkb',this.query.name)

    const str = source.replace('kkb',this.query.name)
    this.callback(null,str)

    // 異步
    // const callback = this.async()
    // setTimeout(()=>{
    //     const str = source.replace('kkb',options.name)
    //    callback(null,str) 
    // },1000)
}