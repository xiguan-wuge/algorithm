// 剑指 Offer II 091. 粉刷房子
// https://leetcode.cn/problems/JEj789/

// 示例： 输入: [[17,2,17],[16,16,5],[14,3,19]]
// 输出: 10
// 解释: 将 0 号房子粉刷成蓝色，1 号房子粉刷成绿色，2 号房子粉刷成蓝色。
// 最少花费: 2 + 5 + 3 = 10。

// 动态规划
// 动态转译方程：
// f[i][x] = Math.min(f[i-1][x以外的索引1号], f[i-1][x以外的索引2号]) + costs[i][x]
// f[i][x] 表示当粉刷到第一个房子时，使用第x (x=0 | 1 | 2)号油漆对应的总花费的最小值

function minCost(costs) {
  if(!costs || !costs.length) return 0

  const len = costs.length

  // 初始化数组
  const f = new Array(len)
  for(let i = 0; i < len; i++) {
    f[i] = new Array(3)
  }

  // 初始化状态值
  f[0][0] = costs[0][0]
  f[0][1] = costs[0][1]
  f[0][2] = costs[0][2]

  for(let i = 1; i < len; i++) {
    // 刷到当前房子时，采用x种油漆，对应的最小花费
    f[i][0] = Math.min(f[i-1][1], f[i-1][2]) + costs[i][0]
    f[i][1] = Math.min(f[i-1][2], f[i-1][0]) + costs[i][1]
    f[i][2] = Math.min(f[i-1][0], f[i-1][1]) + costs[i][2]
  }

  return Math.min(f[len-1][0], f[len-1][1], f[len-1][2])
}
const minCost2 = function(costs) {
  // 处理边界情况
  if(!costs || !costs.length) return 0 
  // 缓存房子的个数
  const len = costs.length
  // 开始更新状态
  for(let i=1;i<len;i++) {  
      // now表示粉刷到当前房子时对应的价格状态
      const now = costs[i]  
      // prev表示粉刷到上一个房子时的价格状态
      const prev = costs[i-1]  
      // 更新当前状态下，刷三种油漆对应的三种最优价格
      now[0] += Math.min(prev[1], prev[2])  
      now[1] += Math.min(prev[0], prev[2])  
      now[2] += Math.min(prev[1], prev[0])
  }
  // 返回粉刷到最后一个房子时，总价格的最小值
  return Math.min(costs[len-1][0], costs[len-1][1], costs[len-1][2])
};

const costs =[[17,2,17],[16,16,5],[14,3,19]]
console.log('minCost', minCost2(costs));