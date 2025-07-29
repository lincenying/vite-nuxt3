import process from 'node:process'

export default defineEventHandler(async (_event) => {
    return {
        code: 200,
        message: 'API is working',
        data: {
            timestamp: Date.now(),
            environment: process.env.NODE_ENV || 'development',
            version: process.env.npm_package_version || 'unknown',
            serverTime: new Date().toISOString(),
        },
    }
})
