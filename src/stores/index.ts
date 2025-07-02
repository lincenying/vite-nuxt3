import type { App } from 'vue'
import { createPinia } from 'pinia'

export const piniaInit = createPinia()

export function setupPinia(app: App<Element>) {
    return app.use(piniaInit)
}
