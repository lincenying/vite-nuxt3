import type ElScrollbar from 'element-plus/es/components/scrollbar'

export type ScrollbarInstance = InstanceType<typeof ElScrollbar>

export function useAutoScroll(key: string) {
    const scrollTop = useState<number>(key)
    const scrollBarTemp = ref<ScrollbarInstance>()

    function onScroll(event: { scrollLeft: number; scrollTop: number }) {
        scrollTop.value = event.scrollTop
    }

    onActivated(() => {
        scrollTop.value ?? scrollBarTemp.value?.setScrollTop(scrollTop.value)
    })

    return {
        onScroll,
        scrollBarTemp,
    }
}
