import type { ListPayload } from '#shared/types'
import type { FaqsState } from '../types/pinia.types'
import { isEmpty } from '@lincy/utils'
import { acceptHMRUpdate } from 'pinia'
import { getFaqsDetail, getFaqsList } from '~/api/faqs'

import { defaultList } from '~/constants'

const usePiniaStore = defineStore('faqsStore', () => {
    const state: FaqsState = reactive({
        index: defaultList(),
        detail: {},
    })

    const getIndex = async (payload: ListPayload) => {
        const data = await getFaqsList(payload)
        if (!isEmpty(data)) {
            state.index = data
        }
    }

    const getDetail = async (id: string) => {
        const data = await getFaqsDetail(id)
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
export const faqsStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
