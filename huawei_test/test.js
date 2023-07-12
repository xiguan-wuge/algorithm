function getUniqueNumber(number) {
  let str = String(number)
  let strArr = str.split('')
  let newArr = []
//     let map = {}
  for(let i = strArr.length - 1; i >=0; i--) {
      if(newArr.indexOf(strArr[i]) === -1) {
          newArr.push(strArr[i])
      }
  }
  let resultStr = ''
  newArr.forEach(item => {
      resultStr += item
  })
  console.log(resultStr-0)
}
getUniqueNumber(9876673)