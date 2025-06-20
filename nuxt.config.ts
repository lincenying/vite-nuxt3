import processEnv from 'node:process'

// import { viteCss as vite } from './nuxt.config.vite'
import { pwa } from './src/config/pwa'

import { appDescription } from './src/constants/index'

const domain = processEnv.env.NUXT_ENV_HOST_API_URL || 'https://php.mmxiaowu.com'

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
        '@unocss/reset/tailwind-compat.css',
    ],

    colorMode: {
        classSuffix: '',
    },

    nitro: {
        esbuild: {
            options: {
                target: 'esnext',
            },
        },
        routeRules: {
            '/api/**': {
                proxy: `${domain}/api/fetch/**`,
            },
        },
    },

    app: {
        rootId: 'nuxt-root',
        head: {
            viewport: 'width=device-width,initial-scale=1',
            link: [
                { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
                { rel: 'icon', type: 'image/svg+xml', href: '/svg/nuxt.svg' },
                { rel: 'apple-touch-icon', href: '/images/apple-touch-icon.png' },
            ],
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: appDescription },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
            ],
        },
    },

    pwa,

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

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id: string) {
                        // 处理css分块
                        if (id.includes('node_modules')) {
                            return 'vendor'
                        }
                        if (id.includes('__uno.css')) {
                            return 'unocss'
                        }
                    },
                },
            },
        },
        // ...vite
    },
    hooks: {
        'prepare:types': ({ references }) => {
            references.push({ types: '@lincy/utils' })
        },
    },

    compatibilityDate: '2024-09-14',
})
