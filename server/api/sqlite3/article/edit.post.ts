import type { Article, InsertSucces } from '~~/server/types'
import { UTC2Date } from '@lincy/utils'
import { useDatabase } from 'nitropack/runtime'

export default defineEventHandler(async (event) => {
    const db = useDatabase('sqlite3')

    const body = await readBody<Article>(event)

    const { id, title, content, category } = body

    const date = UTC2Date('', 'yyyy-mm-dd hh:ii:ss')

    if (!title || !content || !category) {
        return {
            code: 400,
            message: 'Invalid request',
        }
    }

    const result = await db
        .prepare('UPDATE article SET title = ?, content = ?, category = ?, date = ? where id = ?')
        .run(title, content, category, date, id) as InsertSucces

    return {
        code: 200,
        message: 'API is working!',
        data: result,
    }
})
