<template>
    <div v-loading="loading" class="global-wrap pdf-wrap">
        <OtherTopBanner title="PDF文件查看" intro="这是一段描述文字，可以自定义你想要的文字" :img="topBannerImg"></OtherTopBanner>
        <div class="navigation" flex="~ justify-center items-center" h-42px bg-hex-fff>
            <div flex-auto max-w-1294px text-hex-8a8a8a lt-m1360="mx-24px">当前位置：<router-link to="/">首页</router-link> » PDF文件查看</div>
        </div>
        <div flex="~ justify-center" my-24px lt-m1360="mx-24px">
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePDF, VuePDF } from '@tato30/vue-pdf'
import topBannerImg from '@/assets/images/home/page-banner.jpg'

defineOptions({
    name: 'RouterPdf',
})

useHead({
    title: 'MMF小屋-PDF文件查看',
})

updateAppConfig({
    menuActive: 'pdf',
})

const loading = ref(true)

const highlightText = ref('技术认证')
const highlightOptions = ref({
    completeWords: false,
    ignoreCase: true,
})

const { pdf, pages } = usePDF('/static/pdf/pdf.pdf')

useSaveScroll()
</script>
