// 真题描述：给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

// 示例 1:
// 输入: 1->1->2
// 输出: 1->2
// 示例 2:
// 输入: 1->1->2->3->3
// 输出: 1->2->3

// 分析： 链表的删除，关键是next指针的再赋值
// 不要小看这道删除题，考察了链表的遍历与删除
function deleteDuplicates(head) {
  let cur = head

  while(cur !==  null && cur.next !== null) {
    if(cur.val === cur.next.val) {
      // 去重
      cur.next = cur.next.next
    } else {
      // 继续遍历
      cur = cur.next
    }
  }

  return head
}

const list = {
  val: 1, 
  next: {
    val: 1,
    next: {
      val: 2,
      next: {
        val: 3,
        next: {
          val: 3,
          next: null
        }
      }
    }
  }
}

// function deleteDuplicates2(list) {
//   let cur = list
//   while(cur !== null && cur.next !== null) {
//     if(cur.val === cur.next.val) {
//       cur = cur.next.next
//     } else {
//       cur = cur.next
//     }
//   }
//   return list
// }

// console.log('链表删除',deleteDuplicates(list))

// 删除问题的延伸——dummy 结点登场
// 真题描述：给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。

// 示例 1:
// 输入: 1->2->3->3->4->4->5
// 输出: 1->2->5
// 示例 2:
// 输入: 1->1->1->2->3
// 输出: 2->3

// 解析：
// - 在上一题的基础上，需要保留重复的节点，用于判断后续是否重复
// - 有可能第一个结点是重复的，所以需要借助 dummy结点（即人为制造出来的第一个结点的前驱结点，这样链表中所有的结点都能确保有一个前驱结点，也就都能够用同样的逻辑来处理了。）

function deleteDuplicates2(head) {
  // 极端情况，0或者1个结点
  if(!head || !head.next) return head
  const dummy = {val: null, next: null}
  // dummy永远指向head
  dummy.next = head
  let cur = dummy

  // 当cur至少有2个节点时
  while(cur.next && cur.next.next) {
    if(cur.next.val === cur.next.next.val) {
      // 记录当前重复值，
      // 因为是有序链表，所以采用一个基本数据类型值记忆即可；若是非有序链表，则需要借助数组来记录多个重复值
      let val = cur.next.val
      while(cur.next && cur.next.val === val) {
        // 若重复，则删除重复项
        cur.next = cur.next.next 
      }
    } else {
      // 遍历
      cur = cur.next
    }
  }

  return dummy.next
}

function deleteDuplicates3(head) {
  if(!head || !head.next) return head // 0 或者1个节点
  const dummy = { val: null, next: head } // 借助dummy节点，确保可以删除第一个节点
  let cur = dummy
  let repeatVal
  while(cur.next && cur.next.next) {
    if(cur.next.val === cur.next.next.val) {
      repeatVal = cur.next.val
      // 因为有序，可以进一步删除和当前值重复的节点
      while(cur.next && cur.next.val === repeatVal) {
        // 删除节点
        cur.next = cur.next.next
      }
    } else {
      // 正常遍历
      cur = cur.next
    }
  }
  return dummy.next
}

function deleteDuplicates4(head) {
  if(!head || !head.next) return head
  const dummy = {val: null, next: head}

  let cur = dummy, repeatVal
  
  while(cur.next && cur.next.next) {
    if(cur.next.val === cur.next.next.val) {
      repeatVal = cur.next.val
      cur.next = cur.next.next
      while(cur.next && cur.next.val === repeatVal) {
        cur.next = cur.next.next
      }
    } else {
      cur = cur.next
    }
  }

  return dummy.next
}
// 时间复杂度: O(n) = n
console.log(
  '删除所有的重复节点：\n', 
  '原链表：',JSON.stringify(list), '\n', 
  '结果链表：', deleteDuplicates4(list))


// 快慢指针——删除链表的倒数第 N 个结点
// 真题描述：给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

// 示例： 给定一个链表: 1->2->3->4->5, 和 n = 2.
// 当删除了倒数第二个结点后，链表变为 1->2->3->5.
// 说明： 给定的 n 保证是有效的。


// 基础方式，2轮遍历。第一轮获取链表长度，第二段遍历到指定节点，删除对应节点

// 进阶实现：快慢指针，快指针领先慢指针n个节点，当快指针指向最后一个节点时，慢指针指向倒数n+1个节点，此时，删除慢指针后的那个节点即可

function removeNthFromEnd(head, n) {
  // 借助dummy
  const dummy = {next: null}
  dummy.next = head
  let fast = slow = dummy

  // 快指针先走n步
  while(n !== 0) {
    fast = fast.next
    n--
  }

  // 快慢指针一起后移
  while(fast.next) {
    fast = fast.next
    slow = slow.next
    // 当执行到最后一步时，fast指向最后一个节点，slow执行倒数n+1个节点
  }

  // 移除n+1后的节点，即那个倒数第n个节点
  slow.next = slow.next.next

  return dummy.next
}

// console.log('快慢指针删除n', JSON.stringify(removeNthFromEnd(list, 2)))