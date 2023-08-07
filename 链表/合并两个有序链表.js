// 合并两个有序链表
// 将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

// 示例：

// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4

// https://www.pzijun.cn/algorithms/list/2.html
// https://leetcode-cn.com/problems/merge-two-sorted-lists/
// 可以类比 合并两个有序数组
// https://leetcode-cn.com/problems/merge-sorted-array/submissions/

// 时间复杂度O(s),s = m+n
function mergeTwoList(l1, l2) {
  if(l1 === null) return l2
  if(l2 === null) return l1
  if(l1.val <= l2.val) {
    l1.next = mergeTwoList(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoList(l2.next, l1)
    return l2
  }
}

function mergeTwoList2(l1, l2) {
  // 定义头目标节点
  // let head = new NodeList()
  let head = {}
  // 动态指针
  let cur = head
  // 取两个有序链表中的较小值
  while(l1 && l2) {
    if(l1.val <= l2.val) {
      cur.next = l1
      l1 = l1.next
    } else {
      cur.next = l2
      l2 = l2.next
    }
    // 目标指针也要前进一步
    cur = cur.next
  }

  // 处理2个链表长度不同的情况：将剩余部分直接添加到目标指针后面
  cur.next = l1 === null ? l2 : l1

  // 返回起始节点
  return head.next
}

function mergeTwoList3(l1, l2) {
  // 定义目标节点
  const head = {}
  let cur = head
  // 取两个链表节点中的较小值
  while(l1 && l2) {
    if(l1.val <= l2.val) {
      cur.next = l1
      l1 = l1.next // l1遍历后移
    } else {
      cur.next = l2
      l2 = l2.next
    }
    // 关键位置，组成新的链表
    cur = cur.next
  }

  // 处理链表长度不同的情况
  cur.next = l1 == null ? l2: l1
  
  return head.next
}

// 验证：
const list1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 4,
      next: null
    }
  }
}
const list2 = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 4,
      next: null
    }
  }
}

console.log(JSON.stringify(mergeTwoList3(list1, list2)))