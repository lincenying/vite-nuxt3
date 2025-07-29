import type { UserListType } from '~~/server/types'

export default defineEventHandler(async (event) => {
    const users: UserListType[] = [{
        name: 'admin',
        nickName: 'admin',
        role: '系统管理员',
        password: '123456',
        isAdmin: '1',
        token: 'admin',
        info: {
            name: '系统管理员',
        },
    }, {
        name: 'editor',
        nickName: 'admin',
        role: '系统管理员',
        password: '123456',
        isAdmin: '1',
        token: 'editor',
        info: {
            name: '编辑人员',
        },
    }, {
        name: 'test',
        nickName: 'admin',
        role: '系统管理员',
        password: '123456',
        isAdmin: '1',
        token: 'test',
        info: {
            name: '测试人员',
        },
    }]

    const body = await readBody(event)

    const user = users.find((user) => {
        return body.name === user.name && body.password === user.password
    })
    if (user) {
        return {
            code: 200,
            data: {
                token: user.token,
            },
            message: 'success',
        }
    }
    return {
        code: 401,
        data: null,
        message: '用户名或密码错误',
    }
})
