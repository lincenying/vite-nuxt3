import type ElScrollbar from 'element-plus/es/components/scrollbar'

export type ScrollbarInstance = InstanceType<typeof ElScrollbar>

export function useAutoScroll(key: string) {
    const scrollTop = useState<number>(key)

    function onScroll(event: { scrollLeft: number; scrollTop: number }) {
        scrollTop.value = event.scrollTop
    }

    onActivated(() => {
        const scrollBar = templateRef('scrollBar') as Ref<Pick<ScrollbarInstance, 'setScrollTop'>>
        if (scrollTop.value)
            scrollBar.value?.setScrollTop(scrollTop.value)
    })

    return {
        onScroll,
    }
}
