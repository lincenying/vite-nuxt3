<template>
    <div>
        <el-dialog v-model="show" :title="layer.title" :width="layer.width" center>
            <slot />
            <template v-if="layer.showButton" #footer>
                <div>
                    <el-button type="primary" @click="emit('confirm')">确认</el-button>
                    <el-button @click="show = false">取消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import type { GlobalDialogLayer } from '~/types/components.types'

defineOptions({
    name: 'GlobalDialog',
})

const { layer } = defineProps<{
    layer: GlobalDialogLayer<Nullable<Objable>>
}>()

const emit = defineEmits(['confirm', 'update'])

const show = ref<boolean>(layer.show)

watch(show, () => {
    emit('update', show.value)
})

const close = () => show.value = false

defineExpose({
    close,
})
</script>
