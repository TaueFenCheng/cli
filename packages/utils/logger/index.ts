import { variableTypeDetection } from "../utils"

interface TaueGlobal {
    console?: Console
}


export const isNodeEnv = variableTypeDetection.isProcess(typeof process !== 'undefined' ? process : 0)

// export const isWxMiniEnv =
//     variableTypeDetection.isObject(typeof wx !== 'undefined' ? wx : 0) &&
//     variableTypeDetection.isFunction(typeof App !== 'undefined' ? App : 0)

export const isBrowserEnv = variableTypeDetection.isWindow(typeof window !== 'undefined' ? window : 0)
/**
 * 获取全局变量
 *
 * ../returns Global scope object
 */
export function getGlobal<T>() {
    if (isBrowserEnv) return window as unknown as TaueGlobal & T
    // if (isWxMiniEnv) return wx as unknown as TaueGlobal & T
    // it's true when run e2e
    if (isNodeEnv) return process as unknown as TaueGlobal & T
}

const _global = getGlobal<TaueGlobal>()

const PREFIX = 'Taue Logger'

export class Logger {
    private enabled = false
    private _console: Console = {} as Console
    constructor() {
        _global.console = console || _global.console
        if (console || _global.console) {
            const logType = ['log', 'debug', 'info', 'warn', 'error', 'assert']
            logType.forEach((level) => {
                if (!(level in _global.console)) return
                this._console[level] = _global.console[level]
            })
        }
    }
    disable(): void {
        this.enabled = false
    }

    bindOptions(debug: boolean): void {
        this.enabled = debug ? true : false
    }

    enable(): void {
        this.enabled = true
    }

    getEnableStatus() {
        return this.enabled
    }

    log(...args: any[]): void {
        if (!this.enabled) {
            return
        }
        this._console.log(`${PREFIX}[Log]:`, ...args)
    }
    warn(...args: any[]): void {
        if (!this.enabled) {
            return
        }
        this._console.warn(`${PREFIX}[Warn]:`, ...args)
    }

    /**
     * error不需要开启enable也要打印出来，提示用户错误信息
     *
     * @param {...any[]} args
     * @memberof Logger
     */
    error(...args: any[]): void {
        this._console.error(`${PREFIX}[Error]:`, ...args)
    }
}

// const logger = _support.logger || (_support.logger = new Logger())
const logger = new Logger()
export { logger }