// 题目：给你 单链表 的头节点 head ，请你反转链表，并返回反转后的链表。
// 例子：

// 输入：head = [1,2,3,4,5]
// 输出：[5,4,3,2,1]

// 输入：head = [1,2]
// 输出：[2,1]

// 输入：head = []
// 输出：[]

// 解法1- 迭代法
// 1. 反转两个节点，将n+1的next 指向n
// 2. 重复上述操作

var reverseList = function(head) {
  console.log('head',head);
  var p1 = head
  var p2 = null
  while(p1) {
    var temp = p1.next
    p1.next = p2
    p2 = p1
    p1 = temp
  }
  console.log('p2', p2);
  return p2
}
