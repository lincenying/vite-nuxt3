/**
 * 延迟显示Loading效果
 * @param pending 需要监听的 Ref(boolean)
 * @param timeout 延迟显示时间(ms)
 * @returns isLoading
 */
export function useDelay(pending: Ref<boolean>, timeout: number) {
    const isLoading = ref(false)
    let timer: Nullable<NodeJS.Timeout> = null
    watch(pending, (loading) => {
        if (loading) {
            timer = setTimeout(() => {
                isLoading.value = true
            }, timeout)
        }
        else {
            if (timer)
                clearTimeout(timer)
            isLoading.value = false
        }
    })
    return isLoading
}
