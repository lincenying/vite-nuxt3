<template>
    <div mb-24px items-center cursor-default text-24px lh-32px font-300>
        <div flex flex-col children:mx-auto>
            <img inline-block h-72px w-72px src="/svg/nuxt.svg">
            <span class="p-24px" mt--8px text-green>Nuxt 3 Template</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
const model = defineModel<number>()

setTimeout(() => {
    model.value = 0
}, 3000)
</script>
