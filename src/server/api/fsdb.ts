export default defineEventHandler(async (_event) => {
    const dataStorage = useStorage('fsdb')
    await dataStorage.setItem('test', 'works')
    const test = await dataStorage.getItem('test')
    await dataStorage.setItem('test2', 'works2')
    const test2 = await dataStorage.getItem('test2')
    return {
        code: 200,
        message: 'API is working',
        data: {
            test,
            test2,
        },
    }
})
