import type { InsertSucces, User } from '~~/server/types'
import { useDatabase } from 'nitropack/runtime'

export default defineEventHandler(async (event) => {
    const db = useDatabase()

    const body = await readBody<User>(event)

    const { firstName, lastName, email } = body

    if (!firstName || !lastName || !email) {
        return {
            code: 400,
            message: 'Invalid request',
        }
    }

    const userId = String(Math.round(Math.random() * 10_000))
    // const data = await db.sql`INSERT INTO users VALUES (null, ${userId}, ${firstName}, ${lastName}, ${email})`
    const result = await db.prepare('INSERT INTO users VALUES (null, ?, ?, ?, ?)').run(userId, firstName, lastName, email) as InsertSucces

    const data = await db.prepare('select * from users where id = ?').get(result.lastInsertRowid) as User

    return {
        code: 200,
        message: 'API is working!',
        result,
        data,
    }
})
