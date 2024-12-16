/**
 * @description conpose 函数
 * @description 组合函数
 */

export function compose(fns: Function[]) {
    return (val: any) => {
        return fns.reduceRight((arg, fn) => fn(arg), val)
    }
}