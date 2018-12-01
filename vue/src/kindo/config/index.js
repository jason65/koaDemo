import dev from './dev.js'
import prod from './prod.js'
import user from './user.js'
import config from './config.js'
let kConfig = {}
if (process.env.NODE_ENV === 'production') {
  kConfig.api = prod
} else {
  kConfig.api = dev
}
kConfig.user = user
kConfig.sys = config
export default kConfig
