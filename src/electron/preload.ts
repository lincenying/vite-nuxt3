/* eslint-disable node/prefer-global/process */

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import os from 'node:os'
import { contextBridge } from 'electron'
import pinia from 'pinia/package.json'
import vue from 'vue/package.json'

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector: string, text: string) => {
        const element = document.getElementById(selector)
        if (element)
            element.textContent = text
    }

    for (const dependency of ['chrome', 'node', 'electron'])
        replaceText(`${dependency}-version`, process.versions[dependency] || '')
})

contextBridge.exposeInMainWorld('electron', {
    versions: {
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron,
        platform: os.platform(),
        vue: vue.version,
        pinia: pinia.version,
    },
})
