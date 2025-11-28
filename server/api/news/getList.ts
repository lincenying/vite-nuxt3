import type { ListPageType } from '../../types'
import Mock from 'mockjs'

export default defineEventHandler(async (event) => {
    let { page, pageSize } = getQuery<ListPageType>(event)
    page ||= 1
    pageSize ||= 12
    const template = {
        list: Array.from({ length: pageSize }, (_, index) => ({
            id: (page - 1) * pageSize + index + 1,
            title: '@ctitle(7, 20)',
            date: '@date("yyyy-MM-dd")',
            intro: '@cparagraph(10, 15)',
        })),
        hasPrev: page > 1 ? 1 : 0,
        hasNext: 1,
        total: 100,
        pageSize: Number(pageSize),
        currPage: Number(page),
    }
    const data = Mock.mock(template)
    return {
        code: 200,
        message: 'ok',
        data,
    }
})
