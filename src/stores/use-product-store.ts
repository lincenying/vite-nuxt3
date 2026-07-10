import type { ListPayload } from '#shared/types'
import type { ProductCategory, ProductState } from '../types/pinia.types'
import { isEmpty } from '@lincy/utils'
import { acceptHMRUpdate } from 'pinia'
import { getHomeCategory, getHomeList, getHomeDetail } from '~/api/home'

import { defaultList } from '~/constants'

const usePiniaStore = defineStore('productStore', () => {
    const state: ProductState = reactive({
        index: defaultList(),
        category: [],
        detail: {},
    })

    const setCtegory = (payload: ProductCategory[]) => {
        state.category = payload
    }

    const getIndex = async (payload: ListPayload) => {
        const data = await getHomeList(payload)
        if (!isEmpty(data)) {
            state.index = data
        }
    }

    const getCtegory = async () => {
        const data = await getHomeCategory()
        if (!isEmpty(data)) {
            state.category = data
        }
    }

    const getDetail = async (id: string) => {
        const data = await getHomeDetail(id)
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
