// 高频面试题：如何用栈实现一个队列？
// 题目描述：使用栈实现队列的下列操作：
// push(x) -- 将一个元素放入队列的尾部。
// pop() -- 从队列首部移除元素。
// peek() -- 返回队列首部的元素。
// empty() -- 返回队列是否为空。

// 示例: MyQueue queue = new MyQueue();
// queue.push(1);
// queue.push(2);
// queue.peek(); // 返回 1
// queue.pop(); // 返回 1
// queue.empty(); // 返回 false

// 说明:
// 你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
// 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
// 假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。

// 解决思路：
// - 关键点：栈和队列的不同：栈：后进先出；队列：先进先出
// - 采用两个栈来实现，stack1 用于正常入栈，stack2用于依次从stack1取值，实现队列先进先出的效果。
// - 当stack新入栈时，正常入栈；当stack2为空时，再依次从stack1取值

class MyQueue {
  constructor() {
    this.stack1 = []
    this.stack2 = []
  }

  push(x) {
    this.stack1.push(x)
  }
  // 删除对头的节点
  pop() {
    // 先从stack1取值存入stack，以实现先进先出效果
    if(this.stack2.length <= 0) {
      while(this.stack1.length) {
        this.stack2.push(this.stack1.pop())
      }
    }

    // 为了实现 逆序效果，从stack2 取值
    return this.stack2.pop()
  }

  // 返回对头的元素
  peek() {
    if(this.stack2.length <= 0) {
      while(this.stack1.length) {
        this.stack2.push(this.stack1.pop())
      }
    }
    const stack2Len = this.stack2.length
    // stack2 有值才取值
    return stack2Len && this.stack2[stack2Len - 1]
  }

  // 判断队列是否为空
  empty() {
    return !this.stack1.length && !this.stack2.length
  }
}

// 用栈模拟队列
class MyQueue2 {
  constructor() {
    this.stack1 = []
    this.stack2 = []
  }

  // 将元素添加到队列尾部
  push(x) {
    this.stack1.push(x)
  }
  // 移除队列首部元素并返回
  // 队列，先进先出。利用数组模拟，则是取出第0项
  pop() {
    // 借助栈2，将栈1的数据存储到栈2中，实现队列效果
    // 为了维系对了原有的顺序不被push打破，栈2为空时才从栈1push
    if(this.stack2.length <= 0) {
      while(this.stack1.length) {
        this.stack2.push(this.stack1.pop())
      }
    }
    return this.stack2.pop()
  }
  // 返回队列首部元素
  peek() {
    if(this.stack2.length <= 0) {
      while(this.stack1.length) {
        this.stack2.push(this.stack1.pop())
      }
    }
    const len = this.stack2.length - 1
    return len >= 0 && this.stack2[len]
  }
  // 判断当前队列是否为空
  empty() {
    return !this.stack1.length && !this.stack2.length
  }
}

// 验证：
// const queue = new MyQueue2();
// queue.push(1);
// queue.push(2);
// queue.push(3);
// queue.push(4);
// console.log(queue.pop()); 
// queue.push(5);
// console.log(queue.pop()); 
// console.log(queue.pop()); 
// console.log(queue.pop()); 
// console.log(queue.pop()); 

// console.log(queue.peek()); 
// console.log(queue.empty()); 



// 滑动窗口问题：
// 题目描述：给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。

// 示例: 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]

// 解释: 滑动窗口的位置
// ---------------
// [1 3 -1] -3 5 3 6 7
// 1 [3 -1 -3] 5 3 6 7
// 1 3 [-1 -3 5] 3 6 7
// 1 3 -1 [-3 5 3] 6 7
// 1 3 -1 -3 [5 3 6] 7
// 1 3 -1 -3 5 [3 6 7]

// 最大值分别对应：
// 3 3 5 5 6 7

// 提示：你可以假设 k 总是有效的，在输入数组不为空的情况下，1 ≤ k ≤ 输入数组的大小。

// 思路：双指针 + 遍历
// O(kn), 但这个时间复杂度还不够优化，面试官可能会进一步追问优化
function maxSlidingWindow(nums, k) {
  const len = nums.length
  const res = []
  let left = 0, right = k - 1

  while(right < len) {
    const max = calMax(nums, left, right) // 计算滑动窗口的最大值
    res.push(max)
    left++
    right++
  }
  return res
}

function calMax(arr, left, right) {
  if(!arr || !arr.length) return

  let max = arr[left]
  for(let i = left; i < right; i ++) {
    if(arr[i] > max) {
      max = arr[i]
    }
  }
  return max
}


// 思路：双端队列方案
// 双端对列：同时满足 pop/push shift/unshift的队列，即可以同时在队列头尾进行增删操作的队列

// 思考：如果我们能在窗口发生移动时，只根据发生变化的元素对最大值进行更新，那复杂度是不是就低很多了？
// 核心的思路是维护一个有效的递减队列。
// 每尝试推入一个元素前，都把这个元素与队列尾部的元素作对比。根据对比结果的不同，采取不同的措施：
//  - 如果试图推入的元素（当前元素）大于队尾元素，则意味着队列的递减趋势被打破了。
//    此时我们需要将队列尾部的元素依次出队（注意由于是双端队列，所以队尾出队是没有问题的），
//    直到队尾元素大于等于当前元素为止，此时再将当前元素入队。
//  - 如果试图推入的元素小于队列尾部的元素，那么就不需要额外的操作，直接把当前元素入队即可。
// 链接：https://juejin.cn/book/6844733800300150797/section/6844733800358871054


function maxSlidingWindow2(nums, k) {
  const len = nums.length
  const res = []
  // 初始化双端队列
  const deque = []
  for(let i = 0; i < len; i++) {
    // 当对尾元素小于当前元素时，依次出队
    while(deque.length && nums[deque.length - 1] < nums[i]) {
      deque.pop()
    }
    // 入队，注意入队的是当前索引
    deque.push(i)

    // 当对头的索引已经被移除滑动窗口时，对头元素出队
    while(deque.length && deque[0] < i - k) {
      deque.shift()
    }

    // 判断滑动窗口的状态，只有被遍历的元素个数大于k时，才更新结果数组
    while(i >= k - 1) {
      res.push(nums[deque[0]])
    }
  }
  return res
}

function maxSlidingWindow3(nums, k) {
  const len = nums.length
  const queue = []
  const res = []
  // let item
  for(let i = 0; i < len; i++) {
    // item = nums[i]
    // 维护一个递减队列，用于获取区间内的最大值
    while(queue.length && nums[queue[queue.length - 1]] < nums[i]) {
      // 若队尾元素是否小于当前元素，若是则移除队尾元素
      queue.pop()
    }
    // 移除小于对位队列数据之后，队列添加新数据，为了比较，此处存入的是索引
    queue.push(i)
    

    // 需要将队列中不在当前区间的值移除
    if(queue.length && queue[0] <= i - k) {
      // 由于遍历，索引是递增的，所以判断队列第0项是否已经在区间长度之外
      queue.shift()
    }

    // 将最大值添加结果中， 
    if(i >= k - 1) {
      // 通过索引>=k-1, 即i>=2都是符合的
      // 取队首元素入结果
      res.push(nums[queue[0]])
    }
  }

  return res
}

console.log('双端队列+滑动窗口', maxSlidingWindow3([1,3,-1,-3,5,3,6,7], 3)) //  [3,3,5,5,6,7]