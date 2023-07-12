
function shuffle(arr) {
  let i = arr.length;
  while (--i) {
    let j = Math.floor(Math.random() * i);
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
}


let arr =  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
shuffle(arr)
console.log('arr', arr)


// https://www.cnblogs.com/macq/p/6650586.html