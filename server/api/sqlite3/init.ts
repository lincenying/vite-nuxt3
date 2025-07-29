export default defineEventHandler(async () => {
    const db = useDatabase('sqlite3')

    const sqlArray = [
        'DROP TABLE IF EXISTS users',
    ]
    sqlArray.push(`
        CREATE TABLE IF NOT EXISTS users (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "userid" VARCHAR(10),
            "firstName" VARCHAR(50),
            "lastName" VARCHAR(50),
            "email" VARCHAR(50)
        )`,
    )
    sqlArray.push(`DROP TABLE IF EXISTS article`)
    sqlArray.push(`
        CREATE TABLE IF NOT EXISTS article (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "title" VARCHAR(100),
            "content" TEXT,
            "author" VARCHAR(20),
            "category" VARCHAR(20),
            "views" INTEGER,
            "date" VARCHAR(20)
        )`,
    )
    const result = []

    for (const sql of sqlArray) {
        const data = await db.prepare(sql).run()
        result.push(data)
    }

    return {
        code: 200,
        message: 'API is working!',
        data: result,
    }
})
