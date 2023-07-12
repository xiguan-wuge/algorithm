// https://leetcode-cn.com/problems/sqrtx/solution/
// 69. x 的平方根 （简单）
// 实现 int sqrt(int x) 函数。

// 计算并返回 x 的平方根，其中 x 是非负整数。

// 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

// 示例 1:

// 输入: 4
// 输出: 2
// 示例 2:

// 输入: 8
// 输出: 2
// 说明: 8 的平方根是 2.82842..., 
//      由于返回类型是整数，小数部分将被舍去。

// 采用二分法，不断逼近目标值，
// 最终return right是关键
const mySqrt = function (x) {
  if (x < 2) return x
  let left = 1, mid, right = Math.floor(x / 2);
  while (left <= right) {
    mid = Math.floor(left + (right - left) / 2)
    if (mid * mid === x) return mid
    if (mid * mid < x) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return right
}