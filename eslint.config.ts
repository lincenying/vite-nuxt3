import lincy from '@lincy/eslint-config'

export default lincy(
    {
        unocss: false,
        formatters: true,
        overrides: {
            ignores: [
                '**/assets',
                '**/static',
                '.nuxt',
            ],
        },
    },
)
