<template>
    <div>
        <Logos mb-6 />
        <el-card mx-auto my-0 w-600px>
            <el-scrollbar wrap-style="height: calc(100vh - 80px - 120px - 100px - 40px)">
                <div v-for="(item, index) in blog" :key="`b${index}`" text-left lh-34px>
                    <router-link :to="`/article/${item.c_id}`">{{ item.c_title }}</router-link>
                </div>
            </el-scrollbar>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { Article } from '~/types'

const indexStore = useIndexStore()
const { blog } = storeToRefs(indexStore)

await useAsyncData('article-list', () => indexStore.fetchBlog({ page: 1, limit: 20 }))

definePageMeta({
    key: 'article-list',
    layout: 'default',
    keepalive: true,
})
</script>
