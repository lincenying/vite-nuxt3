<template>
    <div class="global-box" w="full" mb-24px p-24px bg="hex-fff" b-rd-6px>
        <div class="global-box-title" m="0 b-24px" pl-16px text="14px hex-202935" font-bold b-l="6px bolid hex-007bff">相关推荐</div>
        <div class="global-box-content">
            <ul flex="~ wrap justify-between" mb--24px>
                <template v-if="column === 'products'">
                    <li v-for="(item, index) in productsRelatedRecom" :key="index" w="[calc((100%-24px)/2)]" mb-24px>
                        <router-link relative flex="~ items-center" :to="`/home/detail?id=${item.id}`">
                            <i class="i-carbon-dot-mark" mr-5px></i>
                            <h3 text="14px" line-1>{{ item.title }}</h3>
                        </router-link>
                    </li>
                </template>
                <template v-if="column === 'cases'">
                    <li v-for="(item, index) in casesRelatedRecom" :key="index" w="[calc((100%-24px)/2)]" mb-24px>
                        <router-link relative flex="~ items-center" :to="`/cases/detail?id=${item.id}`">
                            <i class="i-carbon-dot-mark" mr-5px></i>
                            <h3 text="14px" line-1>{{ item.title }}</h3>
                        </router-link>
                    </li>
                </template>
                <template v-if="column === 'news'">
                    <li v-for="(item, index) in newsRelatedRecom" :key="index" w="[calc((100%-24px)/2)]" mb-24px>
                        <router-link relative flex="~ items-center" :to="`/news/detail?id=${item.id}`">
                            <i class="i-carbon-dot-mark" mr-5px></i>
                            <h3 text="14px" line-1>{{ item.title }}</h3>
                        </router-link>
                    </li>
                </template>
                <template v-if="column === 'faqs'">
                    <li v-for="(item, index) in faqsRelatedRecom" :key="index" w="[calc((100%-24px)/2)]" mb-24px>
                        <router-link relative flex="~ items-center" :to="`/faqs/detail?id=${item.id}`">
                            <i class="i-carbon-dot-mark" mr-5px></i>
                            <h3 text="14px" line-1>{{ item.title }}</h3>
                        </router-link>
                    </li>
                </template>
                <template v-if="column === 'article'">
                    <li v-for="(item, index) in articleRelatedRecom" :key="index" w="[calc((100%-24px)/2)]" mb-24px>
                        <router-link relative flex="~ items-center" :to="`/article/detail?id=${item.id}`">
                            <i class="i-carbon-dot-mark" mr-5px></i>
                            <h3 text="14px" line-1>{{ item.title }}</h3>
                        </router-link>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ArticleType } from '~/types/article.types'
import type { CasesType } from '~/types/cases.types'
import type { FaqsType } from '~/types/faqs.types'
import type { ProductsType } from '~/types/home.types'
import type { NewsType } from '~/types/news.types'

defineOptions({
    name: 'RelatedRecom',
})

const { column, categoryId } = defineProps<{
    column: string
    categoryId?: number
}>()

const productsRelatedRecom = ref<ProductsType[]>([])
const casesRelatedRecom = ref<CasesType[]>([])
const newsRelatedRecom = ref<NewsType[]>([])
const faqsRelatedRecom = ref<FaqsType[]>([])
const articleRelatedRecom = ref<ArticleType[]>([])

async function getProductsRelatedRecom() {
    const { data } = await useHttp.get<ProductsType[]>(() => `/api/home/relatedRecom?categoryId=${categoryId}`, { })
    if (data.value) {
        productsRelatedRecom.value = data.value
    }
}
async function getCasesRelatedRecom() {
    const { data } = await useHttp.get<CasesType[]>(() => '/api/cases/relatedRecom', { })
    if (data.value) {
        casesRelatedRecom.value = data.value
    }
}
async function getNewsRelatedRecom() {
    const { data } = await useHttp.get<NewsType[]>(() => '/api/news/relatedRecom', { })
    if (data.value) {
        newsRelatedRecom.value = data.value
    }
}
async function getFaqsRelatedRecom() {
    const { data } = await useHttp.get<FaqsType[]>(() => '/api/faqs/relatedRecom', { })
    if (data.value) {
        faqsRelatedRecom.value = data.value
    }
}
async function getArticleRelatedRecom() {
    const { data } = await useHttp.get<ArticleType[]>(() => '/api/sqlite3/article/relatedRecom', { })
    if (data.value) {
        articleRelatedRecom.value = data.value
    }
}

if (column === 'products') {
    await getProductsRelatedRecom()
}
else if (column === 'cases') {
    await getCasesRelatedRecom()
}
else if (column === 'news') {
    await getNewsRelatedRecom()
}
else if (column === 'faqs') {
    await getFaqsRelatedRecom()
}
else if (column === 'article') {
    await getArticleRelatedRecom()
}
</script>
