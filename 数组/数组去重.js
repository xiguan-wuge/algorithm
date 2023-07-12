// es6 set
// function unique(arr) {
//   return Array.from(new Set(arr))
// }

// sort + reduce 去重
// function unique(arr) {
//   return arr.sort().reduce((prev, next) => {
//     if(prev.length === 0 || prev[prev.length - 1] !== next) {
//       // 前一项和后一项不同
//       prev.push(next)
//     }
//     return prev
//   }, [])
// }

// filter 实现
// 判断一项在数组中第一次出现下标是否等于当前下标
function unique(arr) {
  return arr.filter((value, index, array) => {
    return array.indexOf(value) === index
  })
}

var arr = [1, 2, 2, 3]
console.log(unique(arr))

