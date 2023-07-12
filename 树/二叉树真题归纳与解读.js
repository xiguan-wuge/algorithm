// 文章地址：https://juejin.cn/book/6844733800300150797/section/6844733800363065352


// 题目描述：给定一个二叉树，返回它的前序（先序）遍历序列。

// 示例: 输入: [1,null,2,3]

// 1   
//  \   
//   2   
//  /  
// 3 

// 输出: [1,2,3]
// 进阶: 递归算法很简单，你可以通过迭代算法完成吗？

// 先序遍历： 根 -》 左 -》 右
function preOrderTraversal(root) {
  const res = []
  if(!root) {
    return res
  }

  // 借助栈
  const stack = []
  // 现将根节点入栈
  stack.push(root)
  // 若栈不为空，重复执行入栈、出栈
  while(stack.length) {
    // 将栈顶节点标记为当前节点
    const cur = stack.pop()
    // 当前节点就是当前子树的根节点，将这个加点放在结果数组的尾部
    res.push(cur.val)
    // 栈：后进先出，所以右子树先入栈，左子树后入栈，以便后续执行时，先取左子树执行，再右子树执行
    // 若当前子树有右孩子，则将右孩子入栈
    if(cur.right) {
      stack.push(cur.right)
    }
    // 若有左孩子，则左孩子入栈
    if(cur.left) {
      stack.push(cur.left)
    }
  }
  return res
}


// 模拟树结构
const tree = {
  val: 1,
  right: {
    val: 2,
    left: {
      val: 3
    }
  }
}
// console.log('先序： ', preOrderTraversal(tree))

// 后续遍历
// 左-右-中
function nextOrderTraversal(root) {
  const res = []
  if(!root) return res
  const stack = []

  stack.push(root)

  while(stack.length) {
    const cur = stack.pop()
    // 依次往对头添加，实现左右中的效果
    res.unshift(cur.val)
    if(cur.left) {
      stack.push(cur.left)
    }
    if(cur.right) {
      stack.push(cur.right)
    }
  }
  return res
}
// console.log('后序： ', nextOrderTraversal(tree))


// 中序遍历
// 左中右
function inOrderTraversal(root) {
  const res = []
  if(!root) return res

  const stack = []
  let cur = root

  while(cur || stack.length) {
    // console.log(1111, cur);
    while(cur) {
      // console.log(2222222, cur);
      // 将途径的节点入栈, 关键点就是在于此，在查找左孩子的过程中，记录了途径的根节点和左节点
      stack.push(cur)
      // 查找左节点
      cur = cur.left
    }
    // 取出栈顶元素
    cur = stack.pop()
    // console.log('栈顶', cur);
    res.push(cur.val)

    // 尝试读取cur的右孩子
    cur = cur.right
  }
  return res
}

// console.log('中序： ', inOrderTraversal(tree))

// 层序遍历的衍生问题    
// 题目描述：给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

// 示例： 二叉树：[3,9,20,null,null,15,7],

// 3
// / \
// 9  20
//  /  \
// 15   7

// 返回其层次遍历结果：
// [
// [3],
// [9,20],
// [15,7]
// ]

// 层序遍历，考虑队列
function leverOrder(root) {
  const res = []
  if(!root) return res
  
  const queue = []
  // 队列的第一个元素时根节点
  queue.push(root)
  
  while(queue.length) {
    // 用level才存储当前层的节点
    const level = []
    const len = queue.length // 记录当前对列的长度，后续queue会变化
    for(let i = 0; i < len; i++) {
      // 取出队列的头部元素
      const top = queue.shift()
      level.push(top.val)
      // 若有左孩子，推入下一层级
      if(top.left) {
        queue.push(top.left)
      }
      // 若有右孩子，推入下一层级
      if(top.right) {
        queue.push(top.right)
      }
    }
    // 将level推入结果数组
    res.push(level)
  }
  return res
}

const tree2 = {
  val: 3,
  left: {
    val: 9
  },
  right: {
    val: 20,
    left: {
      val: 15,
    },
    right: {
      val: 7
    }
  }
}

// console.log('层序', leverOrder(tree2))

// 翻转二叉树，经典考题
// 题目描述：翻转一棵二叉树。

// 示例：
// 输入：
//       4
//     /   \
//     2    7
//   / \   / \
//   1  3 6   9

// 输出：
//       4
//     /   \
//   7     2
// / \     / \
// 9  6   3  1

// 解析：
// 翻转，意味着交换每棵子树的左右孩子，即重复 =》 递归

function invertTree(root) {
  if(!root) return root // 递归的退出边界

  // 递归交换子树的右子节点
  let right = invertTree(root.right)
  let left = invertTree(root.left)

  // 交换当前树的左右节点
  root.left = right
  root.right = left

  return root
}

const tree3 = {
  val: 4,
  left: {
    val: 2,
    left: {
      val: 1
    },
    right: {
      val: 3
    }
  
  },
  right: {
    val: 7,
    left: {
      val: 6
    },
    right: {
      val: 9
    }
  }
}

console.log('翻转', invertTree(tree3))





