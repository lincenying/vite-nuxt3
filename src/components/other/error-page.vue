<template>
    <div class="global-wrap error-wrap">
        <OtherTopBanner
            :title="pageInfo.bannerTitle"
            :intro="pageInfo.bannerIntro"
            :img="topBannerImg"
        />
        <div class="navigation" flex="~ justify-center items-center" h-42px bg-hex-fff>
            <div max-w-1294px flex-auto text-hex-8a8a8a lt-s1366="mx-24px">
                当前位置：<NuxtLink to="/">首页</NuxtLink> » {{ pageInfo.breadcrumb }}
            </div>
        </div>
        <div flex="~ justify-center" mt-24px pb-80px lt-s1366="mx-24px">
            <div
                class="error-panel"
                max-w-1294px w-full b-rd-6px bg-hex-fff p="y-72px x-40px" text-center
            >
                <div class="error-code" text="hex-0d6efd 120px" lh-120px op-90>
                    {{ statusCode }}
                </div>
                <div mt-16px h-2px w-10px bg-hex-0d6efd mx-auto />
                <h1 mt-24px text="hex-202935 24px" font-700 tracking-1px>
                    {{ pageInfo.title }}
                </h1>
                <p mt-16px mx-auto max-w-480px text="hex-8a8a8a 15px" lh-24px>
                    {{ pageInfo.description }}
                </p>
                <p
                    v-if="showErrorMessage && message"
                    mt-12px mx-auto max-w-480px text="hex-8a8a8a 13px" lh-20px op-70
                >
                    {{ message }}
                </p>
                <div mt-40px flex="~ justify-center wrap gap-16px">
                    <el-button type="primary" size="large" @click="emit('home')">
                        返回首页
                    </el-button>
                    <el-button size="large" @click="emit('back')">
                        返回上页
                    </el-button>
                    <el-button v-if="statusCode !== 404" size="large" @click="emit('retry')">
                        重新加载
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import topBannerImg from '@/assets/images/home/page-banner.jpg'

defineOptions({
    name: 'ErrorPage',
})

const { statusCode, message, showErrorMessage = false } = defineProps<{
    statusCode: number
    message?: string
    /** 是否展示错误详情（开发环境 500 可用） */
    showErrorMessage?: boolean
}>()

const emit = defineEmits<{
    home: []
    back: []
    retry: []
}>()

/** 根据状态码返回页面文案 */
const pageInfo = computed(() => {
    if (statusCode === 404) {
        return {
            bannerTitle: '404',
            bannerIntro: '您访问的页面不存在',
            breadcrumb: '页面未找到',
            title: '页面未找到',
            description: '抱歉，您访问的页面不存在，可能已被删除、更名，或地址输入有误。',
        }
    }

    return {
        bannerTitle: '500',
        bannerIntro: '服务器遇到了一些问题',
        breadcrumb: '服务器错误',
        title: '服务器错误',
        description: '抱歉，服务器暂时无法处理您的请求，请稍后重试或返回首页继续浏览。',
    }
})
</script>
