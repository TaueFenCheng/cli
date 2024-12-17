/**
 * 
 * @param fn 
 * @param delay
 * @description 节流 
 * @returns 
 */
export function throttle(fn, delay) {
    let pre = Date.now()
    return function (...args) {
        const _this = this
        let now = Date.now()
        if (now - pre > delay) {
            fn.apply(_this, args)
            pre = now
        }
    }
}