import type { ChildProcess } from 'node:child_process'
import { fork } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import { app, BrowserWindow, nativeImage } from 'electron'
import { setupAppMenu } from './app-menu'
import { setupContextMenu } from './context-menu'

/** 应用显示名称（开发/预览环境），需与 package.json build.productName 保持一致 */
const APP_NAME = 'Electron模板'
const APP_ICON_PATH = path.join(__dirname, '../build/icons/icon.png')
const appIcon = nativeImage.createFromPath(APP_ICON_PATH)

const devServerUrl = process.env.VITE_DEV_SERVER_URL
const isDev = !!devServerUrl
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

app.setName(APP_NAME)

const preload = path.join(__dirname, 'preload.js')

let childprocess: ChildProcess

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1480,
        height: 950,
        ...(appIcon.isEmpty() ? {} : { icon: appIcon }),
        webPreferences: {
            preload,
            nodeIntegration: true,
        },
    })

    mainWindow.setMinimumSize(1280, 880)

    if (!isDev) {
        process.env.PORT = '28256'
        process.env.HOST = '127.0.0.1'
        childprocess = fork(path.join(__dirname, '../.output/server/index.mjs'))
        childprocess.on('error', (err: any) => {
            console.log(err)
        })
        setTimeout(() => {
            mainWindow.loadURL(`http://${process.env.HOST}:${process.env.PORT}`)
        }, 1000)
    }
    if (isDev && devServerUrl) {
        mainWindow.loadURL(devServerUrl)
    }

    setupContextMenu(mainWindow, isDev)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    if (process.platform === 'darwin' && !appIcon.isEmpty())
        app.dock?.setIcon(appIcon)

    setupAppMenu(isDev)
    createWindow()
    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (childprocess)
        process.kill(childprocess.pid!)
    if (process.platform !== 'darwin')
        app.quit()
})
