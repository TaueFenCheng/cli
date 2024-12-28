/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = (s) => {
  const n = s.length;
  if (n % 2 !== 0) {
    return false;
  }
  const map = new Map();
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");
  const stack = [];
  for (const item of s) {
    if (map.has(item)) {
      // 左括号入栈
      stack.push(item);
    } else {
      // 右括号 出栈左括号从map中取值做括号 判断是否相等
      const temp = stack.pop();
      // item 为右括号
      if (item !== map.get(temp)) return false;
    }
  }
  return stack.length === 0;
};
