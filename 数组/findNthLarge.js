function findNthLarge(nums, k) {
  let start = 0, end = nums.length -1
  // 排序，数组中第k个元素就是
  let key = nums.length - k
  while(true) {
    let i = partition(nums, start, end) 
    if(i === key) {
      return nums[key]
    } else if(i < key) {
      start = i + 1
    } else {
      end = i - 1
    }
  }
}

function partition (arr, start, end) {
  // 二分法
  if(end > start) {
    swap(arr, start, start + Math.floor((end - start) / 2))
  }

  let povit = arr[start], j = start

  for(let i = start + 1; i <= end; i++) {
    if(arr[i] <pivot) {
      if(++j == i) continue
      swap(arr, i, j)
    }
  }
  // 循环完之后，交换povit 和arr[j]的位置
  swap(arr, start, j)
  return j
}

function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}