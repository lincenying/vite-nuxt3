import { acceptHMRUpdate } from 'pinia'
import type { ApiConfig, Article, ArticleList } from '~/types'

interface StateType {
    counter: number
    name: string
    isAdmin: boolean
    blog: Article[]
}

const useIndexStore = defineStore('indexStore', () => {
    const state: StateType = reactive({
        counter: 0,
        name: 'Eduardo',
        isAdmin: true,
        blog: [],
    })

    const increment = () => {
        state.counter++
    }
    const updateName = (name: string) => {
        state.name = name
    }
    const fetchBlog = async (config: ApiConfig = {}) => {
        const data = await useHttp().$get<Nullable<Article[]>>('/api/article/list', config)
        if (data)
            state.blog = data
    }

    return {
        ...toRefs(state),
        increment,
        updateName,
        fetchBlog,
    }
})
export default useIndexStore

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useIndexStore, import.meta.hot))
