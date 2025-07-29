import type { Article, InsertSucces } from '~~/server/types'
import { UTC2Date } from '@lincy/utils'

export default defineEventHandler(async (event) => {
    const db = useDatabase('sqlite3')

    const body = await readBody<Article>(event)

    const { title, content, category } = body

    const date = UTC2Date('', 'yyyy-mm-dd hh:ii:ss')

    if (!title || !content || !category) {
        return {
            code: 400,
            message: 'Invalid request',
        }
    }

    // title content author category views date
    const result = await db.prepare('INSERT INTO article VALUES (null, ?, ?, ?, ?, ?, ?)').run(title, content, '央视网', category, 0, date) as InsertSucces

    const data = await db.prepare('select * from article where id = ?').get(result.lastInsertRowid) as Article

    return {
        code: 200,
        message: 'API is working!',
        result,
        data,
    }
})
