<template>
    <div>
        <Logos mb-6 />
        <el-card mx-auto my-0 w-600px>
            <div v-for="(item, index) in lists" :key="index" text-left lh-34px>
                <router-link :to="`/article/${item.c_id}`">{{ item.c_title }}</router-link>
            </div>
            <div flex-cc gap-10px>
                <span v-if="hasPrev" class="m-3 text-sm btn" @click="handlePrev"> Prev </span>
                <span v-if="hasNext" class="m-3 text-sm btn" @click="handleNext"> Next </span>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { Article, ArticleLists } from '~/types'

const lists = ref<Article[]>([])
const page = ref(1)
const hasPrev = ref(false)
const hasNext = ref(false)

const { data } = await useFetch<ArticleLists>('/api/article/lists', {
    key: `article-lists`,
    params: {
        page,
        limit: 15,
    },
    headers: useRequestHeaders(['cookie']),
})

watch(() => data.value, (newData) => {
    if (newData?.code === 200) {
        lists.value = newData.data.list || []
        hasPrev.value = newData.data.hasPrev
        hasNext.value = newData.data.hasNext
    }
}, {
    immediate: true,
})

function handlePrev() {
    page.value = page.value - 1
}
function handleNext() {
    page.value = page.value + 1
}

definePageMeta({
    key: 'article-lists',
    layout: 'default',
    keepalive: true,
})
</script>
