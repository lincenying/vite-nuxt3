<template>
    <div class="global-wrap">
        <OtherTopBanner title="Markdown编辑器" intro="这是一段描述文字，可以自定义你想要的文字" :img="topBannerImg"></OtherTopBanner>
        <div class="navigation" flex="~ justify-center items-center" h-42px bg-hex-fff>
            <div max-w-1294px flex-auto text-hex-8a8a8a lt-s1366="mx-24px">当前位置：<NuxtLink to="/">首页</NuxtLink> » 编辑器</div>
        </div>
        <div flex="~ justify-center" my-24px lt-s1366="mx-24px">
            <ClientOnly>
                <div class="editor-container" flex="~ justify-between col">
                    <h5 hex-202935 mb-16px text-16px>Markdown编辑器</h5>
                    <div class="editor-workspace" h-700px>
                        <MdEditor v-model="text" @on-upload-img="onUploadImg" />
                    </div>
                    <h5 hex-202935 mb-16px mt-24px text-16px>Markdown内容预览</h5>
                    <div class="editor-preview-layout" flex="~ justify-between" bg-hex-fff rounded="10px">
                        <div class="editor-preview-main" w-1px flex-auto p-20px b-r="1px solid hex-ccc">
                            <MdPreview :id="id" :model-value="text" />
                        </div>
                        <div class="editor-preview-catalog" w-200px flex-none>
                            <MdCatalog :editor-id="id" :scroll-element="scrollElement" />
                        </div>
                    </div>
                </div>
            </ClientOnly>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MdCatalog, MdEditor, MdPreview } from 'md-editor-v3'
import topBannerImg from '@/assets/images/home/page-banner.jpg'
import { uploadFile } from '~/api/upload'

defineOptions({
    name: 'RouterEditor',
})

updateAppConfig({
    menuActive: 'editor',
})

useHead({
    title: 'MMF小屋-编辑器',
})

const scrollElement = ref<HTMLElement | undefined>(undefined)
const id = 'preview-only'
const text = ref(`# 标题1
Hello Editor!

# 标题2
Hello Editor!
`)

onMounted(() => {
    scrollElement.value = document.documentElement
})

async function onUploadImg(files: File[], callback: AnyFn) {
    const res = await Promise.all(
        files.map(async (file) => {
            const form = new FormData()
            form.append('file', file)
            form.append('type', 'markdown')
            const data = await uploadFile(form).catch(() => {
                ElMessage.error('上传图片失败，请稍后再试')
                return null
            })
            if (!data) {
                ElMessage.error('上传图片失败，请稍后再试')
                return ''
            }
            return data.url
        }),
    )

    callback(res)
}

useSaveScroll()
</script>
