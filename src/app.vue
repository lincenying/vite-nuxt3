<template>
    <VitePwaManifest />
    <NuxtLoadingIndicator />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { appName } from '~/constants'

import './assets/icon-font/icon-font.css'
import './assets/scss/global/animate.min.css'
import './assets/scss/global/global.scss'
import './assets/scss/style.scss'

const productStore = useProductStore()
await callOnce('product-category', async () => {
    return Promise.all([
        productStore.getCtegory(),
    ])
})

useHead({
    title: appName,
})
</script>
