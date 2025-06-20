/**
 * element-plus弹窗
 * @param config 弹窗数据
 * @example
 * ```
 * showMsg('content')
 * showMsg({ type: 'success' | 'warning' | 'info' | 'error', content: 'content'})
 * ```
 */
export function showMsg(config: Objable | string) {
    let content, type: 'success' | 'warning' | 'info' | 'error'
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

/** 将换行符替换为 \<br\> */
export function nl2br(str: string) {
    if (!str)
        return ''
    return str.replace(/\n/g, '<br>')
}

/** 将cookies中的Path替换成'/' */
export function normalizeCookiePath(cookieStr: string): string {
    // 拆分 Cookie 字符串为键值对数组
    const parts = cookieStr.split('; ')
    if (parts.length === 0)
        return cookieStr

    // 存储处理后的部分
    const processedParts: string[] = []
    // 标记是否找到 Path 属性
    let foundPath = false

    // 处理第一个键值对（Cookie 名称和值）
    processedParts.push(parts[0])

    // 遍历剩余属性
    for (let i = 1; i < parts.length; i++) {
        const part = parts[i]
        // 查找等号位置以分离键值
        const eqIndex = part.indexOf('=')

        if (eqIndex === -1) {
            // 无等号部分（如 HttpOnly）直接保留
            processedParts.push(part)
        }
        else {
            // 提取属性名（key）和值（value）
            const key = part.substring(0, eqIndex).trim()
            const _value = part.substring(eqIndex + 1).trim()

            // 检测 Path 属性（不区分大小写）
            if (key.toLowerCase() === 'path') {
                // 标记找到 Path，并替换为根路径
                foundPath = true
                processedParts.push('Path=/')
            }
            else {
                // 非 Path 属性原样保留
                processedParts.push(part)
            }
        }
    }

    // 未找到 Path 时自动添加
    if (!foundPath) {
        processedParts.push('Path=/')
    }

    // 重新组合为 Cookie 字符串
    return processedParts.join('; ')
}
