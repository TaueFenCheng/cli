/**
 * @description 原生捕获事件
 * @param cb 执行事件
 * @param errCb 错误事件回调
 */


export function nativeTryCatch(cb: () => void, errCb?: (error: any) => void): void {
    try {
        cb()
    } catch (error) {
        console.error(error);
        if (errCb) {
            errCb(error)
        }
    }
}