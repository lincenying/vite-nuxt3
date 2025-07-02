/**
 * init-data: 初始化时
 * change-data: 监听时
 * change-page: 切换页码时
 */
export type InitType = 'init-data' | 'change-data' | 'change-page'

export interface ProductsType {
    id: string
    imgUrl: string
    title: string
    date: string
    category: string
    category_id: number
    tag: string[]
}
