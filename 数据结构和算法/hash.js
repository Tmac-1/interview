
/** 给定两个数组，编写一个函数来计算它们的交集。https://github.com/sisterAn/JavaScript-Algorithms/issues/49
* 示例 1:
* 输入: nums1 = [1,2,2,1], nums2 = [2,2]
* 输出: [2]
* 示例 2:
* 输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
*  输出: [9,4]
*/ 
let nums1 = [4, 9, 5]
let nums2 = [9, 4, 9, 8, 4]
function complixArr(arr1, arr2) {
    let arr01 = [...new Set(arr1)]
    let arr02 = [...new Set(arr2)]
    let arr = []
    arr01.map(item => {
        for (let i = 0; i < arr02.length; i++) {
            if (item == arr02[i]) {
                arr.push(item)
            }
        }
    })
    console.log(arr)
}
// complixArr(nums1,nums2)
// 最简单解法
var intersection = function (nums1, nums2) {
    return [...new Set(nums1.filter((item) => nums2.includes(item)))]
};


/** 给定一个整数数组 nums 和一个目标值 target ，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
* 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
* 示例:
* 给定 nums = [2, 7, 11, 15], target = 9
* 因为 nums[0] + nums[1] = 2 + 7 = 9
* 所以返回 [0, 1]  两数之和
*/
let nums = [3, 11, 7, 2, 1, 8, 7, 4, 5], target = 9;
function sum(arr, target) {
    let indexArr = []
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] == target) {
                indexArr.push(i, j)
            }
        }
    }
    console.log(indexArr)
}
// sum(nums,target)

// 最优解
function twoSum(arr, target) {
    let returnArr = []
    arr.sort((a, b) => a - b)
    let map = new Map()
    for (let i = 0; i < arr.length; i++) {
        let diffNum = target - arr[i];
        if (map.has(arr[i])) {
            returnArr.push([arr[map.get(arr[i])], arr[i]])
            if (arr[i] == arr[i + 1]) i++  // 若果有重复，直接跳过
        } else {
            map.set(diffNum, i)
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
var nums3 = [-1, 0, 1, 2, -1, -4, -2, 2, -1]
// [-4,-2,-1,-1,-1,0,1,2,2]
function threeNum(arr) {
    arr.sort((a, b) => a - b);
    //  console.log(arr)
    let returnArr = []
    for (let i = 0; i < arr.length - 2; i++) {
        let second = i + 1
        let last = arr.length - 1
        // 去重，结束本次循环，直接开始下次循环
        if (i > 0 && arr[i] === arr[i - 1]) continue
        while (second < last) {
            let sum = arr[i] + arr[second] + arr[last]
            // console.log(111,second,last,sum)
            if (sum < 0) {
                second++
            } else if (sum > 0) {
                last--
            } else {
                returnArr.push([arr[i], arr[second], arr[last]])
                // 去重
                while (arr[second] == arr[second + 1]) { second++ }
                while (arr[last] == arr[last - 1]) { last-- }
                second++
                last--
            }
        }
    }
    return returnArr
}
// console.log(threeNum(nums3)) 

/** https://github.com/sisterAn/JavaScript-Algorithms/issues/49    hash相关
* 设计一个支持在平均 时间复杂度 O(1) 下，执行以下操作的数据结构。
* insert(val) ：当元素 val 不存在时，向集合中插入该项。
* remove(val) ：元素 val 存在时，从集合中移除该项。
* getRandom ：随机返回现有集合中的一项。每个元素应该有 相同的概率 被返回。
*/
class RandomizedSet {
    constructor() {
        this.values = []; // 散列表
        this.map = new Map();  // 建立映射关系，这是hash表的精髓，可称为散列函数
    }
    insert(val) {
        if (this.map.has(val)) {
            return false;
        } else {
            this.map.set(val, this.values.length);
            this.values.push(val);
            return true;
        }
    }
    remove(val) {
        if (!this.map.has(val)) {
            return false;
        } else {
            let index = this.map.get(val); // 找到要删除元素的下标 获取映射关系，关键一步
            if (index == this.values.length) { // 如果删除的元素就是末尾
                this.values.pop();
                this.map.delete(val);
            } else {
                let lastValue = this.values.pop(); //获取数组的最后的一位的元素
                this.values[index] = lastValue; //用末尾元素代替要删除的元素
                this.map.set(lastValue, index); //建立新的映射关系
                this.map.delete(val);
            }
            return true;
        }
    }
    getRandom() {
        if (this.values.length == 1) {
            return this.values[0];
        } else {
            return this.values[Math.floor(Math.random() * this.values.length)];
        }
    }
}
    // 初始化一个空的集合。
    // let randomSet = new RandomizedSet();
    // // 向集合中插入 1 。返回 true 表示 1 被成功地插入。
    // console.log(randomSet.insert(1));
    // // 返回 false ，表示集合中不存在 2 。
    // console.log(randomSet.remove(2));
    // // 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
    // console.log(randomSet.insert(2));
    // // getRandom 应随机返回 1 或 2 。
    // console.log(randomSet.getRandom()) ;
    // // 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
    // console.log(randomSet.remove(1)) ;
    // // 2 已在集合中，所以返回 false 。
    // console.log(randomSet.insert(2)) ;
    // // 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
    // console.log(randomSet.getRandom()) ;
