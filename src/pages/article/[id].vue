<template>
    <div>
        <Logos mb-6 />
        <el-card mx-auto my-0 w-600px>
            <div mx-3 mb-3>
                <span class="text-sm btn" @click="router.go(-1)"> Back </span>
            </div>
            <el-scrollbar wrap-style="height: calc(100vh - 80px - 120px - 100px - 40px - 36px)">
                <div text="center 18px" mb-30px font-800>{{ detail?.c_title }}</div>
                <div v-html="detail?.c_content"></div>
            </el-scrollbar>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { isNumber } from '@lincy/utils'
import { appName } from '~/constants'
import type { ArticleDetail, ArticleLists } from '~/types'

const router = useRouter()
const id = useRouteParam('id')

const { data } = await useFetch<ArticleDetail>(`/api/article/detail`, {
    key: `article-detail-${id}`,
    params: {
        id,
    },
})

const detail = computed(() => data.value?.data)

// 更新列表数据 ===>
const { data: posts } = useNuxtData<ArticleLists>('article-lists')
console.log('🚀 ~ file: [id].vue:35 ~ posts:', posts)

const list = posts.value?.data.list || []
const index = list.findIndex(item => item.c_id === Number(id.value))
if (isNumber(index) && index > -1) {
    list.splice(index, 1, {
        ...list[index],
        c_title: `${list[index].c_title} [clicked]`,
    })
}
// 更新列表数据 <===

useHead({
    title: `${detail.value?.c_title} - ${appName}`,
})

definePageMeta({
    layout: 'default',
    keepalive: true,
})
</script>
