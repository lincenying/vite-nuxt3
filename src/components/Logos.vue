<template>
    <div inline-flex cursor-default text-2xl font-300>
        <div flex flex-col children:mx-auto>
            <img inline-block h-18 w-18 src="/svg/nuxt.svg">
            <span class="p-24px" mt--2 text-green>Nuxt 3 Template</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
const model = defineModel<number>()

setTimeout(() => {
    model.value = 0
}, 3000)
</script>
