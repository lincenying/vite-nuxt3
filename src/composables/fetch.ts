import type { H3Event } from 'h3'
import { appendResponseHeader } from 'h3'

/** 服务端请求并转发 Set-Cookie 响应头 */
export async function fetchWithCookie<T = unknown>(event: H3Event, url: string, options = {}): Promise<T> {
    const res = await $fetch.raw(url, options)
    const cookies = res.headers.getSetCookie()
    for (const cookie of cookies) {
        appendResponseHeader(event, 'set-cookie', normalizeCookiePath(cookie))
    }
    return res._data as T
}
