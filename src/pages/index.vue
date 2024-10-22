<template>
    <div>
        <Logos v-model="model" mb-6 />
        <el-card v-loading="isLoading" mx-auto my-0 w-600px>
            <el-scrollbar wrap-style="height: calc(100vh - 80px - 120px - 100px - 40px)">
                <div v-for="(item, index) in lists" :key="index" flex--c text-left lh-34px>
                    <span class="i-carbon-strawberry" mr-10px></span>
                    <NuxtLink :to="`/article/${item.c_id}`">{{ item.c_title }}</NuxtLink>
                </div>
                <div flex-cc gap-10px>
                    <span v-if="hasPrev" class="m-3 text-sm btn" @click="handlePrev"> Prev </span>
                    <span v-if="hasNext" class="m-3 text-sm btn" @click="handleNext"> Next </span>
                </div>
                <div>User: {{ name }} - Click: {{ counter }} - CountState: {{ count }} - Model: {{ model }}</div>
                <div flex-cc gap-10px>
                    <button class="i-twemoji:backhand-index-pointing-right" />
                    <span class="m-3 text-sm btn" @click="handleToLists"> Go To Lists </span>
                    <span class="m-3 text-sm btn" @click="handleToList"> Go To List </span>
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

const { count, inc, dec } = useCount()

let lists = $ref<Article[]>([])
let page = $ref(1)
let hasPrev = $ref(false)
let hasNext = $ref(false)

const { data: posts, status } = await useHttp().get<ListsData>('/api/article/lists', { page: $$(page), limit: 15 }, { key: `article-lists` })

const isLoading = useDelay(status, 300)

watch(() => posts.value, (newData) => {
    if (newData) {
        lists = newData.list || []
        hasPrev = newData.hasPrev
        hasNext = newData.hasNext
    }
}, {
    immediate: true,
})

setTimeout(() => {
    indexStore.updateName('张三')
}, 2000)

function handlePrev() {
    page = page - 1
    indexStore.increment()
    dec()
}
function handleNext() {
    page = page + 1
    indexStore.increment()
    inc()
}
function handleToLists() {
    router.push('/lists')
}
function handleToList() {
    router.push('/list')
}

const model = ref(1)

useHead({
    title: `Index Page - ${appName}`,
})

definePageMeta({
    key: 'article-index',
    layout: 'default',
    keepalive: true,
})
</script>
