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
