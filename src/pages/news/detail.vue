<template>
    <div v-loading="loading" class="global-wrap index-wrap">
        <OtherTopBanner title="新闻中心" intro="这是一段描述文字，可以自定义你想要的文字" :img="topBannerImg"></OtherTopBanner>
        <div ref="navigation" class="navigation" flex="~ justify-center items-center" h-42px bg-hex-fff>
            <div max-w-1294px flex-auto text-hex-8a8a8a lt-s1366="mx-24px">当前位置：<NuxtLink to="/">首页</NuxtLink> » <NuxtLink to="/news">新闻中心</NuxtLink> » 新闻详情</div>
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
                    <el-skeleton :loading="loading" animated>
                        <template #template>
                            <div bg="hex-fff" mb-24px p-32px>
                                <div flex="~ items-center col">
                                    <el-skeleton-item variant="text" class="!w-1/2 !h-44px" />
                                    <el-skeleton-item variant="text" class="!w-50% !h-21px mt-16px" />
                                </div>
                                <div v-for="i in 6" :key="i" mt-21px>
                                    <el-skeleton-item variant="text" class="!h-21px ml-32px !w-80%" />
                                    <el-skeleton-item v-for="item in 4" :key="`${i}-${item}`" variant="text" class="!h-21px mt-6px" />
                                </div>
                            </div>
                        </template>
                        <template #default>
                            <div mb-24px b-rd-6px p-32px bg="hex-fff">
                                <h1 font-bold text="center hex-202935 28px">{{ newsDetail.title }}</h1>
                                <div class="detail-meta" flex="~ justify-center items-center" mt-16px text="hex-8a8a8a">
                                    <i class="i-carbon-user-avatar" mr-5px h-14px w-14px></i>
                                    <span mr-20px>{{ newsDetail.author }}</span>
                                    <i class="i-carbon-time" mr-5px h-14px w-14px></i>
                                    <span mr-20px>{{ newsDetail.date }}</span>
                                    <i class="i-carbon-collapse-categories" mr-5px h-14px w-14px></i>
                                    <span mr-20px>{{ newsDetail.category }}</span>
                                    <span>阅读({{ newsDetail.views }})</span>
                                </div>
                                <div class="article-content" pt-24px text="hex-202935 16px" lh-28px v-html="newsDetail.content"></div>
                            </div>
                        </template>
                    </el-skeleton>
                    <OtherRelatedRecom column="news"></OtherRelatedRecom>
                    <template v-if="newsDetail.id">
                        <OtherComments :id="newsDetail.id" type="news"></OtherComments>
                        <OtherCommentPost :id="newsDetail.id" type="news"></OtherCommentPost>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ElAffixType } from '~/types/global.types'
import type { NewsType } from '~/types/news.types'
import topBannerImg from '@/assets/images/home/page-banner.jpg'
import { appName } from '~/constants'

defineOptions({
    name: 'RouterNewsDetail',
})

updateAppConfig({
    menuActive: 'news',
})

const id = $(useRouteQuery<string>('id'))

const newsStore = useNewsStore()
const { detail } = storeToRefs(newsStore)

const newsDetail = computed(() => detail.value[id] || {} as NewsType)

const loading = ref(true)

await callOnce(`news-detail-${id}`, () => Promise.all([newsStore.getDetail(id)]), {
    mode: 'navigation',
})

loading.value = false

const navigation = ref<HTMLElement>()

watch(() => id, async () => {
    loading.value = true
    await newsStore.getDetail(id)
    loading.value = false
    scrollToNav(navigation, -80)
})

useSaveScroll()

const affix = ref<ElAffixType>()
onActivated(() => {
    affix.value?.updateRoot()
})

useHead({
    title: `${newsDetail.value.title} - 新闻中心 - ${appName}`,
})

definePageMeta({
    key: 'news-detail',
    layout: 'default',
    // keepalive: true,
})
</script>
