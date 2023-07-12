// 一次性扁平所有
// reduce, 
// function flattenDeep(arr) {
//   return Array.isArray(arr)
//     ? arr.reduce((account, current) => {
//       return [...account, ...flattenDeep(current)]
//     }, [])
//     : [arr]
// }

// es5实现
function flattenDeep(arr) {
  return arr.reduce(function(prev, next) {
    return prev.concat(Array.isArray(next) ? flattenDeep(next) : next)
  },[])
}

function flattenDeep(arr) {
  return arr.reduce(function(prev, next) {
    return prev.concat(Array.isArray(next) ? flattenDeep(next) : next)
  }, [])
}
var arr = [1, [2, [3, 4]]];
console.log('res', JSON.stringify(flattenDeep(arr)))