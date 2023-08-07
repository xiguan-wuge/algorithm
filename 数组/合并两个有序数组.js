// 合并两个有序数组
// 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 num1 成为一个有序数组。

// 说明:

// 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n ）来保存 nums2 中的元素。

// 示例:

// 输入:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6],       n = 3

// 输出: [1,2,2,3,5,6]
// https://www.pzijun.cn/algorithms/array/2.html
// https://leetcode-cn.com/problems/merge-sorted-array/submissions/

const merge = function(num1,num2, m, n) {
  let len1 = m -1,
      len2 = n -1,
      len = m + n -1
  
  while(len2 >= 0) {

    if(len1 < 0) {
      // 考虑num1为空数组的情况
      num1[len] = num2[len2]
      len--
      len2--
      continue
    }
    if(num1[len1] >= num2[len2]) {
      num1[len] = num1[len1]
      len1--
    } else {
      num1[len] = num2[len2]
      len2--
    }
    len--
  }
  return num1
}
// const num1 = [1, 2, 3], m = 3, num2 = [2, 5, 6], n = 3
// let res = merge(num1, num2, m, n)
// console.log('res', JSON.stringify(res))

function merge1(nums1, nums2, m, n) {
  let len1 = nums1.length - 1,
    len2 = nums2.length - 1,
    len = m + n - 1

  // 双指针取大值，从后往前比
  while(len1 > -1 && len2 > -1) {
    if(nums1[len1] >= nums2[len2]) {
      nums1[len] = nums1[len1]
      len1--
    } else {
      nums1[len] = nums2[len2]
      len2--
    }
    len--
  }

  // 处理num1为空数组 或者比较后，nums2 仍不为空的情况
  while(len2 > -1) {
    nums1[len] = nums2[len2]
    len2--
    len--
  }

  return nums1
}
const num1 = [1, 2, 3], m = 3, num2 = [2, 5, 6], n = 3
let res = merge1(num1, num2, m, n)
console.log('res', JSON.stringify(res))