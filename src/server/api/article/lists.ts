import axios from 'axios'

export default defineEventHandler(async (event) => {
    const query = getQuery<{ page: number; limit: number }>(event)
    const page = query.page || 1
    const limit = query.limit || 10
    const xhr = await axios.get(`https://php.mmxiaowu.com/api/article/lists?page=${page}&limit=${limit}`)
    return xhr.data
})
