import type { ListPageType } from '~~/server/types'
import Mock from 'mockjs'

export default defineEventHandler(async (event) => {
    let { page, pageSize } = getQuery<ListPageType>(event)
    page ||= 1
    pageSize ||= 10
    const template = {
        list: Array.from({ length: getRandomNumber(1, 3) }, (_, index) => ({
            id: (page - 1) * pageSize + index + 1,
            article: (page - 1) * pageSize + index + 1,
            user: {
                name: '@cname',
                avatar: 'https://cravatar.cn/avatar/f7043d902c520089b324569ba690ea91?s=80&d=identicon&r=g',
            },
            date: '@date("yyyy-MM-dd HH:mm:ss")',
            content: '@cparagraph(1, 3)',
            children: Array.from({ length: getRandomNumber(0, 3) }, (_, sub_index) => ({
                id: sub_index + 1,
                article: sub_index + 1,
                user: {
                    name: '@cname',
                    avatar: 'https://cravatar.cn/avatar/f7043d902c520089b324569ba690ea91?s=80&d=identicon&r=g',
                },
                date: '@date("yyyy-MM-dd HH:mm:ss")',
                content: '@cparagraph(1, 3)',
            })),
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
