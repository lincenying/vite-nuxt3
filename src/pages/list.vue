<template>
    <div h-1px flex-auto flex flex-col items-center>
        <Logos />
        <el-card w-600px h-1px flex-auto>
            <el-scrollbar ref="listScrollBar" wrap-style="height: 100%" @scroll="onScroll">
                <div v-for="(item, index) in posts" :key="`b${index}`" flex--c text-left lh-34px>
                    <span class="i-carbon-strawberry" mr-10px></span>
                    <NuxtLink :to="`/article/${item.c_id}`">{{ item.c_title }}</NuxtLink>
                </div>
            </el-scrollbar>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { ElScrollbarType } from '~/types'
import type { Article } from '~/types/index.types'
import { appName } from '@/constants'

const indexStore = useIndexStore()
const { posts } = storeToRefs(indexStore)

await useAsyncData('article-list', () => indexStore.fetchPost({ page: 1, limit: 100 }))

const { data: todos } = useNuxtData<Article[]>('article-list')

console.log(todos.value?.length)
// todos.value = todos.value?.slice(0, 10) || []
// console.log(todos.value?.length)

// 记录和还原滚动条位置
const listScrollBar = ref<ElScrollbarType>()
const { onScroll } = useAutoScroll('listScrollBar')

useHead({
    title: `List Page - ${appName}`,
})

definePageMeta({
    key: 'article-list',
    layout: 'default',
    keepalive: true,
})
</script>
