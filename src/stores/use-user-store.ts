import type { UserState } from '../types/pinia.types'
import { acceptHMRUpdate } from 'pinia'

const usePiniaStore = defineStore('userStore', () => {
    const state: UserState = reactive({
        info: {}, // 用户信息
        token: '',
    })

    /**
     * 设置token
     * @param payload string
     */
    const setToken = (payload: string) => {
        state.token = payload
    }

    const setInfo = (payload: Objable) => {
        state.info = payload
    }

    return {
        ...toRefs(state),
        setToken,
        setInfo,
    }
})

export default usePiniaStore
export const userStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
