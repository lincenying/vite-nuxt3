/**
 * Null 或者 Undefined 或者 T
 */
declare type Nullable<T> = T | null | undefined
/**
 * 非 Null 类型
 */
declare type NonNullable<T> = T extends null | undefined ? never : T
/**
 * 数组<T> 或者 T
 */
declare type Arrayable<T> = T | T[]
/**
 * 键为字符串, 值为 Any 的对象
 */
declare type Objable<T = any> = Record<string, T>
/**
 * Function
 */
declare type Fn<T = void> = () => T
/**
 * 任意函数
 */
declare type AnyFn<T = any> = (...args: any[]) => T
/**
 * Promise, or maybe not
 */
declare type Awaitable<T> = T | PromiseLike<T>

/**
 * 接口返回模板
 */
declare interface ResData<T> {
    data: T
    code: number
    message: string
    info?: string
}

/**
 * 接口返回模板里的 Data 数据 - 含分页的列表
 */
declare interface ResDataLists<T> {
    hasNext: boolean
    hasPrev: boolean
    total: number
    page: number
    perPage: number
    totalPage: number
    list: T[]
}

/**
 * 接口返回模板里的 Data 数据 - 不含分页的列表
 */
declare interface ResDataList<T> {
    data: T[]
}

declare interface Window {

}
