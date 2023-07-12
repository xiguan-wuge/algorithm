// 图解字节&leetcode160：编写一个程序，找到两个单链表相交的起始节点
https://leetcode-cn.com/problems/intersection-of-two-linked-lists/solution/xiang-jiao-lian-biao-by-leetcode-solutio-a8jn/
// 时间复杂度 O(m+n), m,n 分别为两个链表的长度
// 空间复杂度；O(m), m为链表1的长度
function getIntersetionNode(headA, headB) {
  const visited = new Set()
  let temp = headA
  while(temp !== null) {
    visited.add(temp)
    temp = temp.next
  }
  temp = headB
  while(temp !== null) {
    if(visited.has(temp)) {
      return temp
    }
    temp = temp.next
  } 
  return null
}

let headA = [4, 1, 8, 4, 5]
let headB = [5, 6, 1, 8, 4, 5]

let ans = getIntersetionNode(headA, headB)
console.log('ans', ans)
// 题解2
// 为什么 第一个的点不是1这个节点，题目的意思 两个链表中的同一个节点，即value和next 要相同，1节点的next相同，value不同
let aAll = [4, 1, 8, 4, 5, 5, 6, 1, 8, 4, 5]
let bAll = [5, 6, 1, 8, 4, 5, 4, 1, 8, 4, 5]
var getIntersectionNode = function(headA, headB) {
  if (headA === null || headB === null) {
      return null;
  }
  let pA = headA, pB = headB;
  while (pA !== pB) {
      pA = pA === null ? headB : pA.next;
      pB = pB === null ? headA : pB.next;
  }
  return pA;
};
