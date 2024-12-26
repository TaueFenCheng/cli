/**
 *
 * @param fn
 * @param delay
 * @description 节流
 * @returns
 */
export function throttle(fn: Function, delay: number) {
  let pre = Date.now();
  return function (...args: any) {
    const now = Date.now();
    if (now - pre > delay) {
      fn.apply(this, args);
      pre = now;
    }
  };
}
