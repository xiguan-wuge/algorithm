// 最长回文子串问题
// 题目描述：给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

function longestPalindrome(s) {
  const dp = []
  const len = s.length
  // 初始化二维数组
  for(let i = 0; i < len; i++) {
    dp[i] = []
  }
  // 初始化最长回文字符串的两个端点
  let start = 0, end = 0
  // 初始化回文字符串的初始值为1
  for(let i = 0; i < len; i++) {
    dp[i][i] = 1
  }

  // 为降低复杂度，预先对s[i + 1]做对比 
  // ？？？ 相连的两个字符也可以是回文字符串
  for(let i = 0; i < len - 1; i++) {
    if(s[i] === s[i+1]) {
      dp[i][i + 1] = 1
      start = i
      end = i + 1
    }
  }

  // n代表子串的长度，从3开始递增  
  // ？？？ 为什么从3开始递增
  // ??? 为什么<=n 
  for(let n = 3; n <= len; n++) {
    // 下面用两层遍历，实现状态转移方程
    for(let i = 0; i < len - n; i++) {
      let j = i + n - 1 // ??
      if(dp[i + 1][j - 1]) {
        if(s[i] === s[j]) {
          // 若 定位到更长的回文字符串，则更新子串端点的索引值
          dp[i][j] = 1
          start = i
          end = j
        }
      }
    }
  }
  // 最后根据端点值，将子串截取出来
  // ? 为什么end+1 : substring中参数2是不会截取，所以需要考虑后一位
  return s.substring(start, end + 1)
}
// 测试：
const s = 'cbbd'
console.log('longestPalindrome(s)', longestPalindrome(s))

