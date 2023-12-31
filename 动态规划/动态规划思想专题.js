// https://juejin.cn/book/6844733800300150797/section/6844733800367276039
// https://juejin.cn/book/6844733800300150797/section/6844733800371453965

// 什么样的提醒应该用动态规划来实现？基于2个特征：
// 1. 最优子结构：问题的最优解包含着子问题的最优解--- 不管前面的决策如何，此后的状态必须是基于当前的状态（由上次的决策产生）产生的最优决策，
//   例如f(n) = f(n - 1) + f(n - 2), 这个关系叫做“状态转移方程”
// 2. 重叠子问题，在递归的过程中，出现了反复的计算

// 动态规划问题复杂在哪里？
// 1. 状态方程不好确定
// 2. 已知的状态可能不明显
// 3. 递归转迭代

// 对于动态规划，推荐的分析路径：
// 1. 递归思想明确树形思维模型：找到问题的终点，思考倒退的姿势，往往可以帮助你更快的明确“状态间的关系”；
// 2. 结合记忆化搜索，明确状态转移方程；
// 3. 递归代码转化为迭代表达

// 哪些问题可以用动态规划来处理？
// - 最值问题


// 爬楼梯问题：
// 题目描述：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 注意：给定 n 是一个正整数。

// 输入： 2
// 输出： 2
// 解释： 有两种方法可以爬到楼顶。

// 1 阶 + 1 阶
// 2 阶
// 示例 2：
// 输入： 3
// 输出： 3
// 解释： 有三种方法可以爬到楼顶。

// 1 阶 + 1 阶 + 1 阶
// 1 阶 + 2 阶
// 2 阶 + 1 阶

// 动态规划思路分析，找到f(n) = f(n-1)+f(n-2)
// 一般是递归+记忆搜索优化；动态规划采用的是迭代
// 常用实现
const map = {}
function climbStairs0(n) {
  if(n === 1 || n === 2) return n
  if(map[n] === undefined) {
    // 缓存计算结果，避免重复求值
    map[n] = climbStairs0(n - 1) + climbStairs0(n - 2)
  }
  // 若map[n]已经求解过,则直接取值
  return map[n]
}
// 动态规划
function climbStairs(n) {
  // 初始化记忆数组
  const fn = []
  // 初始化已知值
  fn[1] = 1
  fn[2] = 2
  // 动态更新每一层楼梯对应的结果
  for(let i = 3; i <= n; i++) {
    fn[i] = f[i - 1] + f[i - 2]
  }
  return fn[n]
}

// 最长上升子序列问题
// 子序列：在原有序列的基础之上，删除0个或者多个元素，其他元素保持顺序不变得到的结果
// 题目描述：给定一个无序的整数数组，找到其中最长上升子序列的长度。

// 示例:
// 输入: [10,9,2,5,3,7,101,18]
// 输出: 4
// 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
// 说明:
// 可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。 你算法的时间复杂度应该为 O(n^2) 。
// 进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?

// 解析：动态规划思想来分析，
// 序列类题目，背后思想是一致的：
// “关注到序列中的索引，尝试找到不同索引与对应元素之间的关系，并以索引为线索，构造一维或者二维的状态数组”

// 上题目中，关注到：第i个元素为结尾的前i个元素的状态
// f(i) 表示前i个元素中最长上升子序列的长度，若想基于f(i)求解除f(i+1),则有两种可能情况：
// - 若第i+1个元素比第i个元素大，则在第i个元素的最长上升子序列的基础上添加第i+1个元素，延长上升子序列；
// - 若第i+1个元素不大于第i个元素，则维持原状


function lengthOfLIS(nums) {
  const len = nums.length
  if(!len) return 0 // 边界情况处理
  // 初始化数组里每个索引为的状态值，表示每个索引对应的最长上升子序列长度为1，即只有自身对应的元素
  const dp = new Array(len).fill(1)
  let maxLen = 1 // 初始化整个数组的最长上升子序列
  for(let i = 1; i < len; i++) {
    // 每遍历一个新元素，都要和之前的元素对比，看是否可以延长原有的上升序列
    for(let j = 0; j < i; j++) {
      // 若遇到比当前位小的数，则表示可以延长上升子序列，故当前位状态需要+1
      if(nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j]+1)
      }
    }
    // 即时更新上升子序列的状态值
    if(dp[i] > maxLen) maxLen = dp[i]
  }
  return maxLen
}
const nums = [10,9,2,5,3,7,101,18]
// console.log('lengthOfLIS', lengthOfLIS(nums))
// 时间复杂度：O(n^2)
// 若要进阶到O(^nlogn),需要借助双指针，详细实现查看./最长上升子序列.js


