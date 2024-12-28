/**
 * @description apply 函数的实现
 */
Function.prototype.apply = function (_context) {
  const context = _context || window;

  var fn = Symbol();
  const args = arguments[1];

  // context.fn = this
  context[fn] = this;
  if (!args) {
    // context.fn()
    context[fn]();
  } else {
    // context.fn(...args)
    context[fn](...args);
  }
  // delete context.fn
  delete context[fn];
};
