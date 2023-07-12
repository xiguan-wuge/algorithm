// 题目描述: 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。
// 如果之后都不会升高，请在该位置用 0 来代替。

// 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，
// 你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。

// 提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。


// 解析：
// - 栈结构可以帮我们避免重复操作。避免重复操作的秘诀就是及时地将不必要的数据出栈，避免它对我们后续的遍历产生干扰。
// - 思路就是：尝试去维持一个递减栈。

function dailyTemplatures(arr) {
  const len = arr.length
  const stack = []
  const res = new Array(len).fill(0) // 初始化数组

  for(let i = 0; i < len; i ++) {
    // 当栈不为空，且存在打破递减趋势的温度值
    while(stack.length && arr[i] > arr[stack[stack.length - 1]]) {
      // 栈顶值出栈
      const top = stack.pop()
      // 计算： 栈顶值与高于它的第一个温度值的 的索引值的差值
      res[top] = i - top
    }

    // 为便于后续的计算，将索引值入栈
    stack.push(i)
  }

  return res
}
function dailyTemplatures2(temperatures) {
  const arr = temperatures
  const len = arr.length
  const res = new Array(len).fill(0)
  const stack = []
  let top

  for(let i = 0; i < len; i++) {
    while(stack.length && arr[i] > arr[stack[stack.length - 1]]) {
      top = stack.pop()
      res[top] = i - top // 计算比栈顶值大一点的数的索引值差值， 关键值在这
    }
    stack.push(i)
  }

  return res
}

console.log(dailyTemplatures([73, 74, 75, 71, 69, 72, 76, 73]))