import type { ListPayload } from '#shared/types'
import type { ProductsType } from '~/types/home.types'
import type { HttpAsyncData } from '~/types/http.types'
import type { NewsType } from '~/types/news.types'
import type { ProductCategory, ProductState } from '~/types/pinia.types'

/** 获取首页产品列表 */
export function getHomeList(payload: ListPayload) {
    return useHttp.$get<ProductState['index']>('/api/home/getList', payload)
}

/** 获取产品分类 */
export function getHomeCategory() {
    return useHttp.$get<ProductState['category']>('/api/home/getCategory', {})
}

/** 获取首页推荐产品 */
export function getHomeRecommend(): HttpAsyncData<ProductsType[]> {
    return useHttp.get<ProductsType[]>('/api/home/getRecommend', {})
}

/** 获取相关推荐 */
export function getHomeRelatedRecom(params: Record<string, string | number>): HttpAsyncData<ProductsType[]> {
    return useHttp.get<ProductsType[]>('/api/home/relatedRecom', params)
}

/** 获取产品详情 */
export function getHomeDetail(id: string) {
    return useHttp.$get<NewsType>('/api/home/detail', { id })
}
