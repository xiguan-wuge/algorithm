// 链接： https://leetcode.cn/problems/longest-increasing-subsequence/

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  const len = nums.length
  if(len < 1) return len

  const dp = [null, nums[0]]
  let max = 1

  for(let i = 1; i < len; i++) {
    if(dp[max] < nums[i]) {
      dp[++max] = nums[i]
      continue
    }

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
    dp[pos + 1] = nums[i]
  }
  return max
};

// 采用动态规划+二分查找
// 时间复杂度：O(n) = nlogn
// 空间复杂度：O(n) = n