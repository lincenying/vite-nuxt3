import type { CommentListPayload } from '#shared/types'
import type { CommentType } from '~/types/comments.types'

/** 获取评论列表 */
export function getCommentList(payload: CommentListPayload) {
    return useHttp.$get<CommentType>('/api/comment/getList', payload)
}

/** 发布评论 */
export function postComment(body: Record<string, unknown>) {
    return useHttp.$post<unknown>('/api/comment/post', {}, { body })
}
