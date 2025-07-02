import type { RefOrComputedRef } from '~/types/global'

export const routerKey = Symbol('routerKey') as InjectionKey<RefOrComputedRef<string>>
export const pageNameFuncKey = Symbol('pageNameFuncKey') as InjectionKey<AnyFn>
