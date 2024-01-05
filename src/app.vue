<template>
    <VitePwaManifest />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { appName } from '~/constants'

import 'vue-loading-overlay/dist/css/index.css'
import './assets/scss/style.scss'

useHead({
    title: appName,
})
</script>
