import type { ElScrollbarType } from '~/types'

/**
 * 基于Elment-Plus滚动条组件的自动记录/恢复滚动条位置
 * @param refKey 组件ref名称
 * @param scrolFunc 滚动条事件回调函数
 * @param stateKey 状态存储的键名，默认为refKey
 * @returns 设置滚动条函数
 */
export function useAutoScroll(refKey: string, scrolFunc?: AnyFn, stateKey?: string) {
    const scrollTop = useState<number>(stateKey || refKey)

    function onScroll(event: { scrollLeft: number, scrollTop: number }) {
        scrollTop.value = event.scrollTop
        if (scrolFunc)
            scrolFunc(event)
    }

    onActivated(() => {
        console.log('onActivated')
        const scrollBar = templateRef(refKey) as unknown as Ref<Pick<ElScrollbarType, 'setScrollTop'>>
        if (scrollTop.value)
            scrollBar.value?.setScrollTop(scrollTop.value)
    })
    onMounted(() => {
        console.log('onMounted')
        const scrollBar = templateRef(refKey) as unknown as Ref<Pick<ElScrollbarType, 'setScrollTop'>>
        if (scrollTop.value)
            scrollBar.value?.setScrollTop(scrollTop.value)
    })

    return {
        onScroll,
    }
}
