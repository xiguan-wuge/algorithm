// 题目描述：给定一个没有重复数字的序列，返回其所有可能的全排列。
// https://leetcode.cn/problems/7p8L0Z/

// 示例：   
// 输入: [1,2,3]
// 输出: [
// [1,2,3],
// [1,3,2],
// [2,1,3],
// [2,3,1],
// [3,1,2],
// [3,2,1]
// ]

function permute(nums) {
  const len = nums.length
  const cur = [] // 存储当前排列结果
  const res = []
  const visited = {} // map 避免重复使用同一个数字

  function dfs(nth) {
    // 递归退出条件
    if(nth === len) {
      res.push(cur.slice()) // 拷贝当前排列组合，添加到结果数组中
      return
    }

    // 递归条件
    for(let i = 0; i < len; i++) {
      if(!visited[nums[i]]) {
        visited[nums[i]] = 1

        cur.push(nums[i])
        // 进一步递归
        dfs(nth + 1)

        // nums[i]让出当前坑位 ？？？
        cur.pop()

        // 移除掉 ”已使用“的标识
        visited[nums[i]] = 0
      }
    }
  }

  // 从索引0开始排序
  dfs(0)
  return res
}

const nums = [1, 2, 3]

console.log('permute(nums)', permute(nums))


