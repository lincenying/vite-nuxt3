import type { CommentListPayload } from '#shared/types'
import type { CommentState } from '~/types/pinia.types'
import { acceptHMRUpdate } from 'pinia'

import { getCommentList } from '~/api/comment'

const usePiniaStore = defineStore('commentStore', () => {
    const state: CommentState = reactive({
        detail: {},
    })
    const getComment = async (payload: CommentListPayload) => {
        const data = await getCommentList(payload)
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
