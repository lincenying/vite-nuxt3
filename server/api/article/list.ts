import axios from 'axios'

export default defineEventHandler(async () => {
    const xhr = await axios.get(`https://php.mmxiaowu.com/api/article/list`)
    return xhr.data
})
