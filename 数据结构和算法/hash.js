// https://github.com/sisterAn/JavaScript-Algorithms/issues/49
// 给定两个数组，编写一个函数来计算它们的交集。
// 示例 1:
// 输入: nums1 = [1,2,2,1], nums2 = [2,2]
// 输出: [2]
// 示例 2:
// 输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出: [9,4]
let nums1 = [4,9,5]
let nums2 = [9,4,9,8,4]
function complixArr(arr1,arr2){
    let arr01=[...new Set(arr1)]
    let arr02=[...new Set(arr2)]
    let arr = []
    arr01.map(item=>{
        for(let i=0;i<arr02.length;i++){
            if(item==arr02[i]){
                arr.push(item)
            }
        }
    })
    console.log(arr)
}
// complixArr(nums1,nums2)
// 最简单解法
var intersection = function(nums1, nums2) {
    return [...new Set(nums1.filter((item)=>nums2.includes(item)))]
};


// 给定一个整数数组 nums 和一个目标值 target ，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
// 示例:
// 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]  两数之和
let nums = [3,11,7,2,1,8,7,4,5], target = 9;
function sum(arr,target){
   let indexArr = []
   for(let i=0;i<arr.length;i++){
       for(let j=i+1;j<arr.length;j++){
           if(arr[i]+arr[j]==target){
              indexArr.push(i,j)
           }
       }
   }
   console.log(indexArr)
}
// sum(nums,target)

// 最优解
// function twoSum(arr,target){
//     console.log(arr,target)
//     let map = new Map()
//     for(let i=0;i<arr.length;i++){
//         let diffNum=target-arr[i];
//         // console.log(map)
//         if(map.has(arr[i])){
//             // console.log(111)
//             return [arr[map.get(arr[i])],arr[i]]
//         }else{
//             // console.log(222)
//             map.set(diffNum,i)
//         }
//     }
//     return []
// }
function twoSum(arr,target){
    let returnArr = []
    arr.sort((a,b)=>a-b)
    let map = new Map()
    for(let i=0;i<arr.length;i++){
        console.log(i)
        let diffNum=target-arr[i];
        // console.log(map)
        if(map.has(arr[i])){
            // console.log(111)
            returnArr.push([arr[map.get(arr[i])],arr[i]])
            if(arr[i]==arr[i+1])i++
        }else{
            // console.log(222)
            map.set(diffNum,i)
        }
    }
    return returnArr
}
// console.log(twoSum(nums,target))

// 三数之和
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a ，b ，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 注意： 答案中不可以包含重复的三元组。
// 示例：
// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

// https://github.com/sisterAn/JavaScript-Algorithms/issues/31
var nums3 = [-1, 0, 1, 2, -1, -4,-2,2,-1]  
// [-4,-2,-1,-1,-1,0,1,2,2]
function threeNum(arr){
     arr.sort((a,b)=>a-b);
    //  console.log(arr)
     let returnArr = []
     for(let i=0;i<arr.length-2;i++){
        let second = i+1
        let last = arr.length-1
        // 去重，结束本次循环，直接开始下次循环
        if(i > 0 && arr[i] === arr[i-1]) continue
        while(second<last){
            let sum = arr[i]+arr[second]+arr[last] 
            // console.log(111,second,last,sum)
            if(sum<0){
                second++
            }else if(sum>0){
                last--
            }else{
                returnArr.push([arr[i],arr[second],arr[last]])
                // 去重
                while(arr[second]==arr[second+1]){second++}
                while(arr[last]==arr[last-1]){last--}
                second++
                last--
            }
        }
     }
     return returnArr
}
// console.log(threeNum(nums3)) 
