// 反转链表
// 示例:

// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL
// 进阶: 你可以迭代或递归地反转链表。你能否用两种方法解决这道题

// https://www.pzijun.cn/algorithms/list/4.html


const list = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null
        }
      }
    }
  }
}
// 迭代法O(n)
function reverseList(head) {
  if(!head || !head.next) return head
  let prev = null, curr = head
  while(curr) {
    // 保存后一个节点
    const next = curr.next
    // 当前node的next指向前一项
    curr.next = prev
    //  修改前一项和当前项，便于下一轮交换
    prev = curr
    curr = next
  }
  return prev
  // head = prev
  // return head
}
function reverseList2(head) {
  if(!head || !head.next) return head

  let prev = null, next = null, cur = head

  while(cur) {
    const next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }

  return prev
}
// console.log('反转链表：', reverseList2(list));
// 尾递归法O(n)
// function reverseList(head) {
//   if(!head || !head.next) return head
//   head = reverse(null, head)
//   return head
// }
// function reverse(prev, curr) {
//   var next = curr
//   curr.next = prev
//   return reverse(curr, next)
// }


// 局部反转一个链表
// 真题描述：反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

// 说明: 1 ≤ m ≤ n ≤ 链表长度。
// 示例:
// 输入: 1->2->3->4->5->NULL, m = 2, n = 4
// 输出: 1->4->3->2->5->NULL

// 解析：
// - 在全部反转的基础纸上，将局部的反转，需要记录局部之前的那个节点
// - 借助多指针，指向局部反转的部分

function reverseBetween(head, m, n) {
  // 用leftHead 来表示局部区间的 前驱节点
  let pre, cur, leftHead

  const dummy = {next: head}
  
  // 定义游标，用于遍历
  let p = dummy
  // p前进m-1步
  for(let i = 0; i < m - 1; i++) {
    p = p.next
  }
  // 缓存局部区间的前驱节点
  leftHead = p

  // start 局部区间的第一个节点
  let start = leftHead.next 
  pre = start
  cur = start.next

  // 开始重复反转动作
  for(let i = m; i < n; i++) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }


  // leftHead的后继节点 指向 反转后的第一个节点
  leftHead.next = pre
  // 将反转区间的最后一个节点指向 cur
  start.next = cur
  return dummy.next
}


function reverseBetween2(head, m, n) {
  let pre, cur, next, partFirst, partPre
  
  const dummy = {val: null, next: head}

  // 借助游标，前进到需要交换的区间的前一个节点
  let temp = dummy
  for(let i = 1; i < m; i++) {
    temp = temp.next
  }

  // 设置局部区间partPre的初始节点和缓存交换区间的第一个节点partFirst
  partPre = temp
  partFirst = partPre.next // 局部区间的第一个节点
  pre = partFirst
  cur = partFirst.next 

  // 交换局部区间的顺序
  for(let i = m; i < n; i++) {
    next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  // 将局部区间的前继节点指向交换后区间的第一个节点
  partPre.next = pre
  // partFirst 交换前局部区间的第一个节点，交换后局部区间的最后一个节点，将其指向原本的后一个节点，即当前的cur
  partFirst.next = cur

  return dummy.next
}

console.log('局部反转： ', JSON.stringify(reverseBetween2(list, 2, 4)))