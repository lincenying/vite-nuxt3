import type { GlobalState } from '../types/pinia.types'
import { acceptHMRUpdate } from 'pinia'

const usePiniaStore = defineStore('globalStore', () => {
    const state: GlobalState = reactive({
        globalLoading: true,
        routerLoading: false,
        ISDEV: import.meta.env.VITE_APP_ENV === 'development',
        ISPRE: import.meta.env.VITE_APP_ENV === 'pre-release',
        ISPROD: import.meta.env.VITE_APP_ENV === 'production',
    })

    /**
     * 设置全局loading
     * @param payload boolean
     */
    const setGlobalLoading = (payload: boolean) => {
        state.globalLoading = payload
    }

    /**
     * 设置路由loading
     * @param payload boolean
     */
    const setRouterLoading = (payload: boolean) => {
        state.routerLoading = payload
    }

    return {
        ...toRefs(state),
        setGlobalLoading,
        setRouterLoading,
    }
})
export default usePiniaStore
export const globalStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
