<template>
    <global-dialog ref="layerDom" :layer="layer" @update="onUpdate" @confirm="onSubmit">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px" class="mr-30px">
            <el-form-item label="标题：" prop="title">
                <el-input v-model="form.title" placeholder="请输入标题" />
            </el-form-item>
            <el-form-item label="分类：" prop="category">
                <el-select v-model="form.category" placeholder="请选择分类" clearable>
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="内容：" prop="content">
                <el-input v-model="form.content" :rows="12" type="textarea" placeholder="请输入内容" />
            </el-form-item>
        </el-form>
    </global-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance, FormItemRule } from 'element-plus'

import type { GlobalDialogLayer, GlobalDiaslogInstance } from '~/types/components.types'
import Rules from '@lincy/async-validation'
import globalDialog from '~/components/global/dialog.vue'

defineOptions({
    name: 'DialogUserModify',
})

const { layer } = defineProps<{
    layer: GlobalDialogLayer<Nullable<Objable>>
}>()

const emit = defineEmits<{
    getData: [value: number]
}>()

const modelValue = defineModel<boolean>()

const ruleForm = ref<Nullable<FormInstance>>(null)
const layerDom = ref<Nullable<GlobalDiaslogInstance>>(null)

const form = reactive({
    id: '',
    title: '',
    content: '',
    category: '',
})

if (layer.row) {
    form.id = layer.row.id
    form.title = layer.row.title
    form.content = layer.row.content
    form.category = layer.row.category
}

const rules = {
    title: Rules.string('标题') as FormItemRule,
    content: Rules.string('内容') as FormItemRule,
    category: Rules.select('分类') as FormItemRule,
}
const options = [
    { value: '运动', label: '运动' },
    { value: '健身', label: '健身' },
    { value: '跑酷', label: '跑酷' },
    { value: '街舞', label: '街舞' },
]
function onSubmit() {
    if (ruleForm.value) {
        ruleForm.value.validate((valid) => {
            if (valid) {
                const params = form
                if (layer.row) {
                    updateForm(params)
                }
                else {
                    addForm(params)
                }
            }
        })
    }
}
// 新增提交事件
async function addForm(body: object) {
    const data = await useHttp.$post('/api/sqlite3/article/add', {}, { body })
    if (data) {
        ElMessage({
            type: 'success',
            message: '新增成功',
        })
        emit('getData', 1)
        layerDom.value?.close()
    }
}
// 编辑提交事件
async function updateForm(body: object) {
    const data = await useHttp.$post('/api/sqlite3/article/edit', {}, { body })
    if (data) {
        ElMessage({
            type: 'success',
            message: '编辑成功',
        })
        emit('getData', 1)
        layerDom.value?.close()
    }
}
function onUpdate(payload: boolean) {
    modelValue.value = payload
}
</script>
