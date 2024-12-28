/**
 * @call 方案 call  参数是一系列参数
 * @description 实现唯一的key
 * @alias 箭头函数没有arguments 属性
 *
 */
Function.prototype.call = function (_context, ...args) {
  const context = _context || window;
  const symbol = Symbol("fn"); // 唯一的key
  context[symbol] = this;
  const result = context[symbol](...args);
  delete context[symbol];
  return result;
};
