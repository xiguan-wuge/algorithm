// 数组中的第K个最大元素
// https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// k = 1 key = 3
// [3,2,1,5,6,4]
// 2
var findKthLargest = function (nums, k) {
  let start = 0, end = nums.length - 1;
  // 排好序后，数组中第key个元素就是第K大的元素
  let key = nums.length - k;
  while (true) {
      let i = partition(nums, start, end);
      if (i === key) {
          return nums[key];
      } else if (i < key) {
          // 说明要找的值比nums[i]要大，所以要在[i+1, end]中继续切分
          start = i + 1;
      } else {
          // 说明要找的值比nums[i]要小，所以要从[0, i-1]中继续切分
          end = i - 1;
      }
  }
};
function partition(arr, start, end) {
  // 找出中间值与起始值交换位置，再用起始值做pivot值，防止顺序数组与倒序数组。
  if (end > start) {
      swap(arr, start, start + Math.floor((end - start) / 2));
  }
  // j 记录pivot值最终在数组中的索引（也表示比pivot小的元素的个数）
  let pivot = arr[start], j = start;
  
  // 从start+1开始到end结束
  for (let i = start + 1; i <= end; i++) {
      // 将比pivot小的都放到pivot前面去
      if (arr[i] < pivot) {
          // 当有一个比pivot小的值就将pivot值最终索引j + 1
          if(++j === i) continue // 如果j+1 后与i相等，则直接跳过，索引相同不需要交换
          swap(arr, i, j);
      }
  }
  // 循环完了之后，索引j和j之前的元素都是比pivot小的，j就是pivot所在数组中最终的索引
  // 循环完成后交换pivot和arr[j]的位置
  swap(arr, start, j);
  return j;
}
function swap(ary, i, j) {
  let temp = ary[i];
  ary[i] = ary[j];
  ary[j] = temp;
}