import Mock from 'mockjs'

export default defineEventHandler(async (_event) => {
    const template = Array.from({ length: 4 }, (_, index) => ({
        id: index + 1,
        imgUrl: getRandomValue(imgUrl),
        title: '@ctitle(7, 20)',
    }))
    const data = Mock.mock(template)
    return {
        code: 200,
        message: 'ok',
        data,
    }
})
