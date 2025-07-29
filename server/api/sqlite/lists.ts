import type { QueryResult, User } from '~~/server/types'

export default defineEventHandler(async () => {
    const db = useDatabase()

    // Query for users
    const { rows } = await db.sql<QueryResult<User[]>>`SELECT * FROM users`

    return {
        code: 200,
        message: 'API is working!',
        data: rows || [],
    }
})
