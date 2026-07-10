<template>
    <div class="global-box" w="full" bg="hex-fff" mb-24px b-rd-6px p-24px>
        <div class="global-box-title" m="0 b-24px" pl-16px text="14px hex-202935" font-bold b-l="6px bolid hex-007bff">产品推荐</div>
        <div class="global-box-content">
            <ul flex="~ wrap justify-between" mt--16px>
                <li v-for="(item, index) in productRec" :key="index" mt-16px w-128px>
                    <NuxtLink :to="`/home/detail?id=${item.id}`" block>
                        <div relative mb-4px h-86px w-full overflow-hidden b-rd-4px>
                            <img
                                :src="item.imgUrl" :alt="item.title"
                                w-full transition="all duration-.3s" hover="scale-110"
                            >
                        </div>
                        <h3 text="14px" line-2 lh-20px>{{ item.title }}</h3>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ProductsType } from '~/types/home.types'
import { getHomeRecommend } from '~/api/home'

defineOptions({
    name: 'ProductRecommend',
})

const productRec = ref<ProductsType[]>([])

const { data } = await getHomeRecommend()
if (data.value) {
    productRec.value = data.value
}
</script>
