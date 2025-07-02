import type { Article } from '~/server/types'
import { useDatabase } from 'nitropack/runtime'

export default defineEventHandler(async (event) => {
    const id = getQuery<{ id: number }>(event).id

    if (!id) {
        return {
            code: 400,
            message: 'Invalid user id',
        }
    }

    const db = useDatabase('sqlite3')

    // Query for users
    // const { rows } = await db.sql<QueryResult>`SELECT * FROM users WHERE id = ${id}`

    const data = await db.prepare(`SELECT * FROM article WHERE id = ?`).get(id) as Article

    return {
        code: 200,
        message: 'API is working!',
        data,
    }
})
