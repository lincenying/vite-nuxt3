import Mock from 'mockjs'

export default defineEventHandler(async (_event) => {
    return {
        code: 200,
        message: 'ok',
        data: Mock.mock(Array.from({ length: 6 }, (_, index) => ({
            id: index + 1,
            title: '@cword(3, 5)',
        }))),
    }
})
