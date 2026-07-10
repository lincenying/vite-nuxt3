<template>
    <div v-loading="loading" class="global-wrap news-wrap">
        <OtherTopBanner title="新闻中心" intro="这是一段描述文字，可以自定义你想要的文字" :img="topBannerImg"></OtherTopBanner>
        <div ref="navigation" class="navigation" flex="~ justify-center items-center" h-42px bg-hex-fff>
            <div max-w-1294px flex-auto text-hex-8a8a8a lt-s1366="mx-24px">当前位置：<NuxtLink to="/">首页</NuxtLink> » 新闻中心</div>
        </div>
        <div flex="~ justify-center" mt-24px lt-s1366="mx-24px">
            <div class="page-layout">
                <div class="page-sidebar">
                    <el-affix ref="affix" :offset="104">
                        <HomeRecommend></HomeRecommend>
                        <NewsRecommend></NewsRecommend>
                    </el-affix>
                </div>
                <div class="page-main">
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
                                    v-for="(item, index) in newsLists.list" :key="index"
                                    flex="~ items-center" relative top-0 mb-24px b-rd-6px p-24px bg="hex-fff" transition="all duration-.3s"
                                >
                                    <div flex="[0_0_80px]" p="x-0 y-16px" mr-16px h-80px b-rd-4px text="hex-8a8a8a 12px center" bg="hex-eee">
                                        <span block font-bold text="hex-007bff 24px" lh-30px>{{ UTC2Date(item.date, 'dd') }}</span>{{ UTC2Date(item.date, 'yyyy-mm') }}
                                    </div>
                                    <div flex-1>
                                        <NuxtLink :to="`/news/detail?id=${item.id}`"><h2 text="18px" lh-26px>{{ item.title }}</h2></NuxtLink>
                                        <p text="14px hex-8a8a8a" line-3 lh-21px>{{ item.intro }}</p>
                                    </div>
                                </li>
                            </ul>
                            <div v-if="newsLists.total > pageSize" class="page" flex="~ justify-center" mb-24px>
                                <el-pagination background layout="prev, pager, next" :total="newsLists.total" :page-size="pageSize" @current-change="currentChange" />
                            </div>
                        </template>
                    </el-skeleton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ElAffixType } from '~/types/global.types'
import { UTC2Date } from '@lincy/utils'
import topBannerImg from '@/assets/images/home/page-banner.jpg'
import { appName } from '~/constants'

defineOptions({
    name: 'RouterNews',
})

updateAppConfig({
    menuActive: 'news',
})

let page = $ref<number>(1)
const pageSize = $ref<number>(12)
const category = $(useRouteQuery<string>('category'))
const tag = $(useRouteQuery<string>('tag'))

const newsStore = useNewsStore()
const { index: newsLists } = storeToRefs(newsStore)

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
        newsStore.getIndex(payload.value),
    ])
})

loading.value = false

const navigation = ref<HTMLElement>()

watch(() => [category, tag], () => {
    page = 1
    newsStore.getIndex(payload.value)
    scrollToNav(navigation, -80)
})

async function currentChange(newPage: number) {
    page = newPage
    newsStore.getIndex(payload.value)
    scrollToNav(navigation, -80)
}

useSaveScroll()

const affix = ref<ElAffixType>()
onActivated(() => {
    affix.value?.updateRoot()
})

useHead({
    title: `新闻中心 - ${appName}`,
})

definePageMeta({
    key: 'news-index',
    layout: 'default',
    // keepalive: true,
})
</script>
