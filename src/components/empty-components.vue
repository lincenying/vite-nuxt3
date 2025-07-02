<template>
    <div>{{ title }}</div>
</template>

<script lang="ts" setup>
import { withDefaults } from 'unplugin-vue-macros/macros' assert { type: 'macro' }

defineOptions({
    name: 'EmptyComponents',
})

const { title } = withDefaults(definePropsRefs<{
    title?: string
}>(), {
    title: 'title',
})
</script>
