import { webRemConfig } from '@lincy/base-config'
import { fontSize } from './src/design.config'

const baseConfig = webRemConfig({ baseFontSize: fontSize })

export default {
    ...baseConfig,
    safelist: [
        ...(baseConfig.safelist || []),
        ...Array.from({ length: 10 }, (_, i) => `i-fad-digital${i}`),
    ],
}
