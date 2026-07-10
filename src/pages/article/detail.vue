<template>
    <div v-loading="loading" class="global-wrap index-wrap">
        <OtherTopBanner title="SQLite文章" intro="这是一段描述文字，可以自定义你想要的文字" :img="topBannerImg"></OtherTopBanner>
        <div ref="navigation" class="navigation" flex="~ justify-center items-center" h-42px bg-hex-fff>
            <div max-w-1294px flex-auto text-hex-8a8a8a lt-s1366="mx-24px">当前位置：<NuxtLink to="/">首页</NuxtLink> » <NuxtLink to="/article">SQLite文章</NuxtLink> » 文章详情</div>
        </div>
        <div flex="~ justify-center" mt-24px lt-s1366="mx-24px">
            <div class="page-layout">
                <div class="page-sidebar">
                    <el-affix ref="affix" :offset="104">
                        <HomeRecommend></HomeRecommend>
                        <ArticleRecommend></ArticleRecommend>
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
                                <h1 font-bold text="center hex-202935 28px">{{ articleDetail.title }}</h1>
                                <div class="detail-meta" flex="~ justify-center items-center" mt-16px text="hex-8a8a8a">
                                    <i class="i-carbon-user-avatar" mr-5px h-14px w-14px></i>
                                    <span mr-20px>{{ articleDetail.author }}</span>
                                    <i class="i-carbon-time" mr-5px h-14px w-14px></i>
                                    <span mr-20px>{{ articleDetail.date }}</span>
                                    <i class="i-carbon-collapse-categories" mr-5px h-14px w-14px></i>
                                    <span mr-20px>{{ articleDetail.category }}</span>
                                    <span mr-20px>阅读({{ articleDetail.views }})</span>
                                    <span cursor-pointer @click="handleModify">编辑</span>
                                </div>
                                <div class="article-content" pt-24px text="hex-202935 16px" lh-28px v-html="nl2br(articleDetail.content)"></div>
                            </div>
                        </template>
                    </el-skeleton>
                    <OtherRelatedRecom column="article"></OtherRelatedRecom>
                    <template v-if="articleDetail.id">
                        <OtherComments :id="articleDetail.id" type="article"></OtherComments>
                        <OtherCommentPost :id="articleDetail.id" type="article"></OtherCommentPost>
                    </template>
                </div>
            </div>
        </div>
        <article-dialog-post v-if="layer.show" v-model="layer.show" :layer="layer" @get-data="initFunc" />
    </div>
</template>

<script setup lang="ts">
import type { ArticleType } from '~/types/article.types'
import type { GlobalDialogLayer } from '~/types/components.types'
import type { ElAffixType } from '~/types/global.types'
import type { NewsType } from '~/types/news.types'
import topBannerImg from '@/assets/images/home/page-banner.jpg'
import { appName } from '~/constants'

defineOptions({
    name: 'RouterArticleDetail',
})

updateAppConfig({
    menuActive: 'active',
})

const id = $(useRouteQuery<string>('id'))

const articleStore = useArticleStore()
const { detail } = storeToRefs(articleStore)

const articleDetail = computed(() => detail.value[id] || {} as NewsType)

const loading = ref(true)

await callOnce(`article-detail-${id}`, () => Promise.all([articleStore.getDetail(id)]), {
    mode: 'navigation',
})

loading.value = false

const navigation = ref<HTMLElement>()

async function initFunc() {
    loading.value = true
    await articleStore.getDetail(id)
    loading.value = false
    scrollToNav(navigation, -80)
}

watch(() => id, () => {
    initFunc()
})

useSaveScroll()

const affix = ref<ElAffixType>()
onActivated(() => {
    affix.value?.updateRoot()
})

useHead({
    title: `${articleDetail.value.title} - 新闻中心 - ${appName}`,
})

definePageMeta({
    key: `article-detail`,
    layout: 'default',
    // keepalive: true,
})

function nl2br(str: string) {
    return str.replace(/\n/g, '<br />')
}

// 弹窗控制器
const layer: GlobalDialogLayer<Nullable<ArticleType>> = reactive({
    show: false,
    title: '编辑文章',
    showButton: true,
    width: '800px',
    row: null,
    disabledBtn: false,
    loadingBtn: false,
    showCancel: true,
})

function handleModify() {
    layer.row = articleDetail.value
    layer.show = true
}
</script>
