import type { NewsState } from '../types/pinia.types'
import type { NewsType } from '~/types/news.types'
import { isEmpty } from '@lincy/utils'
import { acceptHMRUpdate } from 'pinia'
import { defaultList } from '~/constants'

interface PayloadType {
    page: number
    tag: string | undefined
    category: string | undefined
}

const usePiniaStore = defineStore('newsStore', () => {
    const state: NewsState = reactive({
        index: defaultList(),
        detail: {},
    })

    const getIndex = async (payload: PayloadType) => {
        const data = await useHttp.$get<NewsState['index']>('/api/news/getList', payload)
        if (!isEmpty(data)) {
            state.index = data
        }
    }

    const getDetail = async (id: string) => {
        const data = await useHttp.$get<NewsType>('/api/news/detail', { id })
        if (data) {
            state.detail[id] = data
        }

        return data
    }

    return {
        ...toRefs(state),
        getIndex,
        getDetail,
    }
})
export default usePiniaStore
export const newsStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
