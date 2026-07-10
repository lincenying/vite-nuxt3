import type { MenuItemConstructorOptions } from 'electron'
import process from 'node:process'
import { app, BrowserWindow, Menu } from 'electron'

/** 获取当前聚焦窗口的 webContents */
function getFocusedWebContents() {
    return BrowserWindow.getFocusedWindow()?.webContents
}

/** 构建 macOS 应用菜单 */
function buildMacAppMenu(): MenuItemConstructorOptions {
    return {
        label: app.name,
        submenu: [
            { label: `关于 ${app.name}`, role: 'about' },
            { type: 'separator' },
            { label: '服务', role: 'services' },
            { type: 'separator' },
            { label: `隐藏 ${app.name}`, role: 'hide' },
            { label: '隐藏其他', role: 'hideOthers' },
            { label: '显示全部', role: 'unhide' },
            { type: 'separator' },
            { label: `退出 ${app.name}`, role: 'quit' },
        ],
    }
}

/** 构建文件菜单 */
function buildFileMenu(isMac: boolean): MenuItemConstructorOptions {
    const submenu: MenuItemConstructorOptions[] = []

    if (isMac) {
        submenu.push({
            label: '关闭窗口',
            accelerator: 'CmdOrCtrl+W',
            click: () => BrowserWindow.getFocusedWindow()?.close(),
        })
    }
    else {
        submenu.push({
            label: '退出',
            accelerator: 'CmdOrCtrl+Q',
            click: () => app.quit(),
        })
    }

    return { label: '文件', submenu }
}

/** 构建编辑菜单 */
function buildEditMenu(isMac: boolean): MenuItemConstructorOptions {
    return {
        label: '编辑',
        submenu: [
            {
                label: '撤销',
                accelerator: 'CmdOrCtrl+Z',
                click: () => getFocusedWebContents()?.undo(),
            },
            {
                label: '重做',
                accelerator: isMac ? 'Shift+CmdOrCtrl+Z' : 'CmdOrCtrl+Y',
                click: () => getFocusedWebContents()?.redo(),
            },
            { type: 'separator' },
            {
                label: '剪切',
                accelerator: 'CmdOrCtrl+X',
                click: () => getFocusedWebContents()?.cut(),
            },
            {
                label: '复制',
                accelerator: 'CmdOrCtrl+C',
                click: () => getFocusedWebContents()?.copy(),
            },
            {
                label: '粘贴',
                accelerator: 'CmdOrCtrl+V',
                click: () => getFocusedWebContents()?.paste(),
            },
            {
                label: '全选',
                accelerator: 'CmdOrCtrl+A',
                click: () => getFocusedWebContents()?.selectAll(),
            },
        ],
    }
}

/** 构建视图菜单 */
function buildViewMenu(isMac: boolean, isDev: boolean): MenuItemConstructorOptions {
    const submenu: MenuItemConstructorOptions[] = [
        {
            label: '重新加载',
            accelerator: 'CmdOrCtrl+R',
            click: () => getFocusedWebContents()?.reload(),
        },
        {
            label: '强制重新加载',
            accelerator: 'CmdOrCtrl+Shift+R',
            click: () => getFocusedWebContents()?.reloadIgnoringCache(),
        },
    ]

    if (isDev) {
        submenu.push({
            label: '开发者工具',
            accelerator: isMac ? 'Alt+CmdOrCtrl+I' : 'Ctrl+Shift+I',
            click: () => getFocusedWebContents()?.toggleDevTools(),
        })
    }

    submenu.push(
        { type: 'separator' },
        {
            label: '实际大小',
            accelerator: 'CmdOrCtrl+0',
            click: () => getFocusedWebContents()?.setZoomLevel(0),
        },
        {
            label: '放大',
            accelerator: 'CmdOrCtrl+Plus',
            click: () => {
                const contents = getFocusedWebContents()
                if (contents)
                    contents.setZoomLevel(contents.getZoomLevel() + 0.5)
            },
        },
        {
            label: '缩小',
            accelerator: 'CmdOrCtrl+-',
            click: () => {
                const contents = getFocusedWebContents()
                if (contents)
                    contents.setZoomLevel(contents.getZoomLevel() - 0.5)
            },
        },
        { type: 'separator' },
        {
            label: '全屏',
            accelerator: isMac ? 'Ctrl+CmdOrCtrl+F' : 'F11',
            click: () => BrowserWindow.getFocusedWindow()?.setFullScreen(
                !BrowserWindow.getFocusedWindow()?.isFullScreen(),
            ),
        },
    )

    return { label: '视图', submenu }
}

/** 构建窗口菜单 */
function buildWindowMenu(isMac: boolean): MenuItemConstructorOptions {
    const submenu: MenuItemConstructorOptions[] = [
        {
            label: '最小化',
            accelerator: 'CmdOrCtrl+M',
            click: () => BrowserWindow.getFocusedWindow()?.minimize(),
        },
        {
            label: '缩放',
            click: () => BrowserWindow.getFocusedWindow()?.maximize(),
        },
        { type: 'separator' },
    ]

    if (isMac) {
        submenu.push({ label: '全部置于顶层', role: 'front' })
    }
    else {
        submenu.push({
            label: '关闭',
            accelerator: 'CmdOrCtrl+W',
            click: () => BrowserWindow.getFocusedWindow()?.close(),
        })
    }

    return { label: '窗口', submenu }
}

/**
 * 设置应用顶部菜单栏（中文）
 */
export function setupAppMenu(isDev = false) {
    const isMac = process.platform === 'darwin'
    const template: MenuItemConstructorOptions[] = []

    if (isMac)
        template.push(buildMacAppMenu())

    template.push(
        buildFileMenu(isMac),
        buildEditMenu(isMac),
        buildViewMenu(isMac, isDev),
        buildWindowMenu(isMac),
    )

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}
