import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { defineEventHandler, readMultipartFormData } from 'h3'

export default defineEventHandler(async (event) => {
    const files = (await readMultipartFormData(event))!

    if (!files) {
        return {
            code: 400,
            data: null,
            message: '上传文件不存在',
        }
    }

    const file = files[0]
    let dir = '/.output/public/upload'
    if (process.env.NODE_ENV === 'development') {
        dir = '/src/public/upload'
    }
    const dirPath = path.join(process.cwd(), dir)
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
    }
    const filepath = path.join(dirPath, file.filename!)
    fs.writeFileSync(filepath, file.data)

    return {
        code: 200,
        data: {
            url: `/upload/${file.filename}`,
        },
        message: '上传成功',

    }
})
