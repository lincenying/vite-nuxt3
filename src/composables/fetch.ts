import type { H3Event } from 'h3'
import { appendResponseHeader } from 'h3'

export async function fetchWithCookie(event: H3Event, url: string, options = {}): Promise<any> {
    /* 从服务器端点获取响应 */
    const res = await $fetch.raw(url, options)
    /* 从响应中获取 cookie */
    const cookies = res.headers.getSetCookie()
    /* 将每个 cookie 附加到我们传入的请求 */
    for (const cookie of cookies) {
        appendResponseHeader(event, 'set-cookie', normalizeCookiePath(cookie))
    }
    /* 返回响应的数据 */
    return res._data
}
