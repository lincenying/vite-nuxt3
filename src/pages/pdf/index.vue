<template>
    <div class="global-wrap pdf-wrap">
        <OtherTopBanner title="PDF文件查看" intro="这是一段描述文字，可以自定义你想要的文字" :img="topBannerImg"></OtherTopBanner>
        <div class="navigation" flex="~ justify-center items-center" h-42px bg-hex-fff>
            <div flex-auto max-w-1294px text-hex-8a8a8a lt-m1360="mx-24px">当前位置：<router-link to="/">首页</router-link> » PDF文件查看</div>
        </div>
        <div flex="~ justify-center" my-24px lt-m1360="mx-24px">
            <client-only>
                <pdfViewerComp></pdfViewerComp>
            </client-only>
        </div>
    </div>
</template>

<script setup lang="ts">
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

const pdfViewerComp = defineAsyncComponent(async () => {
    if (import.meta.env.SSR)
        return Promise.resolve(h('div', 'Loading...'))
    const module = await import('@/components/pdf/preview.vue')
    return module.default
})

useSaveScroll()
</script>
