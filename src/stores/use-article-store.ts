import type { ArticleState } from '../types/pinia.types'
import type { ArticleType } from '~/types/article.types'
import { isEmpty } from '@lincy/utils'
import { acceptHMRUpdate } from 'pinia'
import { defaultList } from '~/constants'

interface PayloadType {
    page: number
    tag: string | undefined
    category: string | undefined
}

const usePiniaStore = defineStore('articleStore', () => {
    const state: ArticleState = reactive({
        index: defaultList(),
        detail: {},
    })

    const getIndex = async (payload: PayloadType) => {
        const data = await useHttp.$get<ArticleState['index']>('/api/sqlite3/article/lists', payload)
        if (!isEmpty(data)) {
            state.index = data
        }
    }

    const getDetail = async (id: string) => {
        const data = await useHttp.$get<ArticleType>('/api/sqlite3/article/detail', { id })
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
