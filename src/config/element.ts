import type { App } from 'vue'

import {
    ElLoading as _ElLoading,
    ElMessage as _ElMessage,
    ElMessageBox as _ElMessageBox,
    ElNotification as _ElNotification,
} from 'element-plus'
import NProgress from '~/utils/nprogress'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'

function install(app: App) {
    app.use(_ElLoading)
    app.use(_ElMessageBox)
    app.use(_ElMessage)
    app.use(_ElNotification)
    return app
}

emitter.on('need-login', () => {
    emitter.emit('cancel-interval')
    _ElMessageBox.close()
    loginMsgBox('登录过期，请重新登录')
})

emitter.on('api-error', (msg) => {
    _ElMessageBox.close()
    _ElMessage.error(msg || '请求错误')
})

let pendingRequests = 0
let doneTimer: NodeJS.Timeout | null = null

emitter.on('nprogress-start', () => {
    if (pendingRequests === 0) {
        if (!NProgress.isStarted()) {
            NProgress.start()
        }
        // 如果有待执行的关闭定时器，取消它
        if (doneTimer) {
            clearTimeout(doneTimer)
            doneTimer = null
        }
    }
    pendingRequests++
})

emitter.on('nprogress-done', () => {
    pendingRequests--
    if (pendingRequests <= 0) {
        // 延迟关闭，给可能的后续请求（如路由切换后的数据请求）一个机会
        if (doneTimer)
            clearTimeout(doneTimer)
        doneTimer = setTimeout(() => {
            NProgress.done()
            doneTimer = null
        }, 300) // 延迟时间可根据实际场景调整（例如 50~200ms）
    }
})

export const ElLoading = _ElLoading
export const ElMessage = _ElMessage
export const ElMessageBox = _ElMessageBox
export const ElNotification = _ElNotification

export default install
