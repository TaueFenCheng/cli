/***
 * @description bind 实现 返回一个函数  不是立即执行
 * @description
 * @bind 第二个参数是一系列数据  不是数组
 */
Function.prototype.bind = function (_context, ...args) {
  //   const context = _context || window;
  // context  this 指向
  let that = this;
  const args1 = Array.prototype.slice.apply(arguments, 1);
  return function () {
    const args2 = Array.prototype.slice.apply(arguments);
    return that.apply(_context, args1.concat(args2));
  };
};
