<template>
    <main p="x4 y10" text="center teal-700 dark:gray-200">
        <div text-4xl>
            <div i-carbon-warning inline-block />
        </div>
        <div>Not found</div>
        <div>
            <button text-sm btn m="3 t8" @click="router.back()">Back</button>
        </div>
    </main>
</template>

<script setup lang="ts">
import { appName } from '@/constants'

const router = useRouter()

useHead({
    title: `Not found - ${appName}`,
})
</script>
