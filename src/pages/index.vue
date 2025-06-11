<template>
    <div class=":uno: h-1px flex-auto flex flex-col items-center">
        <Logos v-model="model" />
        <el-card v-loading="isLoading" class=":uno: w-600px h-1px flex-auto">
            <el-scrollbar wrap-style="height: 100%">
                <div v-for="(item, index) in lists" :key="index" class=":uno: flex--c text-left lh-34px">
                    <span class="i-carbon-strawberry mr-10px"></span>
                    <NuxtLink :to="`/article/${item.c_id}`">{{ item.c_title }}</NuxtLink>
                </div>
                <div flex-cc gap-10px>
                    <span v-if="hasPrev" class=":uno: btn m-12px text-14px lh-20px" @click="handlePrev"> Prev </span>
                    <span v-if="hasNext" class=":uno: btn m-12px text-14px lh-20px" @click="handleNext"> Next </span>
                </div>
                <div>User: {{ name }} - Click: {{ counter }} - CountState: {{ count }} - Model: {{ model }}</div>
                <div flex-cc gap-10px>
                    <button class="i-twemoji:backhand-index-pointing-right text-base" />
                    <span class=":uno: btn m-12px text-14px lh-20px" @click="handleToLists"> Go To Lists </span>
                    <span class=":uno: btn m-12px text-14px lh-20px" @click="handleToList"> Go To List </span>
                </div>
            </el-scrollbar>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { Article } from './index.types'
import { appName } from '@/constants'

const router = useRouter()

const indexStore = useIndexStore()
const { counter, name } = storeToRefs(indexStore)

const { count, inc, dec } = useCount()

let lists = $ref<Article[]>([])
let page = $ref(1)
let hasPrev = $ref(false)
let hasNext = $ref(false)

const { data: posts, status } = await useHttp().get<ResDataLists<Article>>('/api/article/lists', { page: $$(page), limit: 13 }, { key: `article-index` })

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
