import type { SearchParameters } from 'ofetch'

import { isFormData } from '@lincy/utils'
import { appendResponseHeader } from 'h3'
import md5 from 'md5'

type UrlType = string | Request | Ref<string | Request> | (() => string | Request)

export interface RequestOptions {
    /** 唯一键，保证跨请求去重 */
    key?: string
    /** 请求方法 */
    method?: any
    /** 向 URL 添加查询参数 */
    query?: SearchParameters
    /** 请求体 - 如果传入对象，会自动序列化 */
    body?: RequestInit['body'] | Objable
    /** 请求头 */
    headers?: Objable<string> | [key: string, value: string][] | Headers
    /** 请求的基础 URL */
    baseURL?: string
    /** 毫秒数，超过后自动中止请求 */
    timeout?: number
    /** 是否在服务器端获取数据（默认为 true） */
    server?: boolean
    /** 是否延迟在路由加载后解析异步函数，避免阻塞客户端导航（默认为 false） */
    lazy?: boolean
    /** 是否立即执行请求, 如果为 true，则立即执行请求，否则在组件挂载后执行, 如果为 false，则在组件挂载后执行, 默认为 true） */
    immediate?: boolean
    /** 工厂函数，用于在异步函数返回前设置 data 的默认值，适用于 lazy: true 或 immediate: false */
    default?: () => any
    /** 用于在解析后修改 handler 函数结果的函数 */
    transform?: (input: any) => any | Promise<any>
    /** 观察响应式源数组，在变化时自动刷新 fetch 结果。默认观察 fetch 选项和 URL。可以使用 watch: false 完全忽略响应式源。和 immediate: false 配合可以实现完全手动触发 useFetch。 */
    watch?: any[] | false
    /** 返回深度响应式的 ref（默认 true）。可设为 false 以返回浅层响应式的 ref，在数据无需深度响应时提升性能。 */
    deep?: boolean
}

async function _useFetch<T>(url: UrlType, params?: SearchParameters, options?: RequestOptions) {
    const H3Event = useRequestEvent()
    const headers = useRequestHeaders(['cookie'])
    const method = options?.method ?? 'GET'
    const body = options?.body || {}
    return useFetch<T>(url as string, {
        key: options?.key ?? md5(url as string),
        method,
        params,
        query: options?.query,
        body: method === 'POST' ? body : undefined,
        headers: {
            ...headers,
            ...options?.headers,
            ...isFormData(body) ? { } : { 'Content-Type': 'application/json' },
        },
        baseURL: options?.baseURL,
        timeout: options?.timeout ?? 5000,
        server: options?.server,
        lazy: options?.lazy,
        immediate: options?.immediate,
        default: options?.default,
        transform: options?.transform,
        credentials: 'include',
        watch: options?.watch,
        deep: options?.deep,
        onRequest() {
            // Set the request headers
            // options.headers = options.headers || {};
        },
        onRequestError({ error }) {
            if (import.meta.client) {
                ElMessage.closeAll()
                error && ElMessage.error('Sorry, The Data Request Failed')
            }
            // Handle the request errors
        },
        onResponse({ response }) {
            const cookies = response.headers.getSetCookie()
            if (H3Event && cookies && cookies.length > 0) {
                for (const cookie of cookies) {
                    appendResponseHeader(H3Event, 'set-cookie', normalizeCookiePath(cookie))
                }
            }
            // Process the response data
            if (response._data.code !== 200) {
                if (import.meta.client)
                    ElMessage.error(response._data.message)
                return response._data = null
            }
            return response._data = response._data.data || 'success'
        },
        onResponseError({ request }) {
            console.log('🚀 ~ onResponseError ~ request:', request)
            // Handle the response errors
        },
    })
}

async function _fetch<T>(url: UrlType, params?: SearchParameters, options?: RequestOptions) {
    const H3Event = useRequestEvent()
    const headers = useRequestHeaders(['cookie'])
    const method = options?.method ?? 'GET'
    const body = options?.body || {}
    return $fetch<T>(url as string, {
        method,
        params,
        query: options?.query,
        body: method === 'POST' ? body : undefined,
        headers: {
            ...headers,
            ...options?.headers,
            ...isFormData(body) ? { } : { 'Content-Type': 'application/json' },
        },
        baseURL: options?.baseURL,
        timeout: options?.timeout ?? 5000,
        credentials: 'include',
        onRequest() {
            // Set the request headers
            // options.headers = options.headers || {};
        },
        onRequestError({ error }) {
            ElMessage.closeAll()
            error && ElMessage.error('Sorry, The Data Request Failed')
            // Handle the request errors
        },
        onResponse({ response }) {
            const cookies = response.headers.getSetCookie()
            if (H3Event && cookies && cookies.length > 0) {
                for (const cookie of cookies) {
                    appendResponseHeader(H3Event, 'set-cookie', normalizeCookiePath(cookie))
                }
            }
            // Process the response data
            if (response._data.code !== 200) {
                ElMessage.error(response._data.message)
                return response._data = null
            }
            return response._data = response._data.data || 'success'
        },
        onResponseError({ request }) {
            console.log('🚀 ~ onResponseError ~ request:', request)
            // Handle the response errors
        },
    })
}

function createInstance(initOption?: RequestOptions) {
    return {
    /**
     * $fetch.GET 封装
     * @param url api地址
     * @param params 请求参数
     * @param option 包含 method, headers, body 参数
     * @returns T
     */
        $get: <T>(url: string, params?: SearchParameters, option?: RequestOptions) => {
            return _fetch<T>(url, params, { method: 'GET', ...initOption, ...option })
        },
        /**
         * $fetch.POST 封装
         * @param url api地址
         * @param params 请求参数
         * @param option 包含 method, headers, body 参数
         * @returns T
         */
        $post: <T>(url: string, params?: SearchParameters, option?: RequestOptions) => {
            return _fetch<T>(url, params, { method: 'POST', ...initOption, ...option })
        },

        /**
         * useFetch.GET 封装
         * @param url api地址
         * @param params 请求参数
         * @param option 包含 method, headers, key, body 参数
         * @returns T
         * @description
         * ```
         *    type AsyncData<DataT, ErrorT> = {
         *      data: Ref<DataT | null>
         *      pending: Ref<boolean>
         *      refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
         *      execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
         *      error: Ref<ErrorT | null>
         *      status: Ref<AsyncDataRequestStatus>
         *    }
         * ```
         */
        get: <T>(url: UrlType, params?: SearchParameters, option?: RequestOptions) => {
            return _useFetch<T>(url, params, { method: 'GET', ...initOption, ...option })
        },
        /**
         * useFetch.POST 封装
         * @param url api地址
         * @param params 请求参数
         * @param option 包含 method, headers, key, body 参数
         * @returns useFetch
         * @description
         * ```
         *  type AsyncData<DataT, ErrorT> = {
         *      data: Ref<DataT | null>
         *      pending: Ref<boolean>
         *      refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
         *      execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
         *      error: Ref<ErrorT | null>
         *      status: Ref<AsyncDataRequestStatus>
         *  }
         * ```
         */
        post: <T>(url: UrlType, params?: SearchParameters, option?: RequestOptions) => {
            return _useFetch<T>(url, params, { method: 'POST', ...initOption, ...option })
        },
    }
}

export function useApi(initOption?: RequestOptions) {
    return createInstance(initOption)
}
export default createInstance()
