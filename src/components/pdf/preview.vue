<template>
    <div w-1294px flex="~ justify-between">
        <div w-640px>
            <div v-for="page in pages" :key="page">
                <VuePDF :pdf="pdf" :page="page" :width="640" @loaded="loading = false" />
            </div>
        </div>
        <div w-640px>
            <div v-for="page in pages" :key="page">
                <VuePDF
                    :pdf="pdf" :page="page" :width="640"
                    :highlight-text="highlightText" :highlight-options="highlightOptions"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePDF, VuePDF } from '@tato30/vue-pdf'

defineOptions({
    name: 'PdfPreview',
})

const loading = ref(true)

const highlightText = ref('技术认证')
const highlightOptions = ref({
    completeWords: false,
    ignoreCase: true,
})

const { pdf, pages } = usePDF('/static/pdf/pdf.pdf')
</script>
