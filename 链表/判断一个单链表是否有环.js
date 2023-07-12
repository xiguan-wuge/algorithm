// 判断一个单链表是否有环
// 给定一个链表，判断链表中是否有环。

// 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

// 示例 1：

// 输入：head = [3,2,0,-4], pos = 1
// 输出：true
// 解释：链表中有一个环，其尾部连接到第二个节点。

// https://www.pzijun.cn/algorithms/list/3.html

// 1.标志法 O(n)
// function hasCycle(head) {
//   while(head) {
//     if(head.flag) return true
//     head.flag = true
//     head = head.next
//   }
//   return false
// }

// 2.利用JSON.stringify 不能序列化有循环引用的结构
// function hasCycle(head) {
//   try {
//     JSON.stringify(head)
//     return false
//   } catch(e) {
//     return true
//   }
// }

