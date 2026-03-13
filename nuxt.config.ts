import nitroConfig from './nuxt.config.nitro'
import { viteConfig } from './nuxt.config.vite'

import { app, pwa } from './src/config/pwa'

export default defineNuxtConfig({
    srcDir: 'src',

    modules: [
        '@element-plus/nuxt',
        '@nuxtjs/color-mode',
        '@pinia/nuxt',
        '@unocss/nuxt',
        '@vite-pwa/nuxt',
        '@vue-macros/nuxt',
        '@vueuse/nuxt',
        '@nuxt/image',
    ],

    elementPlus: { /** Options */ },

    experimental: {
        // 使用generate时，payload js资源包含在sw预缓存清单中
        // 但离线时丢失，禁用提取直到修复
        payloadExtraction: false,
        renderJsonPayloads: true,
        typedPages: true,

        // @ts-expect-error 缺失类型
        inlineSSRStyles: false,
    },

    css: [
    ],

    colorMode: {
        classSuffix: '',
    },

    nitro: nitroConfig,

    app,

    pwa,

    vite: viteConfig,

    devtools: {
        enabled: true,
    },

    devServer: {
        port: 7123,
    },

    imports: {
        // 自动导入的文件夹
        // dirs: [],
        // 仅导入 utils 中的 sleep 函数
        presets: [
            {
                from: '@lincy/utils',
                imports: ['sleep', 'UTC2Date'],
            },
        ],
    },
    hooks: {
        'prepare:types': ({ references }) => {
            references.push({ types: '@lincy/utils' })
        },
    },

    image: {
        presets: {
            cover: {
                modifiers: {
                    fit: 'cover',
                    format: 'jpg',
                    width: 300,
                    height: 200,
                },
            },
        },
    },

    compatibilityDate: '2025-07-05',
})
