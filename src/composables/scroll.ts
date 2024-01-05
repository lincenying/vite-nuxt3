import type ElScrollbar from 'element-plus/es/components/scrollbar'

export type ScrollbarInstance = InstanceType<typeof ElScrollbar>

/**
 * 自动记录/恢复滚动条位置
 * @param key 组件ref名称
 * @returns 设置滚动条函数
 */
export function useAutoScroll(key: string) {
    const scrollTop = useState<number>(key)

    function onScroll(event: { scrollLeft: number; scrollTop: number }) {
        scrollTop.value = event.scrollTop
    }

    onActivated(() => {
        const scrollBar = templateRef(key) as unknown as Ref<Pick<ScrollbarInstance, 'setScrollTop'>>
        if (scrollTop.value)
            scrollBar.value?.setScrollTop(scrollTop.value)
    })

    return {
        onScroll,
    }
}
