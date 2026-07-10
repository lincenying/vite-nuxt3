/** 上传文件 */
export function uploadFile(form: FormData) {
    return useHttp.$post<{ url: string }>('/api/upload', {}, { body: form })
}
