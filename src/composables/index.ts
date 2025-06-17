import type { AnyFn } from '@vueuse/core'

import md5 from 'md5'

interface RouteQuery {
    to?: string
    t?: number
    [propName: string]: any
}

interface RouteConfig {
    path: string
    query?: RouteQuery
}

export function useGlobal() {
    const ins = getCurrentInstance()!

    const ctx = ins.appContext.config.globalProperties
    const options = ins.type

    return {
        ctx,
        options,
    }
}

/**
 * 竞态锁
 * @param fn 回调函数
 * @param autoUnlock 是否自动解锁
 * @description
 * ```
 * autoUnlock === true 不管 fn 返回什么, 都自动解锁
 * autoUnlock === false 不管 fn 返回什么, 都不自动解锁
 * autoUnlock === 'auto' 当 fn 返回 false 时, 不自动解锁, 返回其他值时, 自动解锁
 * ```
 * @example
 * ```
 * const Fn = useLockFn(async (key) => {
 *  console.log(key)
 * }
 *
 * <div v-on:click="Fn(123)"></div>
 * ```
 */
export function useLockFn(fn: AnyFn, autoUnlock: boolean | 'auto' = 'auto') {
    const lock = ref(false)
    return async (...args: any[]) => {
        if (lock.value) {
            return
        }
        lock.value = true
        try {
            const $return: any = await fn(...args)
            if (autoUnlock === true || (autoUnlock === 'auto' && $return !== false)) {
                lock.value = false
            }
        }
        catch (e) {
            lock.value = false
            throw e
        }
    }
}

/**
 * 处理页面跳转逻辑。
 *
 * 此函数用于更新查询参数并触发页面跳转。它通过添加一个时间戳来确保URL的唯一性，从而避免浏览器缓存。
 * 使用了Vue Router的钩子函数`useRouter`来获取路由实例，然后修改`to`对象的`query`属性并推动路由变化。
 *
/**
 * @param path 目标路由的路径。
 * @param query 查询参数对象，可能包含"to"和"t"属性。
 * @param query.to 指定的查询参数"to"。
 * @param query.t 指定的查询参数"t"。
 */
export function useUrl(path: string, query?: RouteQuery): void
/**
 * @param config 目标路由对象，包含路径和查询参数。
 * @param config.path 目标路由的路径。
 * @param config.query 查询参数对象，可能包含"to"和"t"属性。
 * @param config.query.to 指定的查询参数"to"。
 * @param config.query.t 指定的查询参数"t"。
 */
export function useUrl(config: RouteConfig): void
export function useUrl(to: string | RouteConfig, config?: RouteQuery): void {
    const router = useRouter()
    let path: string = ''
    let query: RouteQuery = {}

    // 参数类型判断
    if (typeof to === 'string') {
        path = to
        query = config || {}
    }
    else {
        path = to.path || ''
        query = to.query || {}
        query.t = +Date.now()
    }
    router.push({
        path,
        query,
    })
}

/**
 * 生成gAvatar头像地址
 * @param email 邮箱
 * @param width 图片宽度
 * @returns 图片地址
 */
export function useAvatar(email: string = '123456', width: number = 256) {
    email = decodeURIComponent(email)
    // return `https://cdn.v2ex.com/gravatar/${md5(email)}?s=${width}&d=identicon&r=g`
    // return `https://dn-qiniu-avatar.qbox.me/avatar/${md5(email)}?s=${width}&d=identicon&r=g`
    // return `https://fdn.geekzu.org/avatar/${md5(email)}?s=${width}&d=identicon&r=g`
    return `https://cravatar.cn/avatar/${md5(email)}?s=${width}&d=identicon&r=g`
}
