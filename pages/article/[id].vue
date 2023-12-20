<template>
    <div>
        <Logos mb-6 />
        <el-card mx-auto my-0 w-600px>
            <div>
                <span class="m-3 text-sm btn" @click="router.go(-1)"> Back </span>
            </div>
            <div v-html="data?.data.c_content"></div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { ArticleDetail } from '~/types'

const router = useRouter()
const route = useRoute<'article-id'>()
const id = route.params.id

const { data } = await useFetch<ArticleDetail>(`/api/article/detail?id=${id}`, {
    key: `article-detail-${id}`,
})

definePageMeta({
    layout: 'default',
    keepalive: true,
})
</script>
