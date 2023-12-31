// https://xiaochen1024.com/courseware/60b4f11ab1aa91002eb53b18/61963ce5c1553b002e57bf14
// 贪心算法：
// 概念： 在求解问题时，总是做出当前最好的选择，期望通过局部最优来实现总体最优解，但结果不一定最优（那为什么要这么做呢？）

// 使用场景：最优子结构。即问题能分解成子问题来解决，子问题的最优解能够递推出最终问题的最优解。

// 贪心算法与动态规划的区别：
//   - 贪心对每个子问题都是做出当前的最优解，不能回退；
//   - 动态规划则会保留之前的运算结果，并能根据之前的结果进行选择，有回退功能；
//   - 贪心是动态规划理想化的情况（即无需回退，每个子问题都最优）

// 算法问题，难在：如何将题目意思理解，并转换成对应的算法思路？

// 122. 买卖股票的最佳时机 II（medium）
// 动态规划方案：
function maxProfit(prices) {
  const len = prices.length;
  // 初始化结果数组
  const dp = new Array(len).fill(0).map(v => new Array(2).fill(0))
  // 3. 定义初始值 dp[i][0] 表示当前手中没有股票0， dp[i][1]表示当前手中有股票
  dp[0][0] = 0
  dp[0][1] = -prices[0] // ? 为什么是负数, 因为买入，手中持有现金减少，故-prices[0]

  for(let i = 1; i < len; i++) {
    // 1. 确定状态
    // 状态变化关键有2部分： 1. i=>天数； 2. 当前是否持有股票 0 | 1；

    // 2. 推导状态转移方程

    // 如果没有持有股票，则可能是由前一天的2中情况转移过来：
    //   a. 前一天没有持有，今天也没动；
    //   b. 前一天持有有，但今天卖掉，(因为卖出，所以当前收入增加，但不一定是正向收入，故+price[i])
    // 求这两种情况的最大值
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])

    // 如果持有股票，同样是又两种情况转译过来：
    //   a. 前一天持有，今天继续持有
    //   b. 前一天没有持有，今天买入 （卖出，手中持有现金减少，故-price[i]）
    // 求这两种情况的最大值
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
  }

  return dp[len - 1][0] // 为什么返回的是没有持有股票的结果？因为当前买入，则表示当天手中持有的现金减少
}
// 时间复杂度O(2n) => O(n), n 是数组的长度， 每个数组有持有和不持有两种转移次数，故2n,去掉常数项，n
// 空间复杂度S(2n) =》 S(n), 需要开辟长度为n，子项长度为2的二维数组，因为子项长度是常数，可去，故n

// 进一步优化，空间压缩
// 记录依次累积的最优子结果，进而推导出总的最优结果，
// 借助dp0 dp1 表示前i天（不持有|持有）股票的最优值，进而替代二维数组，减少空间复杂度
function maxProfit2(prices) {
  const len = prices.length
  let dp0 = 0
  let dp1 = -prices[0]

  let newDp0, newDp1

  for(let i = 1; i < len; i++) {
    newDp0 = Math.max(dp0, dp1 + prices[i])
    newDp1 = Math.max(dp1, dp0 - prices[i])

    dp0 = newDp0
    dp1 = newDp1
  }
  return dp0
}
// S(1) 只创建了dp0 dp1 newDep0 newDp1 几个固定常量，不与len关联

// 方案2： 贪心算法
// 思路：
// - 不限交易次数，只要今天价格比昨天高，就交易，收入就增加，最后的和就是最大的利润，
// - 注意第1天没有利润
function maxProfit3(prices) {
  let res = 0
  const len = prices.length
  for(let i = 1; i < len; i++) {
    // 判断条件，若今天的价格大于昨天的价格，则买入，收益增加；小于则加0
    res += Math.max(0, prices[i] - prices[i - 1])
  }
  return res
}
// const prices = [7,1,5,3,6,4]
// const prices = [1,2,3,4,5]
// const prices = [7,6,4,3,1]
// console.log('买卖股票的最佳时机', maxProfit3(prices));


// 455. 分发饼干 (easy)
// https://leetcode.cn/problems/assign-cookies/

// 思路：
//  贪心算法：
//  - 一个饼干只能给一个孩子，大尺寸饼干即可以满足胃口大的孩子，也能满足胃口大的孩子，优先满足胃口小的孩子；
//  - 2个数组由小到大排序，然后从右到左遍历，用大饼干优先满足胃口大的孩子

//  时间O(mlogm + nlogn) 排序的复杂度 +
//  空间S(logm + logn) 排序的额外开销

function findContentChildren(g, s) {
  // 排序： 小 -》 大
  g = g.sort((a, b) => a - b)
  s = s.sort((a, b) => a - b)

  let result = 0
  let sIndex = s.length - 1
  let gLen = g.length - 1
  for(let i = gLen; i >= 0; i--) {
    // 先满足胃口大的孩子
    if(sIndex >= 0 && s[sIndex] >= g[i]) {
      result++
      sIndex--
    }
  }

  return result
}
// const g = [1,2,3], s = [1,1]
// const g = [1,2], s = [1,2,3]
// console.log('findContentChilddren', findContentChildren(g, s))


// 435. 无重叠区间 (medium)
// https://leetcode.cn/problems/non-overlapping-intervals/

// 贪心算法：
// 思路：
// - intervals 按右边界排序，然后从左往右遍历，右边界结束的越早，留给后面的区间的空间就越大，不重合的区间个数就越多；
// - intervals 的长度减去最多的不重复区间，就是最少删除的区间个数

// O(nlogn) 排序nlogn , 循环数组n
// S(nlogn) 排序需要的栈空间

function eraseOverlapIntervals(intervals) {
  if(!intervals.length) return 0

  // 按右边界排序， 由小到大
  intervals.sort((a, b) => a[1] - b[1])

  const len = intervals.length
  // right 初始化，区间的右边界
  let right = intervals[0][1]
  // 最多的不重合区间数
  let res = 1 
  for(let i = 1; i < len; i++) {
    // 循环区间数组
    if(intervals[i][0] >= right) {
      // 当区间的左边界大于上一个区间的右边界时，说明是一对不重合区间
      res++
      // 更新右边界
      right = intervals[i][1]
    }
  }

  // 数组长度 - 最多的不重合区间个数 = 最少需要删除的区间数
  return len - res
}

// const intervals = [[1,2],[2,3],[3,4],[1,3]]
const intervals = [ [1,2], [1,2], [1,2] ]
console.log('无重叠区间', eraseOverlapIntervals(intervals));
