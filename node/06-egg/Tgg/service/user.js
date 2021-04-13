const delay = (data, tick) => new Promise(res=>{
    setTimeout(() => {
        res(data)
    }, tick);
})

module.exports = {
    getName(){
        return delay("Tmac",1000)
    },
    getAge(){
        return 20
    }
}