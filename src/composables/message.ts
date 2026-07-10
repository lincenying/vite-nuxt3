import { ElMessage, ElMessageBox } from '~/config/element'

type MessageType = 'success' | 'warning' | 'info' | 'error'
type ConfigType = string | { content: string, type: MessageType }

/**
 * 显式提示信息
 * @example
 * ```
 * showMsg('content')
 * showMsg({ content: 'content'; type: 'success' | 'warning' | 'info' | 'error' })
 * ```
 */
export function showMsg(config: ConfigType) {
    let content, type: MessageType
    if (!config) {
        content = '接口返回数据错误'
        type = 'error'
    }
    else if (typeof config === 'string') {
        content = config
        type = 'error'
    }
    else {
        content = config.content
        type = config.type
    }
    ElMessage[type](content)
}

export function loginMsgBox(content: string) {
    ElMessageBox.alert(content, '提示', {
        confirmButtonText: '确定',
        showClose: false,
        callback: () => {
            window.location.href = `/login`
        },
    })
}

export function confirmMsg(content: string, callback: AnyFn) {
    ElMessageBox.confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showClose: false,
        buttonSize: 'small',
        callback: (btn: 'confirm' | 'close' | 'cancel') => {
            if (callback && callback instanceof Function) {
                btn === 'confirm' && callback()
            }
        },
    })
}

export function promptMsg(content: string, callback: AnyFn) {
    ElMessageBox.prompt(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '输入不能为空',
        type: 'warning',
        inputType: 'password',
        showClose: false,
        buttonSize: 'small',
    }).then(({ value }) => {
        if (callback && callback instanceof Function) {
            callback(value)
        }
    }).catch(() => { })
}
