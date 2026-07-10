/**
 * 统一 API 响应格式
 */
export interface ApiResponse<T = unknown> {
    code: number
    message: string
    data: T
    info?: string
}

/**
 * 列表页通用请求参数
 */
export interface ListPayload {
    page: number
    tag?: string
    category?: string
}

/**
 * 评论列表请求参数
 */
export interface CommentListPayload {
    page: number
    id: string | number
    type: string
}
