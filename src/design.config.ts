/** 设计稿宽度, 此处最好就是按 1920 来计算, 避免 element-ui 之类 UI 框架出现字体不对 */
export const designWidth = 1920
/** 设计稿宽度, 此处最好就是按 1920 来计算, 避免 element-ui 之类 UI 框架出现字体不对 */
export const designHeight = 1080
/** 设计稿倍数 */
export const designMultiple = designWidth / 1920
/** 兼容最小宽度 */
export const minWidth = 1280
/** 兼容最小宽度(px) */
export const minWindow = `${minWidth}Px`
/** 为什么设置 100? 设置成便于计算, 计算rem时只需要将 设计稿的宽度 / 100 即可 */
export const fontSize = 100

export const charsetRemoval = function () {
    return {
        postcssPlugin: 'internal:charset-removal',
        AtRule: {
            charset: (atRule: any) => {
                if (atRule.name === 'charset')
                    atRule.remove()
            },
        },
    }
}
