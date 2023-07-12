// https://leetcode-cn.com/problems/longest-common-prefix/
// 求字符串最长公共前缀

// function longestCommonPrefix(strs) {
//   let result = ''
//   let currentStr = ''
//   let minLength = 0
//   // 先获取字符串的最小长度
//   for(let i = 0; i < strs.length; i++) {
//     const item = strs[i]
//     if(i === 0) {
//       minLength = item.length
//       continue
//     }
//     minLength = item.length < minLength ? item.length : minLength
//   }
//   // 遍历字符串，一项一项比对
//   let same = true
//   for(let i = 0; i < minLength && same; i++) {
//     for(let j = 0; j < strs.length && same; j++) {
//       const strItem = strs[j]
//       // 取第一个字符串的当前项
//       if(j === 0 ) {
//         currentStr = strItem[i]
//         continue
//       }
//       same = currentStr === strItem[i]
//     }
//     // 每个字符串的对应项比较完后，相等则添加，否则退出
//     if(same) {
//       result += currentStr
//     }
//   }
//   return result
// }

function longestCommonPrefix(strs) {
  if(strs.length === 0) {
    return ''
  }
  let ans = strs[0]
  for(let i = 0; i < strs.length; i++) {
    let j = 0;
    for(; j< ans.length && j < strs[i].length; j++) {
      if(ans[j] !== strs[i][j]) {
        break;
      }
    }
    ans = ans.slice(0, j)
    if(ans === '') return ''
  }
  return ans
}

function longestCommonPrefix(strs) {
  if(strs.length === 0) {
    return ''
  }
  let ans = strs[0]
  for(let i = 0; i < strs.length; i++) {
    let j = 0;
    for(;j < ans.length && j < strs[i].length; j++) {
      if(ans[j] !== strs[i][j]) {
        break;
      }
    }
    ans = ans.slice(0, j)
    if(ans === '') return ''
  }
  return ans
}

let strs = ["flower","flow","flight"]
// let strs =["dog","racecar","car"]

console.log(longestCommonPrefix(strs));
