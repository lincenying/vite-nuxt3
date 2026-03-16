import type { ViteConfig } from 'nuxt/schema'

import viewport from 'postcss-px-to-viewport-8-plugin'

import { charsetRemoval, designHeight, designMultiple, designWidth, fontSize, ifCssRem, minWidth, minWindow } from './src/design.config'

const cssRem: ViteConfig = {
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    $vmDesignWidth: ${designWidth};
                    $vmDesignHeight: ${designHeight};
                    $vmDesignMultiple: ${designMultiple};
                    $vmMinWidth: ${minWidth};
                    $vmMinWindow: ${minWindow};
                    $vmFontSize: ${fontSize};
                `,
                // 忽略scss global-builtin, import 提示3.0将删除的警告
                silenceDeprecations: ['global-builtin', 'import'],
            },
        },
        postcss: {
            plugins: [
            /**
             * 将 px 单位转换为视图单位(vw, vh, vmin, vmax)的 PostCSS 插件
             * @see https://github.com/lkxian888/postcss-px-to-viewport-8-plugin#readme
             */
                viewport({
                    unitToConvert: 'px', // 要转化的单位
                    viewportWidth: (file: string) => {
                    // 字号 * 100
                        let viewportWidth = fontSize * 100
                        if (file.includes('element-plus')) {
                            viewportWidth = fontSize * (1920 / designWidth * 100)
                        }

                        return viewportWidth
                    }, // UI设计稿的宽度
                    unitPrecision: 6, // 转换后的精度，即小数点位数
                    propList: ['*'], // 指定可以转换的css属性，*代表全部css属性
                    viewportUnit: 'rem', // 指定需要转换成的视窗单位，默认vw
                    fontViewportUnit: 'rem', // 指定字体需要转换成的视窗单位，默认vw
                    selectorBlackList: ['svg-text'], // 指定不转换为视窗单位的类名
                    minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
                    mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
                    replace: true, // 是否转换后直接更换属性值
                    // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
                    landscape: false, // 是否处理横屏情况
                }),
                charsetRemoval(),
            ],
        },
    },
}

export const viteConfig: ViteConfig = {
    server: {
        hmr: {
            port: 57123,
        },
    },
    build: {
        target: 'es2018',
        minify: 'terser',
        cssCodeSplit: true,
        cssTarget: 'chrome79',
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
            '@element-plus/icons-vue',
            '@lincy/async-validation',
            '@tato30/vue-pdf',
            'mitt',
            'store2', // CJS
            'dayjs', // CJS
            'dayjs/plugin/*.js',
            'lodash-unified',
            '@vue/devtools-core',
            '@vue/devtools-kit',
            '@lincy/utils',
            'md5', // CJS
            'markdown-it-link-attributes', // CJS
            'md-editor-v3',
        ],
    },
    css: {
        preprocessorOptions: {
            scss: {
            },
        },
    },
    ...(ifCssRem ? cssRem : {}),
}
