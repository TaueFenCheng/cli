Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis; // 如果 context 为 null 或 undefined，使用全局对象
  context.fn = this; // 将当前函数赋值给 context 对象的一个属性
  const result = context.fn(...args); // 调用函数并传递参数
  delete context.fn; // 删除临时属性
  return result; // 返回函数调用的结果
};

Function.prototype.myApply = function (context, args) {
  context = context || globalThis; // 如果 context 为 null 或 undefined，使用全局对象
  context.fn = this; // 将当前函数赋值给 context 对象的一个属性
  const result = context.fn(...(args || [])); // 调用函数并传递参数
  delete context.fn; // 删除临时属性
  return result; // 返回函数调用的结果
};

Function.prototype.myBind = function (context, ...args) {
  return (...newArgs) => {
    return this.apply(context, [...args, ...newArgs]); // 调用原函数并合并参数
  };
};

/**
 * @description 指定层级的扁平化数组
 * @param {*} arr
 * @param {*} level
 * @returns
 */
function flatten(arr, level) {
  function walk(arr, currLevel) {
    let res = [];
    for (const item of arr) {
      if (Array.isArray(item) && currLevel < level) {
        res = res.concat(walk(item, currLevel + 1));
      } else {
        res.push(item);
      }
    }
    return res;
  }

  return walk(arr, 1);
}
