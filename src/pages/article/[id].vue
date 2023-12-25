<template>
    <div>
        <Logos mb-6 />
        <el-card mx-auto my-0 w-600px>
            <el-scrollbar wrap-style="height: calc(100vh - 80px - 120px - 100px - 40px)">
                <div>
                    <span class="m-3 text-sm btn" @click="router.go(-1)"> Back </span>
                </div>
                <div v-html="detail?.c_content"></div>
            </el-scrollbar>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { ArticleDetail } from '~/types'

const router = useRouter()
const route = useRoute<'article-id'>()
const id = ref(route.params.id)

const { data } = await useFetch<ArticleDetail>(`/api/article/detail`, {
    key: `article-detail-${id}`,
    params: {
        id,
    },
})

const detail = computed(() => {
    return data.value?.data
})

definePageMeta({
    layout: 'default',
    keepalive: true,
})
</script>
