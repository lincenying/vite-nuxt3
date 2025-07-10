import type { AnyFn } from '@vueuse/core'
import md5 from 'md5'

import ls from 'store2'

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
 */
export function useUrl(path: string, query?: RouteQuery): void
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

/**
 * 保存和恢复滚动位置的钩子函数
 *
 * 该函数在组件挂载时恢复滚动位置，并在路由离开时保存滚动位置。
 */
export function useSaveScroll() {
    const route = useRoute()

    onMounted(() => {
        console.log('onMounted', route.fullPath)
        // 从本地存储中获取当前路由的滚动位置，如果没有则默认为0
        const scrollTop = ls.get(route.fullPath) || 0
        // 将页面滚动到获取到的滚动位置
        setTimeout(() => {
            window.scrollTo({ top: scrollTop || 0, behavior: 'smooth' })
        }, 200)
        // 从本地存储中移除当前路由的滚动位置
        ls.remove(route.fullPath)
    })

    onActivated(() => {
        console.log('onActivated', route.fullPath)
        // 从本地存储中获取当前路由的滚动位置，如果没有则默认为0
        const scrollTop = ls.get(route.fullPath) || 0
        // 将页面滚动到获取到的滚动位置
        setTimeout(() => {
            window.scrollTo({ top: scrollTop || 0, behavior: 'smooth' })
        }, 200)
        // 从本地存储中移除当前路由的滚动位置
        ls.remove(route.fullPath)
    })

    onBeforeRouteLeave((_to, from, next) => {
        console.log('onBeforeRouteLeave', from.fullPath)
        // 将当前页面的滚动位置保存到本地存储中
        ls.set(from.fullPath, window.scrollY || 0)
        // 调用路由导航函数
        next()
    })
}
