<template>
    <div class="global-wrap pdf-wrap">
        <OtherTopBanner title="Markdown编辑器" intro="这是一段描述文字，可以自定义你想要的文字" :img="topBannerImg"></OtherTopBanner>
        <div class="navigation" flex="~ justify-center items-center" h-42px bg-hex-fff>
            <div flex-auto max-w-1294px text-hex-8a8a8a lt-m1360="mx-24px">当前位置：<router-link to="/">首页</router-link> » 编辑器</div>
        </div>
        <div flex="~ justify-center" my-24px lt-m1360="mx-24px">
            <div w-1294px flex="~ justify-between col">
                <global-client-only>
                    <h5 text-16px hex-202935 mb-16px>Markdown编辑器</h5>
                    <div h-700px>
                        <MdEditor
                            v-model="text" :toolbars-exclude="['github', 'mermaid', 'katex']" theme="light" code-theme="atom"
                            @on-upload-img="onUploadImg" @on-html-changed="onHtmlChanged" @on-get-catalog="onGetCatalog"
                        />
                    </div>
                    <h5 text-16px hex-202935 mt-24px mb-16px>Markdown内容预览</h5>
                    <div flex="~ justify-between" bg-hex-fff rounded="10px">
                        <div flex-auto w-1px p-20px b-r="1px solid hex-ccc">
                            <MdPreview :id="id" :model-value="text" code-theme="atom" />
                        </div>
                        <div w-200px flex-none>
                            <MdCatalog :editor-id="id" :scroll-element="scrollElement" />
                        </div>
                    </div>
                </global-client-only>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import LinkAttr from 'markdown-it-link-attributes'
import { config, MdCatalog, MdEditor, MdPreview } from 'md-editor-v3'
import topBannerImg from '@/assets/images/home/page-banner.jpg'

defineOptions({
    name: 'RouterEditor',
})

updateAppConfig({
    menuActive: 'editor',
})

useHead({
    title: 'MMF小屋-编辑器',
})

config({
    markdownItPlugins(plugins) {
        return [
            ...plugins,
            {
                type: 'linkAttr',
                plugin: LinkAttr,
                options: {
                    matcher(href: string) {
                        // 如果使用了markdown-it-anchor
                        // 应该忽略标题头部的锚点链接
                        return !href.startsWith('#')
                    },
                    attrs: {
                        target: '_blank',
                    },
                },
            },
            // {
            //   type: 'anchor',
            //   plugin: Anchor,
            //   options: {
            //     permalink: Anchor.permalink.headerLink(),
            //     slugify(s: string) {
            //       return s;
            //     }
            //   }
            // }
        ]
    },
})

const scrollElement = ref<HTMLElement | undefined>(undefined)
const id = 'preview-only'
const text = ref(`# 标题1
Hello Editor!

# 标题2
Hello Editor!
`)

const html = ref('')

function onHtmlChanged(payload: string) {
    html.value = payload
}

function onGetCatalog(payload: string[]) {
    console.log(payload)
}

onMounted(() => {
    scrollElement.value = document.documentElement
})

async function onUploadImg(files: File[], callback: AnyFn) {
    const res = await Promise.all(
        files.map(async (file) => {
            const form = new FormData()
            form.append('file', file)
            form.append('type', 'markdown')
            const data = await useHttp.$post<{ url: string }>('/api/upload', {}, {
                body: form,
            }).catch(() => {
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
