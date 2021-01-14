
module.exports = function(source) {
    // console.log(source,this.query)
    // const options = utils.getOptions(this)

    // 異步
    const callback = this.async()
    setTimeout(()=>{
        const str = source.replace('kkb','啥子')
       callback(null,str) 
    },1000)
}