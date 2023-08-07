// 三数之和
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a ，b ，c ，
// 使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。


// 注意： 答案中不可以包含重复的三元组。

// 示例：

// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]
// https://www.pzijun.cn/algorithms/array/4.html
// https://leetcode-cn.com/problems/3sum/

// 思路：排序+双循环+map
// 时间复杂度=O(n^2)
// function threeSum(nums) {
//   const res = [], len = nums.length;
//   nums.sort((a, b) => a - b)
//   let set = new Set(), first, second, third

//   for(let i = 0; i < len; i++) {
//     while(i > 0 && nums[i] === nums[i -1]) {i++}
//     first = nums[i]
//     let j = i + 1
//     while(j < len) {
//       second = nums[j]
//       third = 0 - first - second
//       if(set.has(third)) {
//         res.push([first, third, second])
//         // set.add(second)
//         j++
//         while(nums[j] === nums[j - 1]) {j++}
//       } else {
//         set.add(second)
//         j++
//       }
//     }
//     set = new Set()
//   }
//   return res
// }

// 思路： 排序+两轮遍历+双指针
// 时间复杂度=O(n^2)
function threeSum(nums) {
  const len = nums.length, res = []
  if(len < 3) return []
  nums.sort((a, b) => a - b) // 先排序，便于后面去重
  // array.prototype.sort，各家浏览器使用的排序算法不同，时间复杂度不同
  // 以Chrome为例，采用的是插入排序（nlogn）和 快速排序（n^2）
  // https://segmentfault.com/a/1190000010648740
  for(let i = 0; i < len; i++) {
    if(nums[i] > 0) break // 排序后，第一项大于0，sum一定大于0
    if(i > 0 && nums[i] === nums[i - 1]) i++ // 去重
    let left = i + 1, right = len - 1
    while(left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if(sum === 0) {
        res.push([nums[i], nums[left], nums[right]])
        left++
        right--
        // 处理重复
        while(left < right && nums[left] === nums[left + 1]) left++ 
        while(left < right && nums[right] === nums[right - 1]) right--
      } else if(sum < 0) {
        left++
      } else {
        right--
      }
    }

  }
  return res
}

function threeSum1(nums) {
  const len = nums.length, res = []
  if(len < 3) return []
  nums.sort((a, b) => a - b)
  for(let i = 0; i < len; i++) {
    if(nums[i] > 0) break
    if(i > 0 && nums[i] === nums[i + 1]) i++
    let left = i + 1, right = len - 1
    while(left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if(sum === 0) {
        res.push([nums[i], nums[left], nums[right]])
        left++
        right--
        while(left < right && nums[left] === nums[left + 1]) left++
        while(left < right && nums[right] === nums[right - 1]) right--
      } else if(sum < 0) {
        left++
      } else {
        right--
      }
    }
  }
  return res
}

function threeSum2(nums) {
  const res = [], len = nums.length
  if(len < 3) return []

  // 排序
  nums.sort((a, b) => a - b)
  let left, right, sum
  console.log(nums);
  for(let i = 0; i < len - 2; i++) {
    if(nums[i] >= 0) break // 排序后递增，若第一项大于0，则和一定大于0，结束遍历
    if(i > 0 && nums[i] === nums[i - 1]) {i++} // 去重（注意是i-1, 仅避免第一个数相同的情况重复计算)

    left = i + 1
    right = len - 1
    while(left < right) {
      sum = nums[i] + nums[left] + nums[right]
      if(sum === 0) {
        res.push([nums[i], nums[left], nums[right]])
        left++
        right--

        // 去重
        while(left < right && nums[left] === nums[left + 1]) left++
        while(left < right && nums[right] === nums[right - 1]) right--
      } else if(sum < 0) {
        left++
      } else {
        right--
      }
    }
  }
  return res
}

function threeSum3(nums) {
  let res = []

  const len = nums.length
  let first , second, third, sum
  // 先排序
  nums = nums.sort((a, b) => a - b)
  for(let i = 0; i < len - 2; i++) {
    first = nums[i]
    if(first > 0) break // 边界情况处理，当first都大于0，后面的一定大于0 =》和大于0， 终止遍历
    // 去重,跳过重复项
    if(i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    second = i + 1
    third = len - 1
    while(second < third) {
      sum = first + nums[second] + nums[third]
      if( sum < 0) {
        second++
        // 处理重复值情况
        // 和后一项对比
        while(second < third && nums[second] === nums[second - 1]) {
          second++
        }
      } else if(sum > 0) {
        third--
        // 处理重复值情况
        // 和前一项对比
        // 因为third先自减，所以 开始是前一项和当前项比较，所以是 third === third+1
        while(second < third && nums[third] === nums[third + 1]) {
          third--
        }
      } else {
        res.push([first, nums[second], nums[third]])
        second++
        third--

        // 仍旧需要处理重复情况
        while(second < third && nums[second] === nums[second - 1]) {
          second++
        }
        while(second < third && nums[third] === nums[third + 1]) {
          third--
        }
      }
    }
  } 
  return res
}
// O(nlogn)
// S(1)

const nums = [-1,0,1,2,-1,-4]
// res = [ [ -1, 1, 0 ], [ -1, 2, -1 ] ]
const res = threeSum2(nums)
console.log('res',res)