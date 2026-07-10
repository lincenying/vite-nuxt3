<template>
    <main id="root" flex="~ col">
        <Header />
        <OtherErrorPage
            :status-code="statusCode"
            :message="errorMessage"
            :show-error-message="showErrorMessage"
            @home="handleGoHome"
            @back="handleGoBack"
            @retry="handleRetry"
        />
        <Footer />
    </main>
</template>

<script setup lang="ts">
import { appName } from '~/constants'

import 'md-editor-v3/lib/style.css'
import './assets/icon-font/icon-font.css'
import './assets/scss/global/animate.min.css'
import './assets/scss/global/global.scss'
import './assets/scss/style.scss'

const error = useError()
const router = useRouter()

const statusCode = computed(() => error.value?.statusCode ?? 500)
const errorMessage = computed(() => error.value?.message)
const showErrorMessage = computed(() => import.meta.dev && statusCode.value !== 404)

const pageTitle = computed(() => {
    return statusCode.value === 404
        ? `页面未找到 - ${appName}`
        : `服务器错误 - ${appName}`
})

useHead({
    title: pageTitle,
})

const productStore = useProductStore()
await callOnce('product-category', async () => {
    return productStore.getCtegory()
})

/** 清除错误并返回首页 */
function handleGoHome() {
    clearError({ redirect: '/' })
}

/** 清除错误并返回上一页 */
function handleGoBack() {
    if (import.meta.client && window.history.length > 1) {
        clearError()
        router.back()
        return
    }
    handleGoHome()
}

/** 清除错误并重新加载当前页 */
function handleRetry() {
    clearError()
}

</script>
