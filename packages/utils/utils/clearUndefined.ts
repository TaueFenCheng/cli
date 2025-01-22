/**
 * @description 清除对象中的undefined null '' NaN 值 
 * @param obj 
 * @returns 
 */
export function clearNullUndeishObj<T extends object>(obj: T): T {
    Object.keys(obj).forEach((key: string) => ([null,undefined,'','NaN'].includes(obj[key]) ? delete obj[key] : {}))
    return obj
}

const a = clearNullUndeishObj({ a: 1, b: 2, c: undefined,d:null })
console.log(a)