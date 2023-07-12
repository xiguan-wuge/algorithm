// 有效的括号
// https://leetcode-cn.com/problems/valid-parentheses/solution/dai-ma-sui-xiang-lu-20-you-xiao-de-gua-h-uidu/

// 题解
function isValid(s, isOkStr) {
  // 优化：传入的字符串不做限制，函数内部按顺序取出所有括号
  // 解决思路：
  // 1.参数添加值，表示是否全括号字符串
  // 2. 正则匹配是否包含非括号字符串，存在则遍历
  let str = s
  if(!isOkStr) {
    let arr = []
    let brecketsMap = {
      '(': '(',
      ')': ')',
      '[': '[',
      ']': ']',
      '{': '{',
      '}': ']',
    }
    for(const item of str ) {
      if(brecketsMap[item]) {
        arr.push(item)
      }
    }
    str = arr.join('')
  }

  const stack = []
  const map = {
    '(': ')',
    '{': '}',
    '[': ']'
  }
  for(const item of str) {
    // 满足map条件则入栈
    if(item in map) {
      stack.push(item)
      continue
    }
    // 不在map中的key,则从栈中取出最后一项，做全等判断
    if(item !== map[stack.pop()]) return false
  }
  // 以栈是否清空为返回标志
  return !stack.length
}

function isValid(s) {
  let str = s
  const stack = []
  const map = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  for(const item of str) {
    console.log('item', item)
    if(item in map) {
      console.log('true')
      stack.push(item)
      continue
    }
    if(item !== map[stack.pop()]) return false
  }
  return !stack.length
}

let string = '(()}{[]{})'
console.log(isValid(string,false)) 