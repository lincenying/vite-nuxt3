import type { ProductCategory, ProductState } from '../types/pinia.types'
import type { NewsType } from '~/types/news.types'
import { isEmpty } from '@lincy/utils'
import { acceptHMRUpdate } from 'pinia'
import { defaultList } from '~/constants'

interface PayloadType {
    page: number
    tag: string | undefined
    category: string | undefined
}

const usePiniaStore = defineStore('productStore', () => {
    const state: ProductState = reactive({
        index: defaultList(),
        category: [],
        detail: {},
    })

    const setCtegory = (payload: ProductCategory[]) => {
        state.category = payload
    }

    const getIndex = async (payload: PayloadType) => {
        const data = await useHttp.$get<ProductState['index']>('/api/home/getList', payload)
        if (!isEmpty(data)) {
            state.index = data
        }
    }

    const getCtegory = async () => {
        const data = await useHttp.$get<ProductState['category']>('/api/home/getCategory', { })
        if (!isEmpty(data)) {
            state.category = data
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
        getCtegory,
        setCtegory,
        getDetail,
    }
})
export default usePiniaStore
export const productStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
