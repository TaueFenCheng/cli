/***
 * @description bind 实现 返回一个函数  不是立即执行
 * @description
 * @bind 第二个参数是一系列数据  不是数组
 * @alias 箭头函数没有arguments 属性
 */
Function.prototype.bind = (_context) => {
  const args1 = Array.prototype.slice.apply(arguments, 1);
  return function () {
    const args2 = Array.prototype.slice.apply(arguments);
    return this.apply(_context, args1.concat(args2));
  };
};
