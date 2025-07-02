import mitt from 'mitt'

const emitter = mitt<{
    'change-category': number
    'refresh-product-comment': any
    'refresh-case-comment': any
    'refresh-news-comment': any
    'refresh-faq-comment': any
    'refresh-article-comment': any
}>()

// 创建并暴露mitt
export default emitter

// 监听事件
// emitter.on('change-category', (categoryId) => { })

// 触发事件
// emitter.emit('change-category', 1)

// 清理事件
// emitter.all.clear()

// 移除事件
// emitter.off('change-category')
