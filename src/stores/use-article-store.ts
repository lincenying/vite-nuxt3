import type { ListPayload } from '#shared/types'
import type { ArticleState } from '../types/pinia.types'
import { isEmpty } from '@lincy/utils'
import { acceptHMRUpdate } from 'pinia'
import { getArticleDetail, getArticleList } from '~/api/article'

import { defaultList } from '~/constants'

const usePiniaStore = defineStore('articleStore', () => {
    const state: ArticleState = reactive({
        index: defaultList(),
        detail: {},
    })

    const getIndex = async (payload: ListPayload) => {
        const data = await getArticleList(payload)
        if (!isEmpty(data)) {
            state.index = data
        }
    }

    const getDetail = async (id: string) => {
        const data = await getArticleDetail(id)
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
export const articleStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
