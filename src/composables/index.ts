import md5 from 'md5'
import type { AnyFn } from '@vueuse/core'

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
 * element-plus弹窗
 * @param config 弹窗数据
 * @example
 * ```
 * showMsg('content')
 * showMsg({ type: 'success' | 'warning' | 'info' | 'error', content: 'content'})
 * ```
 */
export function showMsg(config: Objable | string) {
    let content, type: 'success' | 'warning' | 'info' | 'error'
    if (!config) {
        content = '接口返回数据错误'
        type = 'error'
    }
    else if (typeof config === 'string') {
        content = config
        type = 'error'
    }
    else {
        content = config.content
        type = config.type
    }
    ElMessage[type](content)
}
