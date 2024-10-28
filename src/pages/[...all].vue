<template>
    <main p="x16px y40px" text="center teal-700 dark:gray-200">
        <div text-36px lh-40px>
            <div i-carbon-warning inline-block />
        </div>
        <div>Not found</div>
        <div>
            <button text-14px lh-20px btn m="12px t32px" @click="router.back()">Back</button>
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
