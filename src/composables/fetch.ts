import type { H3Event } from 'h3'
import { appendResponseHeader } from 'h3'
import { normalizeCookiePath } from '~/utils'

export async function fetchWithCookie(event: H3Event, url: string, options = {}): Promise<any> {
    /* Get the response from the server endpoint */
    const res = await $fetch.raw(url, options)
    /* Get the cookies from the response */
    const cookies = res.headers.getSetCookie()
    /* Attach each cookie to our incoming Request */
    for (const cookie of cookies) {
        appendResponseHeader(event, 'set-cookie', normalizeCookiePath(cookie))
    }
    /* Return the data of the response */
    return res._data
}
