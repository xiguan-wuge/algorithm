// 括号。设计一种算法，打印n对括号的所有合法的（例如，开闭一一对应）组合。

// 说明：解集不能包含重复的子集。

// 例如，给出 n = 3，生成结果为：

// [
//   "((()))",
//   "(()())",
//   "(())()",
//   "()(())",
//   "()()()"
// ]

// https://leetcode-cn.com/problems/bracket-lcci/

var generateParenthesis = function (n) {
  const res = [];

  const dfs = (lRemain, rRemain, str) => { // 左右括号所剩的数量，str是当前构建的字符串
    if (str.length == 2 * n) { // 字符串构建完成
      res.push(str);           // 加入解集
      return;                  // 结束当前递归分支
    }
    if (lRemain > 0) {         // 只要左括号有剩，就可以选它，然后继续做选择（递归）
      dfs(lRemain - 1, rRemain, str + "(");
    }
    if (lRemain < rRemain) {   // 右括号比左括号剩的多，才能选右括号
      dfs(lRemain, rRemain - 1, str + ")"); // 然后继续做选择（递归）
    }
  };

  dfs(n, n, ""); // 递归的入口，剩余数量都是n，初始字符串是空串
  return res;
};

var result = generateParenthesis(3)
result.forEach(item => {
  console.log('item', item)
})

var solution = function(isBadVersion) {
  return function(n) {
      let left = 1, right = n;
      while (left < right) { // 循环直至区间左右端点相同
          const mid = Math.floor(left + (right - left) / 2); // 防止计算时溢出
          if (isBadVersion(mid)) {
              right = mid; // 答案在区间 [left, mid] 中
          } else {
              left = mid + 1; // 答案在区间 [mid+1, right] 中
          }
      }
      // 此时有 left == right，区间缩为一个点，即为答案
      return left;
  };
};
