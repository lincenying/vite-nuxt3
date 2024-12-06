## Features

- 💚 [Nuxt 3](https://nuxt.com/) - SSR、ESR、基于文件的路由、组件自动导入、模块等。
- ⚡️ [Vite](https://cn.vitejs.dev/) - 即时 HMR.
- 🎨 [UnoCSS](https://github.com/unocss/unocss) - 即时按需原子 CSS 引擎
- 😃 使用纯 CSS 中任何图标集的图标，由 [UnoCSS](https://github.com/unocss/unocss) 驱动.
- 🔥 `<script setup lang="ts">` 语法.
- 🍍 [通过 Pinia 进行状态管理](https://github.com/vuejs/pinia), 详见 [./stores/use-index-store.ts](./stores/use-index-store.ts).
- 📑 [布局系统](/src/layouts).
- 📥 API 自动导入 - 用于 Composition API、VueUse 和自定义可组合项
- 🏎 零配置云功能和部署
- 🦾 当然是 TypeScript.
- 📲 [PWA](https://github.com/vite-pwa/nuxt) 具有离线支持和自动更新行为

## Rem 自适应

- 删除`uno.config.ts`, 将`uno.config.rem.ts`重命名为`uno.config.ts`
- 在`nuxt.config.ts`文件中, 删除`// import { viteCss as vite } from './nuxt.config.vite'` 和 `// ...vite,` 这两行的注释
- 在`src/app.vue`中引入`src/assets/scss/global-rem.scss` (注意, 从vite中引入的scss全局变量, 不能在style.scss中use, 而必须要在入口文件中import)
- 根据设计稿尺寸, 设置`src/design.config.ts`下相关参数
- 在 CSS 中按设计稿尺寸书写即可, 单位依然用`px`

## Plugins

### Nuxt Modules

- [VueUse](https://github.com/vueuse/vueuse) - 好用的组合 API 集合.
- [ElementPlus](https://github.com/element-plus/element-plus) - 基于 Vue 3，面向设计师和开发者的组件库.
- [ColorMode](https://github.com/nuxt-modules/color-mode) - Nuxt 可轻松实现具有自动检测功能的深色和浅色模式.
- [UnoCSS](https://github.com/unocss/unocss) - 即时按需原子 CSS 引擎.
- [Pinia](https://github.com/vuejs/pinia) - 直观、类型安全、轻便且灵活的 Vue 状态管理.
- [VueMacros](https://github.com/vue-macros/vue-macros) - 扩展更多的宏和语法糖.
- [VitePWA](https://github.com/vite-pwa/nuxt) - 适用于 Nuxt 3 的零配置 PWA 插件.
- [DevTools](https://github.com/nuxt/devtools) - 释放 Nuxt 开发者体验.

## IDE

建议使用 [VS Code](https://code.visualstudio.com/) 和 [Volar](https://github.com/vuejs/language-tools) 以获得最佳体验（您可能需要禁用 [Vetur](https://vuejs.github.io/vetur/) 如果你有的话）。

## Variations

- [vite-nuxt3](https://github.com/lincenying/vite-nuxt3) - Nuxt3 + Vite 入门模板
- [vite-uniapp-vue3](https://github.com/lincenying/vite-uniapp-vue3) - Uniapp3 + Vite 入门模板
- [vite-react-mobx-ssr](https://github.com/lincenying/vite-react-mobx-ssr) - React + Mobx + Vite + SSR 入门模板
- [vite-react-mobx](https://github.com/lincenying/vite-react-mobx) - React + Mobx + Vite 入门模板
- [vite-react-redux](https://github.com/lincenying/vite-react-redux) - React + Redux + Vite 入门模板
- [vite-vue3-h5-ssr](https://github.com/lincenying/vite-vue3-h5-ssr) - Vue3 + Vant + Vite + SSR 入门模板
- [vite-vue3-h5](https://github.com/lincenying/vite-vue3-h5) - Vue3 + Vant + Vite 入门模板
- [vite-vue3-admin](https://github.com/lincenying/vite-vue3-admin) - Vue3 + ElementPlus + Vite 管理后台入门模板

## Try it now!

### Online

https://codesandbox.io/p/github/lincenying/vite-nuxt3/main

### Clone to local

如果您更喜欢使用更干净的 git 历史记录手动执行此操作

```bash
npx degit lincenying/vite-nuxt3 my-nuxt3-app
cd my-nuxt3-app
pnpm i # 如果您没有安装 pnpm，请运行：npm install -g pnpm
```
