/**
 * @description 函数重载的一种实现
 * @returns 
 */
function enhance() {
    const map = new Map()
    // 主调用函数
    const enhanceFunction = (...args) => {
        const key = args.map((arg) => typeof arg).join('-')
        console.log(key, '--------')
        const fn = map.get(key)
        if (fn && typeof fn === 'function') {
            return fn(...args)
        } else {
            throw new Error('not found funcion')
        }
    }

    // 注册函数
    /**
     * 
     * @param args 函数参数
     * @param fn 函数体
     * @returns 
     */
    enhanceFunction.register = (...args) => (fn) => {
        const key = args.join('-')
        console.log(key)
        // map[key] = fn
        map.set(key, fn)
    }
    
    return enhanceFunction

}

// const myFun = enhance()
// myFun.register('string')((a) => {
//     console.log(a)
// })
// myFun.register('number', 'number')((a,b) => {
//     console.log(a+b)
// })

// myFun('testetst')
// myFun(3,44)

export default enhance

