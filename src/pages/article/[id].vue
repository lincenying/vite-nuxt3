<template>
    <div h-1px flex-auto flex flex-col items-center>
        <Logos />
        <el-card v-loading="isLoading" w-600px h-1px flex-auto>
            <div mx-12px mb-12px>
                <span class="text-14px lh-20px btn" @click="router.go(-1)"> Back </span>
            </div>
            <el-scrollbar wrap-style="height: 100%">
                <div text="center 18px" mb-30px font-800>{{ detail?.c_title }}</div>
                <div v-html="detail?.c_content"></div>
            </el-scrollbar>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { Article } from '../index.types'
import { appName } from '@/constants'

const router = useRouter()
const id = useRouteParam('id')

const { data, status } = await useHttp().get<Article>(`/api/article/detail`, { id }, { key: `article-detail-${id.value}` })

const isLoading = useDelay(status, 100)

const detail = computed(() => data.value)

// 更新列表数据 ===>
const { data: posts } = useNuxtData<ResDataLists<Article>>('article-lists')
console.log('🚀 ~ file: [id].vue:35 ~ posts:', posts)

const list = posts.value?.list || []
const index = list.findIndex(item => item.c_id === Number(id.value))
if (index > -1) {
    list.splice(index, 1, {
        ...list[index],
        c_title: `${list[index].c_title} [clicked]`,
    })
}
// 更新列表数据 <===s

useHead({
    title: `${detail.value?.c_title} - ${appName}`,
})

definePageMeta({
    layout: 'default',
    keepalive: true,
})
</script>
