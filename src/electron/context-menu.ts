import type { BrowserWindow, MenuItemConstructorOptions } from 'electron'
import { Menu } from 'electron'

/**
 * 为窗口注册右键上下文菜单
 */
export function setupContextMenu(win: BrowserWindow, isDev = false) {
    win.webContents.on('context-menu', (_event, params) => {
        const { navigationHistory } = win.webContents
        const template: MenuItemConstructorOptions[] = [
            {
                label: '返回',
                enabled: navigationHistory.canGoBack(),
                click: () => navigationHistory.goBack(),
            },
            {
                label: '前进',
                enabled: navigationHistory.canGoForward(),
                click: () => navigationHistory.goForward(),
            },
            { type: 'separator' },
            {
                label: '刷新',
                accelerator: 'CmdOrCtrl+R',
                click: () => win.webContents.reload(),
            },
            {
                label: '强制刷新',
                accelerator: 'CmdOrCtrl+Shift+R',
                click: () => win.webContents.reloadIgnoringCache(),
            },
            { type: 'separator' },
            {
                label: '剪切',
                role: 'cut',
                enabled: params.editFlags.canCut,
            },
            {
                label: '复制',
                role: 'copy',
                enabled: params.editFlags.canCopy,
            },
            {
                label: '粘贴',
                role: 'paste',
                enabled: params.editFlags.canPaste,
            },
            {
                label: '全选',
                role: 'selectAll',
                enabled: params.editFlags.canSelectAll,
            },
        ]

        if (isDev) {
            template.push(
                { type: 'separator' },
                {
                    label: '检查元素',
                    click: () => win.webContents.inspectElement(params.x, params.y),
                },
                {
                    label: '开发者工具',
                    accelerator: 'CmdOrCtrl+Option+I',
                    click: () => win.webContents.toggleDevTools(),
                },
            )
        }

        Menu.buildFromTemplate(template).popup({ window: win })
    })
}
