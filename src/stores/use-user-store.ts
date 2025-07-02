import type { UserState } from '../types/pinia.types'
import { acceptHMRUpdate } from 'pinia'
import { userStorage } from '~/composables/storage'

const usePiniaStore = defineStore('userStore', () => {
    const state: UserState = reactive(userStorage.value || {
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

usePiniaStore(piniaInit).$subscribe((_mutation, state) => {
    userStorage.value = state
})

export default usePiniaStore
export const userStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
