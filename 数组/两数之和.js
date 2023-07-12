// 两数之和
// 给定一个整数数组 nums 和一个目标值 target ，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

// 示例:

// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

function addTwo(nums, target) {
  const map = new Map()
  let res = []
  for(let i = 0; i < nums.length; i++) {
    let another = target - nums[i]
    if(map.has(another)) {
      return [map.get(another), i]
    }
    // 存入map中，便于后面查找
    if(!map.has(nums[i])) {
      map.set(nums[i], i)
    }
  }
  return res
}

function addTwo1(nums, target) {
  const map = new Map()
  for(let i = 0; i < nums.length; i++) {
    const another = target - nums[i]
    if(map.has(another)) {
      return [map.get(another), i]
    }
    if(!map.has(nums[i])) {
      map.set(nums[i], i)
    }
  }
  return []
}
const nums = [2, 7, 11, 15], target = 17
const res = addTwo1(nums, target)
console.log('res',res)