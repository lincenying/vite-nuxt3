import type ElScrollbar from 'element-plus/es/components/scrollbar'

export type RefOrComputedRef<T> = Ref<T> | ComputedRef<T>

export type ElScrollbarType = InstanceType<typeof ElScrollbar>
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
