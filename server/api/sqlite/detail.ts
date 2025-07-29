import type { QueryResult, User } from '~~/server/types'
import { useDatabase } from 'nitropack/runtime'

export default defineEventHandler(async (event) => {
    const id = getQuery<{ id: number }>(event).id

    if (!id) {
        return {
            code: 400,
            message: 'Invalid user id',
        }
    }

    const db = useDatabase()

    // Query for users
    const { rows } = await db.sql<QueryResult<User[]>>`SELECT * FROM users WHERE id = ${id}`

    const data = await db.prepare(`SELECT * FROM users WHERE id = ?`).get(id) as User

    return {
        code: 200,
        message: 'API is working!',
        data: (rows && rows[0]) || {},
        data2: data,
    }
})
