import type { NuxtConfig } from 'nuxt/schema'

import processEnv from 'node:process'

const domain = processEnv.env.NUXT_HOST_API_URL || 'https://php.mmxiaowu.com'

const nitroConfig: NuxtConfig['nitro'] = {
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
}

export default nitroConfig
