<template>
    <div v-loading="loading" class="global-wrap article-wrap">
        <OtherTopBanner title="SQLite文章" intro="这是一段描述文字，可以自定义你想要的文字" :img="topBannerImg"></OtherTopBanner>
        <div ref="navigation" class="navigation" flex="~ justify-center items-center" h-42px bg-hex-fff>
            <div flex="~ justify-between auto" max-w-1294px>
                <div flex-auto text-hex-8a8a8a lt-m1360="mx-24px">当前位置：<router-link to="/">首页</router-link> » SQLite文章</div>
                <div cursor-pointer @click="layer.show = true">发布文章</div>
            </div>
        </div>
        <div flex="~ justify-center" mt-24px lt-m1360="mx-24px">
            <div flex="~ auto justify-between" max-w-1294px>
                <div class="sidebar" w-320px>
                    <el-affix ref="affix" :offset="104">
                        <HomeRecommend></HomeRecommend>
                        <NewsRecommend></NewsRecommend>
                    </el-affix>
                </div>
                <div class="main" flex="auto" w-1px ml-24px>
                    <el-skeleton :loading="loading" animated :count="9">
                        <template #template>
                            <div flex="~ items-center" mb-24px p-24px bg="hex-fff">
                                <el-skeleton-item variant="image" class="!w-80px !h-80px mr-16px" />
                                <div flex="1">
                                    <el-skeleton-item variant="text" class="!w-1/2 !h-26px" />
                                    <el-skeleton-item variant="text" class="!w-80% !h-21px" />
                                    <el-skeleton-item variant="text" class="!w-80% !h-21px" />
                                    <el-skeleton-item variant="text" class="!w-80% !h-21px" />
                                </div>
                            </div>
                        </template>
                        <template #default>
                            <ul>
                                <li
                                    v-for="(item, index) in articleLists.list" :key="index"
                                    relative top-0 flex="~ items-center" mb-24px p-24px b-rd-6px bg="hex-fff" transition="all duration-.3s"
                                >
                                    <div flex="[0_0_80px]" h-80px p="x-0 y-16px" mr-16px b-rd-4px text="hex-8a8a8a 12px center" bg="hex-eee">
                                        <span block font-bold text="hex-007bff 24px" lh-30px>{{ UTC2Date(item.date, 'dd') }}</span>{{ UTC2Date(item.date, 'yyyy-mm') }}
                                    </div>
                                    <div flex-1>
                                        <router-link :to="`/article/detail?id=${item.id}`"><h2 text="18px" lh-26px>{{ item.title }}</h2></router-link>
                                        <p text="14px hex-8a8a8a" lh-21px line-3>{{ item.content }}</p>
                                    </div>
                                </li>
                            </ul>
                            <div v-if="articleLists.total > pageSize" class="page" flex="~ justify-center" mb-24px>
                                <el-pagination background layout="prev, pager, next" :total="articleLists.total" :page-size="pageSize" @current-change="currentChange" />
                            </div>
                        </template>
                    </el-skeleton>
                </div>
            </div>
        </div>
        <article-dialog-post v-if="layer.show" v-model="layer.show" :layer="layer" @get-data="currentChange" />
    </div>
</template>

<script setup lang="ts">
import type { ArticleType } from '~/types/article.types'
import type { GlobalDialogLayer } from '~/types/components.types'
import type { ElAffixType } from '~/types/global.types'
import { UTC2Date } from '@lincy/utils'
import topBannerImg from '@/assets/images/home/page-banner.jpg'
import { appName } from '~/constants'

defineOptions({
    name: 'RouterArticle',
})

updateAppConfig({
    menuActive: 'article',
})

let page = $ref<number>(1)
const pageSize = $ref<number>(12)
const category = $(useRouteQuery<string>('category'))
const tag = $(useRouteQuery<string>('tag'))

const articleStore = useArticleStore()
const { index: articleLists } = storeToRefs(articleStore)

const payload = computed(() => {
    return {
        category,
        tag,
        page,
    }
})

const loading = ref(true)

await callOnce(() => {
    return Promise.all([
        articleStore.getIndex(payload.value),
    ])
})

loading.value = false

const navigation = ref<HTMLElement>()

watch(() => [category, tag], () => {
    page = 1
    articleStore.getIndex(payload.value)
    scrollToNav(navigation, -80)
})

async function currentChange(newPage: number) {
    page = newPage
    articleStore.getIndex(payload.value)
    scrollToNav(navigation, -80)
}

useSaveScroll()

const affix = ref<ElAffixType>()
onActivated(() => {
    affix.value?.updateRoot()
})

useHead({
    title: `SQLite文章 - ${appName}`,
})

definePageMeta({
    key: 'article-index',
    layout: 'default',
    // keepalive: true,
})

// 弹窗控制器
const layer: GlobalDialogLayer<Nullable<ArticleType>> = reactive({
    show: false,
    title: '新增文章',
    showButton: true,
    width: '800px',
    row: null,
})
</script>
