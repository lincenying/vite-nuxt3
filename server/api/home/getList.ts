import type { ListPageType } from '~~/server/types'
import Mock from 'mockjs'

export default defineEventHandler(async (event) => {
    let { page, pageSize } = getQuery<ListPageType>(event)
    page = page || 1
    pageSize = pageSize || 12
    const template = {
        list: Array.from({ length: pageSize }, (_, index) => ({
            id: (page - 1) * pageSize + index + 1,
            category: (page - 1) * pageSize + index + 1,
            imgUrl: getRandomValue(imgUrl),
            title: '@ctitle(7, 20)',
            date: '@date("yyyy-MM-dd")',
            tag: Array.from({ length: 3 }, () => '@cword(3, 5)'),
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
