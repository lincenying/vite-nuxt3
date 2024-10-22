import type { AsyncDataRequestStatus } from 'nuxt/app'

/**
 * 延迟显示Loading效果
 * @param status 需要监听的 Ref<"idle" | "pending" | "success" | "error">
 * @param timeout 延迟显示时间(ms)
 * @returns isLoading
 */
export function useDelay(status: Ref<AsyncDataRequestStatus>, timeout: number) {
    const isLoading = ref(false)
    let timer: Nullable<NodeJS.Timeout> = null
    watch(status, (loading) => {
        if (loading === 'pending') {
            timer = setTimeout(() => {
                isLoading.value = true
            }, timeout)
        }
        else {
            if (timer) {
                clearTimeout(timer)
            }
            isLoading.value = false
        }
    })
    return isLoading
}
