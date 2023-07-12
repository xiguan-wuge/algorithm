// 环形链表

// 环形链表基本问题——如何判断链表是否成环？
// 真题描述：给定一个链表，判断链表中是否有环。

// 示例 1：
// 输入：[3,2,0,4]（链表结构如下图） 输出：true
// 解释：链表中存在一个环
// 3 -> 2 -> 0 -> 4 -> 2(回到2)

// 解析：可以借助flag变量，遍历过的节点，设置flag值，当再次访问到flag值时，即表示访问已经访问过的节点，即有环

function hasCycle(head) {
  while(head) {
    if(head.flag) {
      // 再次访问已经访问过的节点，即有环
      return true
    } else {
      head.flag = true
      head = head.next
    }
  }
  return false
}

const list = {
  val: 3,
  next: {
    val: 2,
    next: {
      val: 0,
      next: {
        val: 4,
        next: null
      }
    }
  }
}
// 设置成环形
list.next.next.next.next = list.next

// console.log('hasCycle: ', hasCycle(list))

// 环形链表衍生问题——定位环的起点
// 真题描述：给定一个链表，返回链表开始入环的第一个结点。 如果链表无环，则返回 null。

// 示例 1：
// 输入：head = [3,2,0,-4]（如下图）
// 输出：tail connects to node index 1 
// 解释：链表中有一个环，其尾部连接到第二个结点。
// 环形结构： 3 -> 2 -> 0 -> -4 -> 2(回到节点2)

// 示例 2：
// 输入：head = [1,2]（如下图）
// 输出：tail connects to node index 0
// 解释：链表中有一个环，其尾部连接到第一个结点。
// 环形：1 -> 2 -> 1(回到节点1)

// 示例 3：
// 输入：head = [1]（如下图）
// 输出：no cycle
// 解释：链表中没有环。

// 解析：即在判断有环的实现之上，给每个节点设置index值，再次访问已访问节点时，获取index值

function getCyclefirstNodeIndex(head) {
  let index = 0
  while(head) {
    if(head.flag) {
      return `tail connects to node index ${head.index}`
    } else {
      head.flag = true
      head.index = index++
      head = head.next
    }
  }
  return 'no cycle'
}

// console.log('getCyclefirstNodeIndex: ', getCyclefirstNodeIndex(list))

// 进阶解法：公认的比较经典的思路：快慢指针
// 解析：定义快慢指针，
// 初始情况，快慢指针都指向第一个节点，
// 慢指针一次走一步，快指针一次走两步，若有环，一定会相遇。相遇后的下一个节点即时环的起始节点
function getCyclefirstNodeIndex2(head) {
  let hasCycle = false, index = 0, cycleIndex
  let slow = head
  let fast = head
  head.index = index
  // 循环条件终止是什么: 1. slow jie点到达终止节点 next=null; 2. slow === fast ,
  while(slow && !hasCycle) {
    // index !== 0  排除第一个节点
    if(index !== 0 && slow === fast) {
      hasCycle = true
      cycleIndex = slow.next.index
    } else {
      slow = slow.next
      slow.index = index++
      fast = fast.next.next
    }
  }
  return hasCycle ? `tail connects to node index ${cycleIndex}` : 'no cycle'
}
console.log('getCyclefirstNodeIndex: ', getCyclefirstNodeIndex2(list))