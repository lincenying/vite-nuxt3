import type { Article } from '~/pages/index.types'

import type { ApiConfig } from '~/types'
import { acceptHMRUpdate } from 'pinia'

interface StateType {
    counter: number
    name: string
    isAdmin: boolean
    posts: Article[]
}

const useStore = defineStore('indexStore', () => {
    const state: StateType = reactive({
        counter: 0,
        name: 'Eduardo',
        isAdmin: true,
        posts: [],
    })

    const increment = () => {
        state.counter++
    }
    const updateName = (name: string) => {
        state.name = name
    }
    const fetchPost = async (config: ApiConfig = {}) => {
        const data = await useHttp().$get<Nullable<Article[]>>('/api/article/list', config)
        if (data) {
            state.posts = data
        }

        return data
    }

    return {
        ...toRefs(state),
        increment,
        updateName,
        fetchPost,
    }
})
export default useStore

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
