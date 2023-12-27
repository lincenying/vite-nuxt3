import type { ComputedRef } from 'vue'

export function useRouteParam<T = string>(name: string, init?: T): ComputedRef<T> {
    const route = useRoute()
    const params = route.params as any
    return computed(() => params[name] ?? init)
}

export function useRouteQuery<T = string>(name: string, init?: T): ComputedRef<T> {
    const route = useRoute()
    return computed(() => route.query[name] as any ?? init)
}
