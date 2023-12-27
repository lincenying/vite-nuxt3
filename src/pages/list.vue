<template>
    <div>
        <Logos mb-6 />
        <el-card mx-auto my-0 w-600px>
            <ElScrollbar ref="scrollBar" wrap-style="height: calc(100vh - 80px - 120px - 100px - 40px)" @scroll="onScroll">
                <div v-for="(item, index) in blog" :key="`b${index}`" flex--c text-left lh-34px>
                    <span class="i-carbon-strawberry" mr-10px></span>
                    <router-link :to="`/article/${item.c_id}`">{{ item.c_title }}</router-link>
                </div>
            </ElScrollbar>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { ScrollbarInstance } from '~/composables/scroll'
import { appName } from '~/constants'

const indexStore = useIndexStore()
const { blog } = storeToRefs(indexStore)

await useAsyncData('article-list', () => indexStore.fetchBlog({ page: 1, limit: 30 }))

// 记录和还原滚动条位置
const scrollBar = ref<ScrollbarInstance>()
const { onScroll, scrollBarTemp } = useAutoScroll('article-list')
watch(scrollBar, val => scrollBarTemp.value = val)

useHead({
    title: `List Page - ${appName}`,
})

definePageMeta({
    key: 'article-list',
    layout: 'default',
    keepalive: true,
})
</script>
