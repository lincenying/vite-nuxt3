import type { ListPayload } from '#shared/types'
import type { NewsState } from '../types/pinia.types'
import { isEmpty } from '@lincy/utils'
import { acceptHMRUpdate } from 'pinia'
import { getNewsDetail, getNewsList } from '~/api/news'

import { defaultList } from '~/constants'

const usePiniaStore = defineStore('newsStore', () => {
    const state: NewsState = reactive({
        index: defaultList(),
        detail: {},
    })

    const getIndex = async (payload: ListPayload) => {
        const data = await getNewsList(payload)
        if (!isEmpty(data)) {
            state.index = data
        }
    }

    const getDetail = async (id: string) => {
        const data = await getNewsDetail(id)
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
