
  // 千位分割  金钱转化 1234 -> 1,234
  function formatNum(str) {
    str = String(str);
    let newStr = "";
    let count = 0;
    if (str.indexOf(".") != -1) {
      let strArr = str.split(".");
      for (let i = strArr[0].length - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = strArr[0].charAt(i) + "," + newStr;
        } else {
          newStr = strArr[0].charAt(i) + newStr;
        }
        count++;
      }
      newStr = newStr + "." + strArr[1];
    } else {
      for (let i = str.length - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + "," + newStr;
        } else {
          newStr = str.charAt(i) + newStr;
        }
        count++;
      }
    }
    // console.log('newStr',newStr)
    return newStr;
  }
  // 翻转字符串里的单词
  var str = " a good   example ";
  function reverseStr(str) {
    console.log(typeof str);
    if (typeof str == "string") {
      var arr = str.split(" ");
      var newArr = arr.filter((item) => item != "");
      //    console.log('arr',arr,newArr)
      return newArr.reverse().join(" ");
    }
  }
  //  console.log(reverseStr(str))
  //   https://github.com/sisterAn/JavaScript-Algorithms/issues/18   双端队列的解法
  var reverseWords = function (s) {
    let left = 0;
    let right = s.length - 1;
    let queue = [];
    let word = "";
    while (s.charAt(left) === " ") {
      // 去除左边空格
      // console.log(11111)
      left++;
    }
    while (s.charAt(right) === " ") {
      // 去除右边空格
      // console.log(2222)
      right--;
    }
    while (left <= right) {
      // console.log(left)
      let char = s.charAt(left);
      if (char === " " && word) {
        // 遇到空格之后就把前面的单词添加的数组最前面
        queue.unshift(word);
        word = "";
      } else if (char !== " ") {
        word += char;
      }
      left++;
    }
    // console.log(33333,word)
    queue.unshift(word); // 最后一个单词
    return queue.join(" ");
  };
  // reverseWords(str)

  
  var s1 = "get-element-by-id"
  // 转化为 getElementById
  var f = function (s) {
    return s.replace(/-\w/g, function (x) {
      return x.slice(1).toUpperCase();
    })
  }

  // 颜色进制转化 https://www.jianshu.com/p/c99e1befdc98
  String.prototype.colorHex = function () {
    // RGB颜色值的正则
    var reg = /^(rgb|RGB)/;
    var color = this;
    if (reg.test(color)) {
      var strHex = "#";
      // 把RGB的3个数值变成数组
      var colorArr = color.replace(/rgb|RGB|\(|\)/g, "").split(",");
      // 转成16进制
      for (var i = 0; i < colorArr.length; i++) {
        var hex = Number(colorArr[i]).toString(16);
        if (hex.length === 1) {
          hex = '0' + hex;
        }
        strHex += hex;
      }
      return strHex;
    } else {
      return String(color);
    }
  }

var str = "1 +21 -3"
function calc(str){
    var numArr = str.match(/\d+/g)
    var calcArr = str.match(/\+|\-/g)
    // console.log(numArr,calcArr) 
    var returnStr = Number(numArr[0])
    for(var i=0;i<numArr.length;i++){
      var currentNumber = calcArr[i] == '-' ? Number(`-${numArr[i+1]}`) : Number(numArr[i+1])
      console.log('currentNumber',currentNumber)
      if(currentNumber){
        returnStr += Number(currentNumber) 
      }
     
    }
    console.log(returnStr)
}
calc(str)
