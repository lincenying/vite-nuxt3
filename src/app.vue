<template>
    <VitePwaManifest />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { appName } from '~/constants'

useHead({
    title: appName,
})
</script>

<style>
html,
body,
#__nuxt {
    min-height: 100vh;
    margin: 0;
    padding: 0;
}

html.dark {
    background: #222;
    color: white;
}

body {
    overflow-y: scroll;
}
</style>
