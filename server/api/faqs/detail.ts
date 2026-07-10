import Mock from 'mockjs'

export default defineEventHandler(async (_event) => {
    const template = {
        id: 1,
        title: '@ctitle(10, 20)',
        author: '@cname',
        date: '@date("yyyy-MM-dd")',
        category: '@ctitle(3, 5)',
        category_id: '@integer(1, 1000)',
        intro: '@cparagraph(10, 15)',
        content: '<p>@cparagraph(10, 15)</p><p>@cparagraph(10, 15)</p><p>@cparagraph(10, 15)</p><p>@cparagraph(10, 15)</p><p>@cparagraph(10, 15)</p><p>@cparagraph(10, 15)</p><p>@cparagraph(10, 15)</p><p>@cparagraph(10, 15)</p><p>@cparagraph(10, 15)</p><p>@cparagraph(10, 15)</p><p>@cparagraph(10, 15)</p><p>@cparagraph(10, 15)</p>',
        imgUrl: '@image("800x400", "#4A7BF7", "#FFF", "png", "img")',
        views: '@integer(100, 1000)',
    }
    const data = Mock.mock(template)
    return {
        code: 200,
        message: 'ok',
        data,
    }
})
