import type { ComputedRef } from 'vue'
import type { LocationQueryValue } from 'vue-router'

type RouteParams = Record<string, string | string[] | undefined>

export function useRouteParam<T = string>(name: string, init?: T): ComputedRef<T> {
    const route = useRoute()
    return computed(() => {
        const value = (route.params as RouteParams)[name]
        if (Array.isArray(value))
            return (value[0] ?? init) as T
        return (value ?? init) as T
    })
}

export function useRouteQuery<T = string>(name: string, init?: T): ComputedRef<T> {
    const route = useRoute()
    return computed(() => {
        const value = route.query[name] as LocationQueryValue | LocationQueryValue[] | undefined
        if (Array.isArray(value))
            return (value[0] ?? init) as T
        return (value ?? init) as T
    })
}
