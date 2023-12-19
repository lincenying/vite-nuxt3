import axios from 'axios'

export default defineEventHandler(async (event) => {
    const query = getQuery<{ id: string }>(event)
    const xhr = await axios.get(`https://php.mmxiaowu.com/api/article/detail/${query.id}`)
    return xhr.data
})
