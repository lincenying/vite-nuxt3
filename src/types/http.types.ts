import type { AsyncData, NuxtError } from 'nuxt/app'

/** useFetch 封装统一返回类型 */
export type HttpAsyncData<T> = AsyncData<T | null, NuxtError | null>
