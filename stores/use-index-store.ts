import { acceptHMRUpdate } from 'pinia'

const usePiniaStore = defineStore('indexStore', () => {
    const state = reactive({
        counter: 0,
        name: 'Eduardo',
        isAdmin: true,
    })

    const increment = () => {
        state.counter++
    }
    const updateName = (name: string) => {
        state.name = name
    }

    return {
        ...toRefs(state),
        increment,
        updateName,
    }
})
export default usePiniaStore

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
