// 二叉树概念：
// - 可以是一个空树（没有根节点）；
// - 若不是空树，则必须由根节点、左子树、右子树组成，且左右子树都是二叉树

// 二叉树遍历：
// - 递归遍历：
//   - 先序遍历
//   - 中序遍历
//   - 后续遍历
// - 迭代遍历： 层次遍历

// 先序、中序、后序遍历的区分：
// 左子树一定是先于右子树先执行
// 关键是根节点的遍历时机：
// - 先序：根节点 -> 左子树 -> 右子树 
// - 中序：左子树 -> 根节点 -> 右子树
// - 后续： 左子树 -> 右子树 -> 根节点

// 用js表示二叉树
// 二叉树节点构造函数
function binaryTreeNode(val) {
  this.val = val
  this.left = this.right = null
}

// js表示二叉树
const root = {
  val: 'a',
  left: {
    val: 'b',
    left: {
      val: 'd'
    },
    right: {
      val: 'e'
    }
  },
  right: {
    val: 'c',
    right: {
      val: 'f'
    }
  }
}

// 先序遍历
function preOrder(root) {
  // 遍历边界
  if(!root) return

  console.log('当前节点值是： ', root.val)
  preOrder(root.left)
  preOrder(root.right)
}

// preOrder(root) // a b d e c f

// 中序遍历
function inOrder(root) {
  // 遍历边界
  if(!root) return

  preOrder(root.left)
  console.log('当前节点值是： ', root.val)
  preOrder(root.right)
}
// inOrder(root) // b d e a c f


// 后序遍历
function nextOrder(root) {
  // 遍历边界
  if(!root) return

  preOrder(root.left)
  preOrder(root.right)
  console.log('当前节点值是： ', root.val)

}
// console.log('后续遍历：')
nextOrder(root) // b d e c f a




