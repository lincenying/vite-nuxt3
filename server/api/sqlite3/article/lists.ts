import type { Article, ListPageType } from '~~/server/types'

export default defineEventHandler(async (event) => {
    const db = useDatabase('sqlite3')

    let { page, pageSize } = getQuery<ListPageType>(event)
    page ||= 1
    pageSize ||= 12

    const offset = (page - 1) * pageSize

    // Query for users
    // const { rows } = await db.sql<QueryResult>`SELECT * FROM users`
    const data = await db.prepare(`SELECT * FROM article order by id desc LIMIT ${pageSize} OFFSET ${offset}`).all() as Article[]

    const total = await db.prepare(`SELECT COUNT(*) as total FROM article`).get() as { total: number }

    const hasNext = total.total > offset + pageSize ? 1 : 0
    const hasprev = page > 1 ? 1 : 0
    const totalPage = Math.ceil(total.total / pageSize)

    return {
        code: 200,
        message: 'API is working!',
        data: {
            list: data,
            total: total.total,
            currPage: page,
            pageSize,
            hasNext,
            hasprev,
            totalPage,
        },
    }
})
