import type { AnyFn, MaybeRef } from '@vueuse/core'
import type ElAffix from 'element-plus/es/components/affix'
import type ElScrollbar from 'element-plus/es/components/scrollbar'

export type RefOrComputedRef<T> = Ref<T> | ComputedRef<T>

export type ElScrollbarType = InstanceType<typeof ElScrollbar>
export type ElAffixType = InstanceType<typeof ElAffix>
export type ElMessageType = 'success' | 'warning' | 'info' | 'error'

/**
 * 请求参数合集
 * ```
 * {
        all?: number
        by?: string | string[]
        from?: string
        id?: string | string[]
        limit?: number
        page?: number
        path?: string
        key?: string | string[]
    }
 * ```
 */
export interface ApiConfig {
    all?: number
    by?: string | string[]
    from?: string
    id?: string | string[]
    limit?: number
    page?: number
    pathname?: string
    key?: string | string[]
}

export interface LoadedType<T, E> {
    /** 观察数据 */
    watchData?: MaybeRef<T>
    /** 父级数据是否报错 */
    dataHasError?: MaybeRef<E>
    /** 初始化函数 */
    initFn: AnyFn
    /** 错误处理函数 */
    errorFn?: AnyFn
    /**
     * 当有观察数据时, 是否立即执行初始化函数
     * (观察数据变化才执行初始化函数时, 设置为false, 默认要执行初始化函数时, 设置为true)
     */
    immediate?: boolean
}

export interface ListType<T> {
    list: T[]
    total: number
    totalPage: number
    hasPrev: number | boolean
    hasNext: number | boolean
    pageSize: number
    currPage: number
}
