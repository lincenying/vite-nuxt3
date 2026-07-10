import type globalDialog from '@/components/global/dialog.vue'

export type GlobalDiaslogInstance = InstanceType<typeof globalDialog>

export interface GlobalDialogLayer<T = Objable> {
    /** 是否显示弹窗 */
    show: boolean
    /** 弹窗标题 */
    title: string
    /** 是否显示按钮 */
    showButton?: boolean
    /** 是否显示取消按钮 */
    showCancel?: boolean
    /** 数据 */
    row?: T
    /** 弹窗宽度 */
    width?: string
    /** 禁用按钮 */
    disabledBtn: boolean
    /** loading按钮 */
    loadingBtn: boolean
    [propName: string]: any
}
