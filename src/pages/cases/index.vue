<template>
    <div v-loading="loading" class="global-wrap cases-wrap">
        <OtherTopBanner title="案例展示" intro="这是一段描述文字，可以自定义你想要的文字" :img="topBannerImg"></OtherTopBanner>
        <div ref="navigation" class="navigation" flex="~ justify-center items-center" h-42px bg-hex-fff>
            <div max-w-1294px flex-auto text-hex-8a8a8a lt-s1366="mx-24px">当前位置：<NuxtLink to="/">首页</NuxtLink> » 案例展示</div>
        </div>
        <div flex="~ justify-center" mt-24px lt-s1366="mx-24px">
            <div class="page-layout">
                <div class="page-sidebar">
                    <el-affix ref="affix" :offset="104">
                        <HomeRecommend></HomeRecommend>
                        <CasesRecommend></CasesRecommend>
                    </el-affix>
                </div>
                <div class="page-main">
                    <el-skeleton :loading="loading" animated :count="9">
                        <template #template>
                            <div flex="~ items-center" mb-24px p-24px bg="hex-fff">
                                <el-skeleton-item variant="image" class="!w-300px !h-200px mr-16px" />
                                <div flex="1">
                                    <el-skeleton-item variant="text" class="!w-1/2 !h-26px " />
                                    <el-skeleton-item variant="text" class="!w-80% !h-21px mt-16px" />
                                    <el-skeleton-item variant="text" class="!w-80% !h-21px" />
                                    <el-skeleton-item variant="text" class="!w-80% !h-21px" />
                                    <el-skeleton-item variant="text" class="!w-80% !h-21px" />
                                    <el-skeleton-item variant="text" class="!block !w-10% !h-21px mt-24px" />
                                </div>
                            </div>
                        </template>
                        <template #default>
                            <ul class="cases-ul">
                                <li
                                    v-for="(item, index) in casesLists.list" :key="index"
                                    class="cases-list-item"
                                    flex="~ wrap items-center" mb-24px overflow-hidden b-rd-6px p-24px bg="hex-fff"
                                >
                                    <NuxtLink class="cases-list-cover" flex-none mr-24px w-300px h-200px lt-s1280="w-200px"  overflow-hidden b-rd-4px :to="`/cases/detail?id=${item.id}`">
                                        <img
                                            :alt="item.title"
                                            :src="item.imgUrl"
                                            w="full" h="full" object-cover scale="100" transition="all duration-.3s"
                                        >
                                    </NuxtLink>
                                    <div w-1px flex-1>
                                        <NuxtLink :to="`/cases/detail?id=${item.id}`"><h2 line-1 text-18px>{{ item.title }}</h2></NuxtLink>
                                        <p text="hex-8a8a8a 14px" line-4 mt-16px lh-20px>
                                            {{ item.intro }}
                                        </p>
                                        <NuxtLink mt-24px block un-text="hex-007bff" :to="`/cases/detail?id=${item.id}`">了解更多 →</NuxtLink>
                                    </div>
                                </li>
                            </ul>
                            <div v-if="casesLists.total > pageSize" class="page" flex="~ justify-center" mb-24px>
                                <el-pagination background layout="prev, pager, next" :total="casesLists.total" :page-size="pageSize" @current-change="currentChange" />
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
import topBannerImg from '@/assets/images/home/page-banner.jpg'
import { appName } from '~/constants'

defineOptions({
    name: 'RouterCases',
})

updateAppConfig({
    menuActive: 'cases',
})

let page = $ref<number>(1)
const pageSize = $ref<number>(12)
const category = $(useRouteQuery<string | undefined>('category'))
const tag = $(useRouteQuery<string | undefined>('tag'))

const casesStore = useCasesStore()
const { index: casesLists } = storeToRefs(casesStore)

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
        casesStore.getIndex(payload.value),
    ])
})

loading.value = false

const navigation = ref<HTMLElement>()

watch(() => [category, tag], () => {
    page = 1
    casesStore.getIndex(payload.value)
    scrollToNav(navigation, -80)
})

async function currentChange(newPage: number) {
    page = newPage
    casesStore.getIndex(payload.value)
    scrollToNav(navigation, -80)
}

useSaveScroll()

const affix = ref<ElAffixType>()
onActivated(() => {
    affix.value?.updateRoot()
})

useHead({
    title: `案例展示 - ${appName}`,
})

definePageMeta({
    key: 'cases-index',
    layout: 'default',
    // keepalive: true,
})
</script>
