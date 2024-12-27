let cache = {}
let map = new Map()

/**
 * @description:  fetch promise with cache
 * @param {string} path  the path of the request
 * @returns {Promise<Response>}  the response of the request
 */

async function fetchWithCache(path) {
    let key = path.toString()
    // 记录请求次数
    map.set(key, (map.get(key) || 0) + 1)
    if (cache[key]) {
        return cache[key]
    }
    if (!cache[key] && map.get(key) === 1) {    // 首次请求
        return window.fetch(path).then(res => {
            return cache[key] || (cache[key] = res)
        }).catch((err) => {
            cache[key] = null // 报错情况下缓存数据设置为空
        })
    }
    if (!cache[key] && map.get(key) > 1) { // 重复请求 且第一次的请求还没有返回
        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {
                if (cache[key]) {
                    clearInterval(timer)
                    resolve(cache[key])
                }
            }, 50)
        })
        // return new Promise((resolve) => {
        //     const checkCache = () => {
        //         if (cache[key]) {
        //             resolve(cache[key]);
        //         } else {
        //             setTimeout(checkCache, 50);
        //         }
        //     };
        //     checkCache();
        // });
    }
}
