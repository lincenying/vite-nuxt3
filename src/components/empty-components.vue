<template>
    <div>{{ title }}</div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'EmptyComponents',
})

const { title } = definePropsRefs<{
    title?: string
}>()
</script>
