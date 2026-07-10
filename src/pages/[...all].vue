<template>
    <OtherErrorPage
        :status-code="404"
        @home="handleGoHome"
        @back="handleGoBack"
        @retry="handleRetry"
    />
</template>

<script setup lang="ts">
import { appName } from '@/constants'

definePageMeta({
    layout: 'default',
})

useHead({
    title: `页面未找到 - ${appName}`,
})

const router = useRouter()

/** 返回首页 */
function handleGoHome() {
    router.push('/')
}

/** 返回上一页 */
function handleGoBack() {
    if (import.meta.client && window.history.length > 1)
        router.back()
    else
        handleGoHome()
}

/** 刷新当前页 */
function handleRetry() {
    if (import.meta.client)
        window.location.reload()
}

</script>
