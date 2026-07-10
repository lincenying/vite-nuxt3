<template>
    <el-dialog v-model="show" :title="layer.title" :width="layer.width" :append-to-body="true" center v-bind="$attrs" :before-close="onBeforeClose">
        <slot />
        <template v-if="layer.showButton" #footer>
            <div v-if="layer.showCancel" class="dialog-footer" pt-20px border-t="1px solid hex-F0F0F0">
                <el-button
                    :disabled="layer.disabledBtn || layer.loadingBtn" :loading="layer.loadingBtn"
                    type="primary" class="w-1/2 flex-auto"
                    @click="emit('confirm')"
                >
                    {{ submitText }}
                </el-button>
                <el-button class="w-1/2 flex-auto" @click="handleClose">{{ cancelText }}</el-button>
            </div>
            <div v-else class="dialog-footer" pt-20px border-t="1px solid hex-F0F0F0">
                <el-button
                    :disabled="layer.disabledBtn || layer.loadingBtn" :loading="layer.loadingBtn"
                    type="primary" class="w-full"
                    @click="emit('confirm')"
                >
                    {{ submitText }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import type { GlobalDialogLayer } from '~/types/components.types'
import { confirmMsg } from '~/composables/message'

defineOptions({
    name: 'GlobalDialog',
})

const { layer, needConfirmClose = false, cancelText = '关闭', submitText = '保存' } = defineProps<{
    /** 关闭是否需要确认 */
    needConfirmClose?: boolean
    /** 取消按钮文案 */
    cancelText?: string
    /** 确认按钮文案 */
    submitText?: string
    /** 主体数据 */
    layer: GlobalDialogLayer<Nullable<Objable>>
}>()

const emit = defineEmits(['confirm', 'update'])

const show = ref<boolean>(layer.show)

watch(show, () => {
    emit('update', show.value)
})

function onBeforeClose(done: () => void) {
    if (!needConfirmClose) {
        done()
    }
    else {
        confirmMsg('确认关闭？', async () => {
            done()
        })
    }
}

function handleClose() {
    if (needConfirmClose) {
        confirmMsg('确认关闭？', async () => {
            show.value = false
        })
    }
    else {
        show.value = false
    }
}
const close = () => (show.value = false)

defineExpose({
    close,
})
</script>
