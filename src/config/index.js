import devConfig from './dev.config'
import prodConfig from './prod.config'

const isProd = process.env.NODE_ENV === 'production'
let networkConfig = devConfig

// if (isProd) {
//     networkConfig = prodConfig
// }

export {
    networkConfig
}