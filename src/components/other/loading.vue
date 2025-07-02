<template>
    <div v-loading="loading" class="body"></div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'Loading',
})

const loading = ref(true)
</script>
