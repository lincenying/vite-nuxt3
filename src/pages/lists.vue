<template>
    <div>
        <Logos mb-6 />
        <el-card mx-auto my-0 w-600px>
            <el-scrollbar ref="listsScrollBar" wrap-style="height: calc(100vh - 80px - 120px - 100px - 40px)" @scroll="onScroll">
                <div v-for="(item, index) in lists" :key="index" flex--c text-left lh-34px>
                    <span class="i-carbon-strawberry" mr-10px></span>
                    <NuxtLink :to="`/article/${item.c_id}`">{{ item.c_title }}</NuxtLink>
                </div>
                <div flex-cc gap-10px>
                    <span v-if="hasNext" class="m-3 text-sm btn" @click="handleNext"> Click Load More </span>
                </div>
                <div>User: {{ name }} - Click: {{ counter }} - CountState: {{ count }}</div>
                <div flex-cc gap-10px>
                    <button class="i-twemoji:backhand-index-pointing-right" />
                    <span class="m-3 text-sm btn" @click="handleToList"> Go To List </span>
                </div>
            </el-scrollbar>
        </el-card>
        <client-only>
            <Loading v-model:active="isLoading" color="#00ab00" loader="dots"></Loading>
        </client-only>
    </div>
</template>

<script setup lang="ts">
import Loading from 'vue-loading-overlay'
import { appName } from '~/constants'
import type { Article, ArticleLists } from '~/types'

const router = useRouter()

const indexStore = useIndexStore()
const { counter, name } = storeToRefs(indexStore)

const { count, inc } = useCount()

const lists = ref<Article[]>([])
const page = ref(1)
let hasNext = $ref(false)

const { data, pending } = await useFetch<ArticleLists>('/api/article/lists', {
    key: `article-lists`,
    params: {
        page,
        limit: 15,
    },
    headers: useRequestHeaders(['cookie']),
})

const isLoading = useDelay(pending, 300)

watch(() => data.value, (newData) => {
    if (newData?.code === 200) {
        lists.value = lists.value.concat(newData.data.list || [])
        hasNext = newData.data.hasNext
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
