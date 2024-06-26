import lincy from '@lincy/eslint-config'

export default lincy(
    {
        unocss: true,
        formatters: true,
        overrides: {
            ignores: [
                '**/assets',
                '**/static',
            ],
        },
    },
)
