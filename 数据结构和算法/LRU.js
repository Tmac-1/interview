// https://github.com/sisterAn/JavaScript-Algorithms/issues/9
// 利用 Map 既能保存键值对，并且能够记住键的原始插入顺序
class LRUCashed{
    constructor(max){
        this.max=max;
        this.cashed=new Map();
    }
    get(key){
        if(this.cashed.has(key)){
            let value=this.cashed.get(key)
            this.cashed.delete(key)
            this.cashed.set(key,value)
            // console.log('---.1',this.cashed)
            return this.cashed.get(key).key
        }else{
            return -1;
        }
    }
    put(key,num){
        // console.log('num',num,this)
        if(this.cashed.has(key)){
            this.cashed.delete(key) //存在就更新
        }else if(this.cashed.size>=this.max){
            // console.log('----2',this.cashed.keys().next()) 
            // keys返回遍历器对象  next方法返回一个对象，表示当前数据成员的信息。这个对象具有value和done两个属性，
            this.cashed.delete(this.cashed.keys().next().value) //map的第一位，是不常用元素 
        }
         this.cashed.set(key,{key,num})
    }
}

let cache= new LRUCashed(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
console.log(cache.get(2));       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
console.log(cache.get(1));       // 返回 -1 (未找到)
console.log(cache.get(3));       // 返回  3
console.log(cache.get(4));       // 返回  4




//  let test = new Map();
//  test.set(1,{1:1})
//  test.set(2,{2:2})
//  test.set(3,{3:3})
//  console.log(test.keys())
//  let test2=test.keys()
//  console.log(test2.next())
//  console.log(test2.next())
//  console.log(test2.next())
//  console.log(test2.next())