export default defineComponent({
    name: 'GlobalDigital',
    props: {
        number: {
            type: String,
            default: '',
        },
        // item: {
        //     type: Object as PropType<AbdTop5>,
        //     default: () => ({}),
        // },
    },
    setup(props) {
        // 父子组件通讯 ===>
        const { number } = $(toRefs(props))
        // 父子组件通讯 <===
        return () => <div class={`i-fad-digital${number}`}></div>
    },
})
