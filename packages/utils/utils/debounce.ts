/**
 *
 * @param fn
 * @param delay
 * @description 防抖
 * @returns
 */
export function debounce(fn: Function, delay: number) {
  let timer: NodeJS.Timeout = null;
  return function (...args: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