// “最值”型问题典范：如何优雅地找硬币
// 题目描述：给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

// 示例1：
// 输入: coins = [1, 2, 5], amount = 11
// 输出: 3
// 解释: 11 = 5 + 5 + 1

// 示例2：
// 输入: coins = [2], amount = 3
// 输出: -1

// 分析：
// f(36) = Math.min(f(36-c1)+1,f(36-c2)+1,f(36-c3)+1......f(36-cn)+1)
// 递归退出边界：f[0] = 0

function coinChange(coins, amount) {
  // 用于保存每个金额对应的最小硬币数
  const f = []
  // 提前定义已知情况
  f[0] = 0
  const len = coins.length
  // 遍历[1,amount]间的硬币总额
  for(let i = 1; i <= amount; i++) {
    // 求的是最小值，假设为无穷大, 确保它一定会被更小的值更新
    f[i] = Infinity
    for(let j = 0; j < len; j++) {
      if(i - coins[j] >= 0) {
        // 状态转移方程
        f[i] = Math.min(f[i], f[i - coins[j]] + 1)
      }
    }
  }

  // 若无穷大，则表示没有符合的硬币总数，按题意返回-1
  if(f[amount] === Infinity) {
    return -1
  }
  // console.log('f', f);
  return f[amount]
  
}

function coinChange2(coins, amount) {
  const f = []
  f[0] = 0 // 定义边界值
  const len = coins.length
  for(let price = 1; price <= amount; price++) {
    f[price] = Infinity // 初始设置无穷大，以便于可以被更小的值覆盖
    for(let cIndex = 0; cIndex < len; cIndex++) {
      // 目标金额大于当前硬币金额
      if(price - coins[cIndex] >= 0) {
        // 状态转译方程
        f[price] = Math.min(f[price], f[price - coins[cIndex]] + 1)
      }
    }
  }
  // 目标金额不能通过硬币金额组成，返回-1
  if(f[amount] === Infinity) return - 1
  // 满足条件
  return f[amount]
}
// 验证：
const coins = [1, 2, 5], amount = 11
// console.log('coinChange(coins, amount)', coinChange2(coins, amount))
// 假设amount为n, 硬币数为k
// 时间复杂度O(kn)
// 空间复杂度T(n) 数组f的长度n + len + i + j

// 有 n 件物品，物品体积用一个名为 w 的数组存起来，物品的价值用一个名为 value 的数组存起来；
// 每件物品的体积用 w[i] 来表示，每件物品的价值用 value[i] 来表示。现在有一个容量为 c 的背包，
// 问你如何选取物品放入背包，才能使得背包内的物品总价值最大？

// 注意：每种物品都只有1件

// 动态规划
// 动态方程
// dp中保存的是是 一定物品数量和体积情况下，对应的最大物品价值
// i: 物品数
// v: i个物品的总体积
// w: 数组，对应每个物品的体积
// c: 背包容量，对应每个物品的价值
// dp[i][v] = Math.max(dp[i-1][v], dp[i-1][v-w[i]] + c[i])
// 对应的实现
// let  max = 0
// for(let i=1;i<=n;i++) {
//   for(let v=w[i]; v<=c;v++) {
//     dp[i][v] = Math.max(dp[i-1][v], dp[i-1][v-w[i]]+value[i])
//     if(d[i][v] > max) max = d[i][v]
//   }
// }
// return max

function knapsack(n, capacity, w, value) {
  // dp[i]: 一定容量情况下对应的最大物品价值， i是容量和
  const dp = new Array(capacity+1).fill(0) // ? 为什么是c+1

  let max = -Infinity
  // 自变量是物品
  for(let i = 0; i < n; i++) {
    for(let c = capacity; c >=w[i]; c--) {
      // 状态方程
      dp[c] = Math.max(dp[c], dp[c-w[i]] + value[i])
      if(dp[c] > max) max = dp[c]
    }
  }
  return max
}


