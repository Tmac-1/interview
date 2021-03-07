// 二维数组查找
var arr = [[1,2,8,9],[2,4,9,12],[4,7,10,13],[6,8,11,15]]
function find(target, array){
    for(let i=0;i<array.length;i++){
        if(array[i].includes(target)){
            return true
        }
    }
    return false
}
function find2(target,array){
    let rowNum = array.length
    let row = 0;
    let col = array[0].length-1;
    while(row < rowNum && col >= 0 ){
      let curArr = array[row]
      if(curArr[col]>target){
           col--
      }else if(curArr[col]==target){
          return true
      }else {
          row++
      }
    }
    return false
}
// console.log(find2(4,arr))

// 反转遍历单向链表
