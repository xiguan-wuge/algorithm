// 三数之和
// 链接：
// https://leetcode-cn.com/problems/3sum/solution/hua-jie-suan-fa-15-san-shu-zhi-he-by-guanpengchn/
// 思路： 一轮遍历 结合双指针，
// 时间复杂度 = O(n^2)
// function threeSum(nums) {
//   let ans = []
//   const len = nums.length;
//   if(!nums || len < 3) return ans
//   nums.sort((a, b) => a - b) // 排序
//   for(let i = 0; i < len; i++) {
//     if(nums[i] >0) break; // 数组从小到大排序过，第一项大于0，后面数肯定大于0，所以三数只和，一定大于0
//     if(i > 0 && nums[i] === nums[i - 1]) continue; // 去重
//     let left = i + 1, right = len - 1
//     while(left < right) {
//       const sum = nums[i] + nums[left] + nums[right]
//       if(sum === 0) {
//         ans.push([nums[i], nums[left], nums[right]])
//         while(left < right && nums[left] === nums[left + 1]) left++ // 去重
//         while(left < right && nums[right] === nums[right - 1]) right-- // 去重
//         left++
//         right--
//       } else if(sum < 0) {
//         left++
//       } else {
//         right--
//       }
//     }
//   }
//   return ans
// }

function threeSum(nums) {
  let ans = []
  const len = nums.length;
  if(len < 3) return ans
  nums.sort((a, b) => a -b)
  for(let i = 0; i < len; i++) {
    if(nums[i] > 0) break; // 当前项大于0，那么后面两厢一定大于0（当前数组已经排序了），所以sum一定大于0
    if(i > 0 && nums[i] === nums[i-1]) continue; // 去重
    let left = i + 1, right = len -1
    while(left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if(sum === 0) {
        ans.push([nums[i], nums[left], nums[right]])
        while(left < right && nums[left] === nums[left + 1]) left++ // 去重
        while(left < right && nums[right] === nums[right - 1]) right-- // 去重
        left++
        right--
      } else if(sum < 0) {
        left++
      } else {
        right--
      }
    }
  }
  return ans
}

let arr = [-1,0,1,2,-1,-4]
let ans = threeSum(arr)
console.log('ans', JSON.stringify(ans))