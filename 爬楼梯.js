// 爬楼梯问题，难度，简单

// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

// 注意：给定 n 是一个正整数。

// 示例 1：

// 输入： 2
// 输出： 2
// 解释： 有两种方法可以爬到楼顶。
// 1.  1 阶 + 1 阶
// 2.  2 阶
// 示例 2：

// 输入： 3
// 输出： 3
// 解释： 有三种方法可以爬到楼顶。
// 1.  1 阶 + 1 阶 + 1 阶
// 2.  1 阶 + 2 阶
// 3.  2 阶 + 1 阶
// https://leetcode-cn.com/problems/climbing-stairs/


// 可以转换成斐波那契额计算

// 1.递归 时间O(n^2),空间O(n)
// 2.递归加缓存数据 减少时间复杂父 时间O(n),空间O（n）
// 3.动态规划的方式，只需要记录f(n-1)和f(n-2)以及fn = f(n-1) + f(n-2),再进一步减小空间复杂度到O(1)

// function climbStairs(n) {
//   if(n = 1) return 1
//   if(n = 2) return 2
//   let first = 1, second = 2
//   let third
//   for(let i = 3; i <= n; i++) {
//     third = first + second
//     first = second
//     second = third
//   }
//   return second

// }
// 转换成斐波那契函数，为避免重复运算，依次记录三个数的值即可
var climbStairs = function(n) {
  let first = 0, second = 0, third = 1;
  for (let i = 1; i <= n; ++i) {
      first = second;
      second = third;
      third = first + second;
  }
  return third;
};
// 更好理解和减少运算
var climbStairs = function(n) {
  if(n === 1) return 1
  if(n === 2) return 2
  let first = 1, second = 2, third = 3
  for(let i = 3; i < n; i++) {
      first = second
      second = third
      third = first + second
  }
  return third
};
// 时间复杂度:O(n),空间复杂度:O(1)‘
