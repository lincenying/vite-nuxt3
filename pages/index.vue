<template>
    <div>
        <Logos mb-6 />
        <div v-for="(item, index) in data?.data.list" :key="index" @click="router.push(`/article/${item.c_id}`)">
            <router-link :to="`/article/${item.c_id}`" replace>{{ item.c_title }}</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ArticleLists } from '~/types'

const { data } = await useFetch<ArticleLists>('/api/article/lists?page=1&limit=10')

const router = useRouter()

definePageMeta({
    layout: 'default',
})
</script>
