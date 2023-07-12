// https://leetcode-cn.com/problems/add-two-numbers/

// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
// 请你将两个数相加，并以相同形式返回一个表示和的链表。
// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

function addTwoNumber(l1, l2) {
  // 一个用来表示链表头部，一个用于不断添加链表节点
  let head = null, tail = null
  // 进位值，如9+8=7，则进位值是1，22+33=55，进位值是5
  let curry = 0
  while(l1 || l2) {
    const n1 = l1 ? l1.val : 0
    const n2 = l2 ? l2.val : 0
    const sum = n1 + n2 + curry
    if(!head) {
      // 创建当前项的链表初始节点
      head = tail = new ListNode(sum % 10)
    } else {
      // 添加当前项节点
      tail.next = new ListNode(sum % 10)
      // 节点后移
      tail = tail.next
    }
    // 取进位值
    curry = Math.floor(sum / 10)
    
    if(l1) {
      l1 = l1.next
    }
    if(l2) {
      l2 = l2.next
    }
  }
  // 若最后进位值大于0，则在链表最后再添加一个节点
  if(curry) {
    tail.next = new ListNode(curry)
  }
  // 返回链表的最前项
  return head
}