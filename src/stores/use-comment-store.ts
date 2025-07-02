import type { CommentType } from '~/types/comments.types'
import type { CommentState } from '~/types/pinia.types'
import { acceptHMRUpdate } from 'pinia'

interface PayloadType {
    page: number
    id: string | number
    type: string
}

const usePiniaStore = defineStore('commentStore', () => {
    const state: CommentState = reactive({
        detail: {},
    })
    const getComment = async (payload: PayloadType) => {
        const data = await useHttp.$get<CommentType>('/api/comment/getList', payload)
        if (data) {
            state.detail[`${payload.type}-${payload.id}`] = data
        }

        return data
    }

    return {
        ...toRefs(state),
        getComment,
    }
})
export default usePiniaStore
export const commentStoreWithout = () => usePiniaStore(piniaInit)

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
