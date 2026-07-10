import type { Ref } from 'vue'
import type { ListPayload } from '#shared/types'
import type { ApiConfig, Article, ListsData } from '~/types'
import type { ArticleType } from '~/types/article.types'
import type { HttpAsyncData } from '~/types/http.types'
import type { ArticleState } from '~/types/pinia.types'

/** 获取 SQLite 文章列表 */
export function getArticleList(payload: ListPayload) {
    return useHttp.$get<ArticleState['index']>('/api/sqlite3/article/lists', payload)
}

/** 获取 SQLite 文章详情 */
export function getArticleDetail(id: string) {
    return useHttp.$get<ArticleType>('/api/sqlite3/article/detail', { id })
}

/** 获取文章推荐 */
export function getArticleRecommend(): HttpAsyncData<ArticleType[]> {
    return useHttp.get<ArticleType[]>('/api/sqlite3/article/relatedRecom', {})
}

/** 发布 SQLite 文章 */
export function postArticle(body: Record<string, unknown>) {
    return useHttp.$post<unknown>('/api/sqlite3/article/add', {}, { body })
}

/** 编辑 SQLite 文章 */
export function editArticle(body: Record<string, unknown>) {
    return useHttp.$post<unknown>('/api/sqlite3/article/edit', {}, { body })
}
