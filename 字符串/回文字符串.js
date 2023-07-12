// 回文字符串的概念：
// 正的读和倒着读都一样的字符串。
// 特点：
// - 反转后一致性
// - 对称性（可奇可偶）


// 判断回文字符串
function isPalindrome(str) {
  // 实现方案1:利用反转性
  // const reverseStr = str.split('').reverse().join('')
  // return reverseStr === str

  // 实现方案2： 利用对称性
  const len = str.length
  // 遍历前版部分，判断后半部分是否对称
  for(let i = 0; i < len / 2; i++) {
    if(str[i] !== str[len - i - 1]) return false
  }
  return true
}
// console.log(isPalindrome('asdsa'))




// 回文字符串衍生问题

// 真题描述：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
// 示例 1: 输入: "aba"
// 输出: True
// 示例 2:
// 输入: "abca"
// 输出: True
// 解释: 你可以删除c字符。
// 注意: 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。

// 利用对称性和双指针解决
function validPalindrome(str) {
  const len = str.length
  let left = 0, right = len - 1

  // 先判断满足对称的情况
  while(left < right && str[left] === str[right]) {
    left++
    right--
  }

  // 判断：跳过左指针后面的元素，看是否是回文字符串
  if(isPalindrome(left + 1, right)) {
    return true
  }

  // 判断：跳过右指针后面的元素，看是否是回文字符串
  if(isPalindrome(left, right + 1)) {
    return true
  }

  function isPalindrome(start, end) {
    while(start < end) {
      if(str[start] !== str[end]) return false

      start++
      end--
    }
    return true
  }
  return false
}
function validPalindrome2(str) {
  const len = str.length
  let left = 0, right = len - 1
  while(left < right && str[left] === str[right]) {
    left++
    right--
  }
  // 先后检测跳过左指针后的第一个元素是否是回文字符串，然后检测跳过右指针前的一个元素
  if(checkOneWord(left + 1, right) || checkOneWord(left, right - 1)) return true
  function checkOneWord(left, right) {
    while(left < right) {
      if(str[left] !== str[right]) return false
      left++
      right--
    }
    return true
  }
  return false
}
console.log('1111111');
console.log(validPalindrome2('abac'))



// 字符串匹配问题——正则表达式初相见
// 接下来我们来看一道综合性比较强的字符串大题：

// 真题描述： 设计一个支持以下两种操作的数据结构：
// void addWord(word)
// bool search(word)
// search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
// . 可以表示任何一个字母。

// 示例: addWord("bad")
// addWord("dad")
// addWord("mad")
// search("pad") -> false
// search("bad") -> true
// search(".ad") -> true
// search("b..") -> true
// 说明:
// 你可以假设所有单词都是由小写字母 a-z 组成的。

class WordDictionary {
  constructor() {
    this.words = {}
  }

  addWord(word) {
    // 借助word.length 分类存储，减少查询时间
    if(!this.words[word.length]) this.words[word.length] = []
    this.words[word.length].push(word)
  }

  search(word) {
    const len = word.length
    if(!this.words[len]) return false

    // 以.来判断是用简单数组查找，还是需要结合正则
    if(word.includes('.')) {
      const reg = new RegExp(word)
      // 只要数组中有一个符合就返回
      return this.words[len].some(item => {
        return reg.test(item)
      })
    } else {
      return this.words[len].includes(word)
    }
  }
}

// const wd = new WordDictionary()
// wd.addWord('bad')
// wd.addWord('dad')
// wd.addWord('mad')
// console.log('search("pad")', wd.search("pad"));
// console.log('search("bad")', wd.search("bad"));
// console.log('search(".ad")', wd.search(".ad"));
// console.log('search("b..")', wd.search("b.."));  




// 正则表达式更进一步——字符串与数字之间的转换问题：
// 真题描述：请你来实现一个 atoi 函数，使其能将字符串转换成整数。
// 首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。
// 当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。
// 该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。
// 注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。
// 在任何情况下，若函数不能进行有效的转换时，请返回 0。

// 说明： 假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−2^31,  2^31 − 1]。如果数值超过这个范围，请返回  INT_MAX (2^31 − 1) 或 INT_MIN (−2^31) 。

// 示例 1:
// 输入: "42"
// 输出: 42

// 示例 2:
// 输入: " -42"
// 输出: -42
// 解释: 第一个非空白字符为 '-', 它是一个负号。
// 我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
// 示例 3: 输入: "4193 with words"
// 输出: 4193
// 解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。

// 示例 4: 输入: "words and 987"
// 输出: 0
// 解释: 第一个非空字符是 'w', 但它不是数字或正、负号。 因此无法执行有效的转换。

// 示例 5:
// 输入: "-91283472332"
// 输出: -2147483648
// 解释: 数字 "-91283472332" 超过 32 位有符号整数范围。因此返回 INT_MIN (−2^31) 。

// 解析：

function myAtoi(str) {
  // 正则
  const reg = /\s*([-\+]?[0-9]*).*/

  // 捕获到的数组
  const groups = str.match(reg)
  // 计算最大最小值
  const max = Math.pow(2, 31) - 1
  const min = -max - 1
  // 用于存储转化出来的数字
  let targetNum = 0
  // 如果匹配成功
  if(groups) {
    console.log('groups', groups);
    // 尝试获取转化后的结构
    targetNum = +groups[1]
    // 注意，即便转化成功，也可能出现非数字的情况，如只有一个+
    if(isNaN(targetNum)) {
      targetNum = 0
    }
  }

  // 卡口判断
  if(targetNum > max) return max
  if(targetNum < min) return min

  return targetNum
}
console.log('字符串转数字：', myAtoi('   +100.123qwqe122'))



