export interface AnyArray {
    [index: number]: any
}

export type Fn = (...args: any[]) => void

/**
 * 请求参数合集
 * ```
 * {
        all?: number
        by?: string | string[]
        from?: string
        id?: string | string[]
        limit?: number
        page?: number
        path?: string
        key?: string | string[]
    }
 * ```
 */
export interface ApiConfig {
    all?: number
    by?: string | string[]
    from?: string
    id?: string | string[]
    limit?: number
    page?: number
    pathname?: string
    key?: string | string[]
}

/**
 * 文章详情
 */
export interface Article {
    c_id: string
    c_title: string
    c_content: string
    c_posttime?: string
}

/**
 * 分类
 */
export interface Category {
    _id: string
    cate_name: string
    cate_order: string
    cate_num?: number
    creat_date?: string
    update_date?: string
    is_delete?: number
    timestamp?: number
}

/**
 * 评论
 */
export interface Comment {
    _id: string
    article_id: string
    userid: Record<string, any>
    content: string
    creat_date: string
    is_delete: number
    timestamp: number
    email?: string
    username?: string
}

/**
 * 用户
 */
export interface User {
    _id: string
    username: string
    email: string
    password: string
    creat_date: string
    update_date: string
    is_delete: number
    timestamp: number
    wx_avatar?: string
    wx_signature?: string
    userid?: Record<string, any>
}

export interface ArticleItemConfig {
    data: Nullable<Article>
    path?: string
    [propName: string]: any
}

export interface ListConfig {
    hasNext?: number
    hasPrev?: number
    path?: string
    page: number
    [propName: string]: any
}

export interface AdminStoreList extends ListConfig {
    data: User[]
}

export interface AdminStoreItem {
    data: Nullable<User>
    path?: string
    [propName: string]: any
}

export interface AdminStore {
    lists: AdminStoreList
    item: {
        data: Nullable<User>
        path?: string
        [propName: string]: any
    }
}

export interface ArticleStoreList extends ListConfig {
    data: Article[]
}

export interface ArticleStore {
    lists: ArticleStoreList
    item: {
        data: Nullable<Article>
        path?: string
        [propName: string]: any
    }
}

export interface FArticleStore {
    lists: ArticleStoreList
    item: {
        data: Nullable<Article>
        path?: string
        [propName: string]: any
    }
    trending: Article[]
}

interface UserStoreList extends ListConfig {
    data: User[]
}

export interface UserStoreItem {
    data: Nullable<User>
    path?: string
    [propName: string]: any
}

export interface UserStore {
    lists: UserStoreList
    item: {
        data: Nullable<User>
        path?: string
        [propName: string]: any
    }
}

export interface CategoryStore {
    lists: Category[]
    item: {
        data: Nullable<Category>
    }
}

export interface CommentStoreList extends ListConfig {
    data: Comment[]
}
export interface CommentStore {
    lists: CommentStoreList
}

export interface UserCookies {
    user?: string
    userid?: string
    username?: string
    useremail?: string
    [propName: string]: any
}

export interface Data {
    list: Article[]
    total: number
    page: number
    perPage: number
    totalPage: number
    hasNext: boolean
    hasPrev: boolean
}

export interface ArticleLists {
    code: number
    data: Data
}

export interface ArticleDetail {
    code: number
    data: Article
}
