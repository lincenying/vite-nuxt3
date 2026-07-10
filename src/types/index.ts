export type { ArticleType } from './article.types'
export type { CasesType } from './cases.types'
export type { CommentType, CommentTypeEnum } from './comments.types'
export type { FaqsType } from './faqs.types'
export type { ApiConfig, ListType, LoadedType, RefOrComputedRef } from './global.types'
export type { ProductsType } from './home.types'
export type { HttpAsyncData } from './http.types'
export type { NewsType } from './news.types'

/** 演示文章类型 */
export interface Article {
    c_id: number
    c_title: string
    c_content: string
}

/** 演示文章列表响应 */
export interface ListsData {
    list: Article[]
    hasNext: boolean
}
