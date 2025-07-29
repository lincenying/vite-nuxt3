import type { Article } from '~~/server/types'
import { useDatabase } from 'nitropack/runtime'

export default defineEventHandler(async (_event) => {
    const db = useDatabase('sqlite3')

    // Query for users
    // const { rows } = await db.sql<QueryResult>`SELECT * FROM users`
    const data = await db.prepare(`SELECT * FROM article order by views desc LIMIT 10 OFFSET 0`).all() as Article[]

    return {
        code: 200,
        message: 'API is working!',
        data,
    }
})
