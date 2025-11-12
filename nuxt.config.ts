import processEnv from 'node:process'

import { viteCss as cssRem } from './nuxt.config.vite'
import { pwa } from './src/config/pwa'

import { appDescription } from './src/constants/index'
import { ifCssRem } from './src/design.config'

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
            '/php/**': {
                proxy: `${domain}/api/fetch/**`,
            },
        },
        // 开启本地文件K/V存储
        storage: {
            fsdb: {
                driver: 'fs',
                // 相对项目根目录
                base: './.data/fsdb',
            },
        },
        // 开启sqlite数据库存储
        experimental: {
            database: true,
        },
        database: {
        // 配置SQLite数据库
            default: {
                connector: 'sqlite',
                options: {
                // 相对项目根目录
                    path: './.data/db.sqlite',
                    name: 'db',
                },
            },
            sqlite3: {
                connector: 'better-sqlite3',
                options: {
                // 相对项目根目录
                    path: './.data/db.sqlite3',
                    name: 'db',
                },
            },
        },
    },

    app: {
        rootId: 'nuxt-root',
        head: {
            viewport: 'width=device-width,initial-scale=1',
            link: [
                { rel: 'icon', href: '/static/favicon.ico', sizes: 'any' },
                { rel: 'stylesheet', href: '/static/css/reset.css' },
                { rel: 'apple-touch-icon', href: '/static/images/apple-touch-icon.png' },
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
                },
            },
        },
        server: {
            hmr: {
                port: 57123,
            },
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: (id: string) => {
                        // 处理css分块
                        if (id.includes('__uno.css')) {
                            return 'unocss'
                        }
                        const chunks = ['element-plus', 'md-editor-v3', 'markdown-it', 'vue-pdf']
                        if (id.includes('/node_modules/')) {
                            for (const chunkName of chunks) {
                                if (id.includes(chunkName)) {
                                    return chunkName
                                }
                            }
                            console.log(id)
                        }
                    },
                },
            },
        },
        optimizeDeps: {
            include: [
                '@element-plus/icons-vue',
                '@lincy/async-validation',
                '@tato30/vue-pdf',
                'mitt',
                'store2',
            ],
        },
        ...(ifCssRem ? cssRem : {}),
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
