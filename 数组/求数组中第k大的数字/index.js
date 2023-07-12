// https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
// 215. 数组中的第K个最大元素 (中等)
// 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。


// 示例 1:

// 输入: [3,2,1,5,6,4] 和 k = 2
// 输出: 5
// 示例 2:

// 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
// 输出: 4

// 选择排序，依次找出最大的，交换位置
// 时间：O(k*s), s为nums的长度，空间：O(1)
var findKthLargest = function (nums, k) {
  let maxIndex, temp
  for (let i = 0; i < k; i++) {
    maxIndex = [i]
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] > nums[maxIndex]) maxIndex = j
    }
    if (maxIndex !== i) {
      temp = nums[i]
      nums[i] = nums[maxIndex]
      nums[maxIndex] = temp
    }
  }
  return nums[k - 1]
};

var arr = [3, 2, 3, 1, 2, 4, 5, 5, 6]
findKthLargest(arr, 4)