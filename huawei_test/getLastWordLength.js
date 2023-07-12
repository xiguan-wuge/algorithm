// 描述
// 计算字符串最后一个单词的长度，单词以空格隔开，字符串长度小于5000。

// 输入描述：
// 输入一行，代表要计算的字符串，非空，长度小于5000。

// 输出描述：
// 输出一个整数，表示输入字符串最后一个单词的长度。

// 示例1
// 输入：
// hello nowcoder
// 输出：
// 8
// 说明：
// 最后一个单词为nowcoder，长度为8

function getLastWordLength(str) {
  let tempStr = str && str.trim() || ''
  if(!tempStr)return 0
  // 方法1: 使用lastIndexOf查找对后一个空格的下标（lastIndex），
        // 最后一个单词的长度 = 总字符串长度 - lastIndex -1
  let allLenth = tempStr.length
  let lastIndex = tempStr.lastIndexOf(' ')
  return allLenth - 1 - lastIndex
}

let str = 'hello nowcoder'
let length = getLastWordLength(str)
console.log('length',length);
