/**
 * fn 記憶化的函數
 * @param ...args 函數參數
 * @description 記憶化函數
 */

export function memorize(fn:Function) {
    const map = {}
    return (...args)=>{
        const key = JSON.stringify(args)
        if(!map[key]){
            map[key] = fn(...args)
        }
        return map[key]
    }
}

