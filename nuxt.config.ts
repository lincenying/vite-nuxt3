import { pwa } from './src/config/pwa'
import { appDescription } from './src/constants/index'

export default defineNuxtConfig({
    srcDir: 'src',
    modules: [
        '@vueuse/nuxt',
        '@unocss/nuxt',
        '@pinia/nuxt',
        '@nuxtjs/color-mode',
        '@vite-pwa/nuxt',
        '@element-plus/nuxt',
        '@vue-macros/nuxt',
    ],

    elementPlus: { /** Options */ },

    experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
        payloadExtraction: false,
        inlineSSRStyles: false,
        renderJsonPayloads: true,
        typedPages: true,
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
        prerender: {
            crawlLinks: false,
            routes: ['/'],
            ignore: ['/article'],
        },
    },

    app: {
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

    nitro: {
        routeRules: {
            '/api/**': { proxy: 'https://php.mmxiaowu.com/api/fetch/**' },
        },
    },
})
