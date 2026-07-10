import type { ListPayload } from '#shared/types'
import type { CasesType } from '~/types/cases.types'
import type { HttpAsyncData } from '~/types/http.types'
import type { NewsType } from '~/types/news.types'
import type { CasesState } from '~/types/pinia.types'

/** 获取案例列表 */
export function getCasesList(payload: ListPayload) {
    return useHttp.$get<CasesState['index']>('/api/cases/getList', payload)
}

/** 获取案例详情（复用新闻详情接口） */
export function getCasesDetail(id: string) {
    return useHttp.$get<NewsType>('/api/cases/detail', { id })
}

/** 获取案例推荐 */
export function getCasesRecommend(): HttpAsyncData<CasesType[]> {
    return useHttp.get<CasesType[]>('/api/cases/getRecommend', {})
}

/** 获取案例相关推荐 */
export function getCasesRelatedRecom(params: Record<string, string | number>): HttpAsyncData<CasesType[]> {
    return useHttp.get<CasesType[]>('/api/cases/relatedRecom', params)
}
