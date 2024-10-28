<template>
    <VitePwaManifest />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { appName } from '~/constants'

// import './assets/scss/global-rem.scss'
import './assets/scss/style.scss'

useHead({
    title: appName,
})
</script>
