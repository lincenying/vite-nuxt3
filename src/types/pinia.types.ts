import type { ArticleType } from './article.types'
import type { CasesType } from './cases.types'
import type { FaqsType } from './faqs.types'
import type { CommentType } from '~/types/comments.types'
import type { ListType } from '~/types/global'
import type { ProductsType } from '~/types/home.types'
import type { NewsType } from '~/types/news.types'

export interface GlobalState {
    globalLoading: boolean
    routerLoading: boolean
    ISDEV: boolean
    ISPRE: boolean
    ISPROD: boolean
}

export interface ProductCategory {
    id: number
    title: string
}

export interface ProductState {
    index: ListType<ProductsType>
    category: ProductCategory[]
    detail: {
        [key: string]: NewsType
    }
}

export interface CasesState {
    index: ListType<CasesType>
    detail: {
        [key: string]: NewsType
    }
}

export interface NewsState {
    index: ListType<NewsType>
    detail: {
        [key: string]: NewsType
    }
}

export interface FaqsState {
    index: ListType<FaqsType>
    detail: {
        [key: string]: NewsType
    }
}

export interface ArticleState {
    index: ListType<ArticleType>
    detail: {
        [key: string]: ArticleType
    }
}

export interface UserState {
    token: string
    info: Objable
}

export interface CommentState {
    detail: {
        [key: string]: CommentType
    }
}
