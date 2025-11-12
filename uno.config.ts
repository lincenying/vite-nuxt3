import { webConfig, webRemConfig } from '@lincy/unocss-base-config'

import { fontSize, ifCssRem } from './src/design.config'

const baseConfig = ifCssRem ? webRemConfig({ baseFontSize: fontSize }) : webConfig()

export default {
    ...baseConfig,
    safelist: [
        ...(baseConfig.safelist || []),
        ...Array.from({ length: 10 }, (_, i) => `i-fad-digital${i}`),
    ],
}
