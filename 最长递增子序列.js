// 链接： https://leetcode.cn/problems/longest-increasing-subsequence/

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  const len = nums.length
  if(len <= 1) return len

  const dp = [null, nums[0]]
  let max = 1

  for(let i = 1; i < len; i++) {
    if(nums[i] > dp[max]) {
      dp[++max] = nums[i]
    } else {
      // 二分查找
      let pos = 0,
        left = 1,
        right = max,
        mid
      while(left <= right) {
        mid = (left + right) >> 1 // 取中间值，为避免小数，采用位运算
        if(nums[i] > dp[mid]) {
          // 元素在右边
          left = mid + 1
          pos = mid
        } else {
          right = mid - 1
        }
      }
      // 二分查找的目的： 修改dp数组，为下一轮for循环比较中，提供值的参考，关键是max值的修改
      dp[pos + 1] = nums[i]
      // console.log('dp', dp);
    }
  }
  return max
};

// 采用动态规划+二分查找
// 时间复杂度：O(n) = nlogn
// 空间复杂度：O(n) = n

// 初始解法，动态规划
// O(n^2)
// S(n)
function lengthOfLIS2(nums) {
  const len = nums.length
  if(len <= 1) return len

  // 初始化，每项对应的当前项 对应的最长子序列长度
  const dp = Array(len).fill(1) 
  let max = -Infinity

  for(let i= 1; i < len; i++) {
    for(let j = 0; j < i; j++) {
      if(nums[j] < nums[i]) {
      dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    if(dp[i] > max) max = dp[i]
  }

  return max
}

// 验证
const nums = [10,9,2,5,3,7,101,18]
// 期待结果：4， 最长子序列为[2,3,7,101]

console.log('lengthOfLIS', lengthOfLIS(nums));