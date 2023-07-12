// 题目描述：设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
// push(x) —— 将元素 x 推入栈中。
// pop() —— 删除栈顶的元素。
// top() —— 获取栈顶元素。
// getMin() —— 检索栈中的最小元素。

// 示例:
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin(); --> 返回 -3.
// minStack.pop();
// minStack.top(); --> 返回 0.
// minStack.getMin(); --> 返回 -2.


// 为实现getMin 时间复杂度为常数，需要借助辅助栈：
// 如何确保 stack2 能够确切地给我们提供最小值？ 这里我们需要实现的是一个从栈底到栈顶呈递减趋势的栈（敲黑板！递减栈出现第二次了哈）：

// 取最小值：由于整个栈从栈底到栈顶递减，因此栈顶元素就是最小元素。
// 若有新元素入栈：判断是不是比栈顶元素还要小，否则不准进入 stack2。
// 若有元素出栈：判断是不是和栈顶元素相等，如果是的话，stack2 也要出栈

class MinStack {
  constructor() {
    this.stack = []
    this.minStack = []
  }
  push(x) {
    this.stack.push(x)
    // minStack入栈条件，x小于minStack栈顶元素
    if(this.minStack.length === 0 || this.minStack[this.minStack.length - 1] >= x) {
      this.minStack.push(x)
    }
  }
  pop() {
    if(this.stack.pop() === this.minStack[this.minStack.length - 1]) {
      // 若出栈元素和minStack栈顶元素相同，则同样出栈
      this.minStack.pop()
    }
  }
  top() {
    const val = this.stack[this.stack.length - 1]
    console.log('top: ', val);
    return val
  }
  getMin() {
    const val = this.minStack[this.minStack.length - 1]
    console.log('getMin: ', val);
    return val
    // 核心：为了实现时间复杂度为常量，将判断最小值的操作 分布到pop 和push 函数中，并借助辅助栈来维系
  }
}

const minStack = new MinStack()
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.push(-3);
minStack.getMin(); // 返回 -3.
minStack.pop();
minStack.top(); // 返回 0.
minStack.getMin(); // 返回 -2.
