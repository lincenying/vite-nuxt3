<template>
    <div class="global-box" w="full" mb-24px p-24px bg="hex-fff" b-rd-6px>
        <div class="global-box-title" m="0 b-24px" pl-16px text="14px hex-202935" font-bold b-l="6px bolid hex-007bff">产品展示</div>
        <div class="global-box-content">
            <ul class="cat-list">
                <li
                    v-for="(item, index) in category" :key="index"
                    pl-22px transition="all duration-.3s" hover="bg-hex-f3f5f7 b-rd-4px"
                    :class="{ 'cat-list-active': item.id === Number(categoryId) }"
                >
                    <router-link block text-14px lh-32px hover="text-hex-007bff" :to="`/?category=${item.id}`">{{ item.title }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'ProductCategory',
})

const props = defineProps<{
    categoryId: number | string | undefined
}>()
const { categoryId } = toRefs(props)

const productStore = useProductStore()
const { category } = storeToRefs(productStore)
</script>
