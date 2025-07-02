<template>
    <div class="banner-wrap" relative>
        <img :src="img" h-298px max-w-full alt="">
        <div class="banner-content" flex="~ col items-center" absolute top="1/2" left="1/2" un-translate="[-50%,-50%]">
            <h3 text="hex-fff 27px" tracking-2px>{{ title }}</h3>
            <p mt-16px text="hex-fff 15px" tracking-1px>{{ intro }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'TopBanner',
})

const { title, intro, img } = defineProps<{
    title: string
    intro: string
    img: string
}>()
</script>
