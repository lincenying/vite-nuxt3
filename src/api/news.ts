import type { ListPayload } from '#shared/types'
import type { HttpAsyncData } from '~/types/http.types'
import type { NewsType } from '~/types/news.types'
import type { NewsState } from '~/types/pinia.types'

/** 获取新闻列表 */
export function getNewsList(payload: ListPayload) {
    return useHttp.$get<NewsState['index']>('/api/news/getList', payload)
}

/** 获取新闻详情 */
export function getNewsDetail(id: string) {
    return useHttp.$get<NewsType>('/api/news/detail', { id })
}

/** 获取新闻推荐 */
export function getNewsRecommend(): HttpAsyncData<NewsType[]> {
    return useHttp.get<NewsType[]>('/api/news/getRecommend', {})
}

/** 获取新闻相关推荐 */
export function getNewsRelatedRecom(params: Record<string, string | number>): HttpAsyncData<NewsType[]> {
    return useHttp.get<NewsType[]>('/api/news/relatedRecom', params)
}
