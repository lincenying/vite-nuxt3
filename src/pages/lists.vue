<template>
    <div h-1px flex-auto flex flex-col items-center>
        <Logos />
        <el-card v-loading="isLoading" w-600px h-1px flex-auto>
            <el-scrollbar ref="listsScrollBar" wrap-style="height: 100%" @scroll="onScroll">
                <div v-for="(item, index) in lists" :key="index" flex--c text-left lh-34px>
                    <span class="i-carbon-strawberry" mr-10px></span>
                    <NuxtLink :to="`/article/${item.c_id}`">{{ item.c_title }}</NuxtLink>
                </div>
                <div flex-cc gap-10px>
                    <span v-if="hasNext" class="m-12px text-14px lh-20px btn" @click="handleNext"> Click Load More </span>
                </div>
                <div>User: {{ name }} - Click: {{ counter }} - CountState: {{ count }}</div>
                <div flex-cc gap-10px>
                    <button class="i-twemoji:backhand-index-pointing-right" />
                    <span class="m-12px text-14px lh-20px btn" @click="handleToList"> Go To List </span>
                </div>
            </el-scrollbar>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { Article, ListsData } from '~/types'

import { appName } from '@/constants'

const router = useRouter()

const indexStore = useIndexStore()
const { counter, name } = storeToRefs(indexStore)

const { count, inc } = useCount()

const lists = ref<Article[]>([])
const page = ref(1)
let hasNext = $ref(false)

const { data: posts, status } = await useHttp().get<ListsData>('/api/article/lists', { page, limit: 15 }, { key: `article-lists` })

const isLoading = useDelay(status, 300)

watch(() => posts.value, (newData) => {
    if (newData) {
        lists.value = lists.value.concat(newData.list || [])
        hasNext = newData.hasNext
    }
}, {
    immediate: true,
})

// 记录和还原滚动条位置
const listsScrollBar = ref<ScrollbarInstance>()
const { onScroll } = useAutoScroll('listsScrollBar')

setTimeout(() => {
    indexStore.updateName('张三')
}, 2000)

function handleNext() {
    page.value = page.value + 1
    indexStore.increment()
    inc()
}
function handleToList() {
    router.push('/list')
}

useHead({
    title: `Index Page - ${appName}`,
})

definePageMeta({
    key: 'article-lists',
    layout: 'default',
    keepalive: true,
})
</script>
