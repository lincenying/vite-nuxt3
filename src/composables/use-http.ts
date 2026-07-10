import type { FetchContext, FetchResponse, SearchParameters } from 'ofetch'
import type { MultiWatchSources, WatchSource } from 'vue'

import type { ApiResponse } from '#shared/types'
import type { HttpAsyncData } from '~/types/http.types'
import { isFormData } from '@lincy/utils'
import { appendResponseHeader } from 'h3'
import md5 from 'md5'

type UrlType = string | Request | Ref<string | Request> | (() => string | Request)

export interface RequestOptions {
    /** 唯一键，保证跨请求去重 */
    key?: string
    /** 请求方法 */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'
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
    /** 是否立即执行请求 */
    immediate?: boolean
    /** 工厂函数，用于在异步函数返回前设置 data 的默认值 */
    default?: () => unknown
    /** 用于在解析后修改 handler 函数结果的函数 */
    transform?: (input: unknown) => unknown | Promise<unknown>
    /** 观察响应式源数组，在变化时自动刷新 fetch 结果 */
    watch?: WatchSource[] | false
    /** 返回深度响应式的 ref（默认 true） */
    deep?: boolean
}

/** 解包 ApiResponse 并写回 response._data */
function unwrapApiResponse<T>(response: { _data?: unknown }, data: ApiResponse<T>): void {
    if (data.code !== 200) {
        if (import.meta.client)
            ElMessage.error(data.message)
        response._data = undefined
        return
    }
    response._data = data.data ?? 'success'
}

function _useFetch<T>(url: UrlType, params?: SearchParameters, options?: RequestOptions): HttpAsyncData<T> {
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
        watch: options?.watch as false | MultiWatchSources | undefined,
        deep: options?.deep,
        onRequest() {
        },
        onRequestError({ error }: FetchContext) {
            if (import.meta.client) {
                ElMessage.closeAll()
                error && ElMessage.error('Sorry, The Data Request Failed')
            }
        },
        onResponse({ response }: FetchContext & { response: FetchResponse<T> }) {
            const cookies = response.headers.getSetCookie()
            if (H3Event && cookies && cookies.length > 0) {
                for (const cookie of cookies) {
                    appendResponseHeader(H3Event, 'set-cookie', normalizeCookiePath(cookie))
                }
            }
            unwrapApiResponse<T>(response, response._data as ApiResponse<T>)
        },
        onResponseError({ request }: FetchContext) {
            console.log('🚀 ~ onResponseError ~ request:', request)
        },
    } as unknown as Parameters<typeof useFetch<T>>[1]) as HttpAsyncData<T>
}

function _fetch<T>(url: UrlType, params?: SearchParameters, options?: RequestOptions): Promise<T | null> {
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
        },
        onRequestError({ error }: FetchContext) {
            ElMessage.closeAll()
            error && ElMessage.error('Sorry, The Data Request Failed')
        },
        onResponse({ response }: FetchContext & { response: FetchResponse<T> }) {
            const cookies = response.headers.getSetCookie()
            if (H3Event && cookies && cookies.length > 0) {
                for (const cookie of cookies) {
                    appendResponseHeader(H3Event, 'set-cookie', normalizeCookiePath(cookie))
                }
            }
            const tmpData = response._data as ApiResponse<T>
            if (tmpData.code !== 200) {
                ElMessage.error(tmpData.message)
                response._data = null
                return
            }
            response._data = tmpData.data ?? 'success'
        },
        onResponseError({ request }: FetchContext) {
            console.log('🚀 ~ onResponseError ~ request:', request)
        },
    }) as Promise<T | null>
}

function createInstance(initOption?: RequestOptions) {
    return {
        $get: <T>(url: string, params?: SearchParameters, option?: RequestOptions) => {
            return _fetch<T>(url, params, { method: 'GET', ...initOption, ...option })
        },
        $post: <T>(url: string, params?: SearchParameters, option?: RequestOptions) => {
            return _fetch<T>(url, params, { method: 'POST', ...initOption, ...option })
        },
        get: <T>(url: UrlType, params?: SearchParameters, option?: RequestOptions): HttpAsyncData<T> => {
            return _useFetch<T>(url, params, { method: 'GET', ...initOption, ...option })
        },
        post: <T>(url: UrlType, params?: SearchParameters, option?: RequestOptions): HttpAsyncData<T> => {
            return _useFetch<T>(url, params, { method: 'POST', ...initOption, ...option })
        },
    }
}

export function useApi(initOption?: RequestOptions) {
    return createInstance(initOption)
}
export default createInstance()
