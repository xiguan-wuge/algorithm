// 编写一个程序，找到两个单链表相交的起始节点

// 输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
// 输出：Reference of the node with value = 8（为什么不是1，因为链表中节点相等指的是value和next都相等，）
// 输入解释：相交节点的值为 8 （注意，如果两个列表相交则不能为 0）。
// 从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。
// 在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。

// 输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
// 输出：Reference of the node with value = 2
// 输入解释：相交节点的值为 2 （注意，如果两个列表相交则不能为 0）。
// 从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。在 A 中，相交节点前有 3 个节点；
// 在 B 中，相交节点前有 1 个节点。

// 输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
// 输出：null
// 输入解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
// 解释：这两个链表不相交，因此返回 null。

// https://www.pzijun.cn/algorithms/list/7.html

// set缓存加变量
function getInsertedNode(headA, headB) {
  const set = new Set()
  let temp = headA
  while(temp !== null) {
    set.add(temp)
    temp = temp.next
  }
  temp = headB
  while(temp !== null) {
    if(set.has(temp)) {
      return temp
    }
    temp = temp.next  
  }
}

// 双指针
function getInsertedNode(headA, headB) {
  let p1 = headA, p2 = headB
  while(p1 || p2) {
    if(p1 === p2) return p1
    p1 = p1 === null ? headB : p1.next
    p2 = p2 === null ? headA : p2.next
  }
  return null
}

// 双指针
function getInsertedNode(headA, headB) {
  let p2 = headA, p2 = headB
  while(p1 || p2) {
    if(p1 === p2) return p1 // 找到相同节点
    p1 = p1 === null ? headB : p1.next
    p2 = p2 === null ? headA : p2.next
  }
  return null
}