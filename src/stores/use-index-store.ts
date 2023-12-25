import { acceptHMRUpdate } from 'pinia'
import type { Article } from '~/types'

interface StateType {
    counter: number
    name: string
    isAdmin: boolean
    blog: Article[]
}

const usePiniaStore = defineStore('indexStore', () => {
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
    const fetchBlog = async (config: any = {}) => {
        const { code, data } = await $fetch<{ code: number; data: Article[] }>('/api/article/list', {
            method: 'GET',
            query: config,
        })
        if (code === 200)
            state.blog = data
    }

    return {
        ...toRefs(state),
        increment,
        updateName,
        fetchBlog,
    }
})
export default usePiniaStore

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
