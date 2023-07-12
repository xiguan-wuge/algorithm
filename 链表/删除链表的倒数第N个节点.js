// 删除链表倒数第 n 个结点
// 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

// 示例：

// 给定一个链表: 1->2->3->4->5, 和 n = 2.
// 当删除了倒数第二个节点后，链表变为 1->2->3->5.
// 说明：

// 给定的 n 保证是有效的。

// 进阶：

// 你能尝试使用一趟扫描实现吗？

// 解法：快慢指针

var removeNthFromEnd = function (head, n) {
  let fast = head, slow = head
  // 快 先走n-1步
  while (--n) {
    fast = fast.next
  }
  // 考虑到n等于链表长度的情况
  if (!fast.next) return head.next
  // fast 再走一步，实现fast 快slow n 步
  fast = fast.next
  // 同步前行
  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }
  // 删除倒数第n个节点
  slow.next = slow.next.next
  return head
};

function removeNthFromEnd(head, n) {
  let fast = head,slow = head
  while(--n) {
    fast = fast.next
  }
  if(!fast.next) return head.next // 链表长度等于n
  fast = fast.next // 实现fast比slow 快n步
  while(fast.next) {
    fast = fast.next
    slow = slow.next
  }
  // 删除节点
  slow.next = slow.next.next
  return head
}