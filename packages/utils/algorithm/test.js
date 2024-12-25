const getPromise = () => {
  return new Promise((resolve, reject) => {
    console.log("a new promise start");
    reject("error");
    console.log("a new promise end");
  });
};
async function run() {
  const promise = getPromise();
  promise.catch(console.log);
  const res = await promise;
  console.log(res);
}
run();
/**
 * @description 字符串中出現最大的字符和其出現次數
 */

function findMaxConsecutiveChar(str) {
  if (str.length === 0) return null; // 处理空字符串

  let maxChar = str[0]; // 初始化最多出现的字符
  let maxCount = 1; // 初始化最多出现的次数

  let currentChar = str[0]; // 当前字符
  let currentCount = 1; // 当前字符的计数

  // 遍历字符串
  for (let i = 1; i < str.length; i++) {
    if (str[i] === currentChar) {
      currentCount++; // 增加计数
    } else {
      // 更新最大计数和字符
      if (currentCount > maxCount) {
        maxCount = currentCount;
        maxChar = currentChar;
      }
      // 重置当前字符和计数
      currentChar = str[i];
      currentCount = 1;
    }
  }

  // 最后检查一次
  if (currentCount > maxCount) {
    maxCount = currentCount;
    maxChar = currentChar;
  }

  return { char: maxChar, count: maxCount };
}

/**
 * @description 数组转树结构
 * @param {*} items 
 * @returns 
 */
export function traverse(items = []) {
  const map = {}
  items.forEach((item) => {
    map[item.parentid] = { ...item, children: [] }
  })
  const root = []
  items.forEach((item) => {
    if (!item.parentid) {
      root.push(map[item.id])
    } else {
      map[item.parentid].children.push(map[item.id])
    }
  })
  return root
}