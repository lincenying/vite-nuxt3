import type { ListPayload } from '#shared/types'
import type { FaqsType } from '~/types/faqs.types'
import type { HttpAsyncData } from '~/types/http.types'
import type { FaqsState } from '~/types/pinia.types'

/** 获取常见问题列表 */
export function getFaqsList(payload: ListPayload) {
    return useHttp.$get<FaqsState['index']>('/api/faqs/getList', payload)
}

/** 获取常见问题详情 */
export function getFaqsDetail(id: string) {
    return useHttp.$get<FaqsType>('/api/faqs/detail', { id })
}

/** 获取常见问题推荐 */
export function getFaqsRecommend(): HttpAsyncData<FaqsType[]> {
    return useHttp.get<FaqsType[]>('/api/faqs/getRecommend', {})
}

/** 获取常见问题相关推荐 */
export function getFaqsRelatedRecom(params: Record<string, string | number>): HttpAsyncData<FaqsType[]> {
    return useHttp.get<FaqsType[]>('/api/faqs/relatedRecom', params)
}
