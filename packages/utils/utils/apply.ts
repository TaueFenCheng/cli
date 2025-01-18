/**
 * @description apply 函数的实现
 * @apply  第二个参数是数组
 * @description apply 函数是立即执行  返回立即执行之后的结果
 * @alias 箭头函数没有arguments 属性
 *
 */

Function.prototype.apply = function (_context) {
  const context = _context || window;

  var fn = Symbol();
  const args = arguments[1];

  // context.fn = this
  let result = "";
  context[fn] = this;
  if (!args) {
    // context.fn()
    result = context[fn]();
  } else {
    // context.fn(...args)
    result = context[fn](...args);
  }
  // delete context.fn
  delete context[fn];

  return result;
};
