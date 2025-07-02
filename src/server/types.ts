export interface UserListType {
    id?: string
    name: string
    password?: string
    nickName: string
    role: string
    isAdmin: number | string
    status?: number | string
    token?: string
    info?: {
        name: string
    }
    loading?: boolean
}

export interface ListPageType {
    page: number
    pageSize: number
}

export interface InsertSucces {
    success: boolean
    lastInsertRowid: number
    changes: number
}

export interface User {
    id: string
    userid: string
    firstName: string
    lastName: string
    email: string
}

export interface Article {
    id: string
    title: string
    content: string
    date: string
    author: string
    category: string
    views: number
}

export interface QueryResult<T> {
    rows: T
    success: boolean
}
