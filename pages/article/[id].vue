<template>
    <div>
        <div v-html="data?.data.c_content"></div>

        <div>
            <NuxtLink
                class="m-3 text-sm btn"
                to="/"
            >
                Back
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ArticleDetail } from '~/types'

const route = useRoute<'article-id'>()
const id = route.params.id

const { data } = await useFetch<ArticleDetail>(`/api/article/detail?id=${id}`)

definePageMeta({
    layout: 'home',
})
</script>
