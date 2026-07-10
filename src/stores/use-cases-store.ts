import type { ListPayload } from '#shared/types'
import type { CasesState } from '../types/pinia.types'
import { isEmpty } from '@lincy/utils'
import { acceptHMRUpdate } from 'pinia'
import { getCasesDetail, getCasesList } from '~/api/cases'

import { defaultList } from '~/constants'

const usePiniaStore = defineStore('casesStore', () => {
    const state: CasesState = reactive({
        index: defaultList(),
        detail: {},
    })

    const getIndex = async (payload: ListPayload) => {
        const data = await getCasesList(payload)
        if (!isEmpty(data)) {
            state.index = data
        }
    }

    const getDetail = async (id: string) => {
        const data = await getCasesDetail(id)
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
export const casesStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
