const arr = [85, 24, 63, 45, 17, 31, 96, 50];
function quickSort(arr) {
  if(arr.length <= 1) {  //递归的退出条件
    return arr;
  }
  let pivotIndex = Math.floor(arr.length /2); //基准点下标
  // 基准点是提前排好了序的
  let pivot = arr.splice(pivotIndex, 1);  //从数组中删除基准点
  let left = [];
  let right = [];
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])  
    }
  }
  return quickSort(left).concat(pivot, quickSort(right))  //单个数， pivot或者 [pivot] 都可以
}

console.log(quickSort(arr));
