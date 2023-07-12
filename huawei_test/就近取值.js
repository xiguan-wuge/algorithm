// 取近似值
// 描述
// 写出一个程序，接受一个正浮点数值，输出该数值的近似整数值。如果小数点后数值大于等于5,向上取整；小于5，则向下取整。

// 输入描述：
// 输入一个正浮点数值

// 输出描述：
// 输出该数值的近似整数值

// 示例1
// 输入：
// 5.5
// 输出：
// 6

function getNum(num) {
  let str = String(num)
  let arr = str.split('.')
    // console.log('a0', arr[0], 'a1',arr[1])
  let a1 = arr[1].slice(0,1) - 0
  let a0 = arr[0] - 0
  
  return a1 >=5 ? a0 + 1 : a0
}
console.log(getNum(1.1999))