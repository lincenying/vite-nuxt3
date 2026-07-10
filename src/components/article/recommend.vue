<template>
    <div class="global-box" w="full" bg="hex-fff" mb-24px b-rd-6px p-24px>
        <div class="global-box-title" m="0 b-24px" pl-16px text="14px hex-202935" font-bold b-l="6px bolid hex-007bff">新闻中心</div>
        <div class="global-box-content">
            <ul>
                <li v-for="(item, index) in newsRec" :key="index" mb-16px>
                    <NuxtLink :to="`/news/detail?id=${item.id}`" block>
                        <h3 line-2 text-14px lh-20px>{{ item.title }}</h3>
                        <time text="12px hex-8a8a8a">{{ item.date }}</time>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { NewsType } from '~/types/news.types'
import { getNewsRecommend } from '~/api/news'

defineOptions({
    name: 'NewsRecommend',
})

const newsRec = ref<NewsType[]>([])

const { data } = await getNewsRecommend()
if (data.value) {
    newsRec.value = data.value
}
</script>
