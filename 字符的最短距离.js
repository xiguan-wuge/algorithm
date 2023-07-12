// https://leetcode-cn.com/problems/shortest-distance-to-a-character/
// 821. 字符的最短距离 （简单）
// 给你一个字符串 s 和一个字符 c ，且 c 是 s 中出现过的字符。

// 返回一个整数数组 answer ，其中 answer.length == s.length 且 answer[i] 是 s 中从下标 i 到离它 最近 的字符 c 的 距离 。

// 两个下标 i 和 j 之间的 距离 为 abs(i - j) ，其中 abs 是绝对值函数。



// 示例 1：

// 输入：s = "loveleetcode", c = "e"
// 输出：[3,2,1,0,1,0,0,1,2,2,1,0]
// 解释：字符 'e' 出现在下标 3、5、6 和 11 处（下标从 0 开始计数）。
// 距下标 0 最近的 'e' 出现在下标 3 ，所以距离为 abs(0 - 3) = 3 。
// 距下标 1 最近的 'e' 出现在下标 3 ，所以距离为 abs(1 - 3) = 2 。
// 对于下标 4 ，出现在下标 3 和下标 5 处的 'e' 都离它最近，但距离是一样的 abs(4 - 3) == abs(4 - 5) = 1 。
// 距下标 8 最近的 'e' 出现在下标 6 ，所以距离为 abs(8 - 6) = 2 。
// 示例 2：

// 输入：s = "aaab", c = "b"
// 输出：[3,2,1,0]


// 常用实现，双子针，从当前字符下左右查找最近的目标字符的下标，比较绝对值的大小
// 时间O(n^2),空间O(1)
var shortestToChar = function (s, c) {
  const res = []
  let left, right, dist, len = s.length
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      res[i] = 0;
      continue;
    }

    // 向左右查找最近的目标下标
    left = i - 1
    right = i + 1
    while (left >= 0) {
      if (s[left] === c) {
        dist = Math.abs(left - i)
        break;
      }
      left--
    }
    res[i] = dist
    while (right < len) {
      if (s[right] === c) {
        dist = Math.abs(right - i)
        if (!res[i] || dist < res[i]) {
          res[i] = dist
        }
        break;
      }
      right++
    }

  }
  return res
}

// 方法二，空间换时间
// 用一个数组记录记录出现目标字符的下边
// 然后遍历原数组，计算出非目标字符与最近的目标字符的距离

var shortestToChar = function (s, c) {
  const targetStrArr = []
  const res = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) targetStrArr.push(i)
  }
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      res[i] = 0
      continue
    }
    for (let j = 0; j < targetStrArr.length; j++) {
      const dist = Math.abs(i - targetStrArr[j])

      // targetStrArr因为下标是递增的，如果，dist大于res[i],那后面的dist也会大于res[i]
      if (res[i] !== undefined && dist >= res[i]) break
      // 记录最小距离
      res[i] = dist
    }
  }
  return res

};