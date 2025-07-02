import Mock from 'mockjs'

export default defineEventHandler(async (_event) => {
    const template = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        date: '@date("yyyy-MM-dd")',
        title: '@ctitle(10, 30)',
    }))
    const data = Mock.mock(template)
    return {
        code: 200,
        message: 'ok',
        data,
    }
})
