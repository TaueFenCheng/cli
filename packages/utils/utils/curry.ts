/**
 * @description 柯里化函数
 * @param apply  第一个参数为this 第二个参数为数组
 */
export function _curry(fn: Function) {
  return function curry(...args: any[]) {
    if (args.length >= fn.length) {
      return fn.apply(this, ...args);
    } else {
      return function (...args2: any[]) {
        return curry.apply(this, args.concat(args2));
      };
    }
  };
}
