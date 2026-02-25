import baseRoutes from '../modules/base/routes/index.js'
import googleRoutes from '../modules/google/routes/index.js'
import agentRoutes from '../modules/agents/routes/index.js'

const modulesRoutes = [
  ...baseRoutes,
  ...googleRoutes,
  ...agentRoutes,
]

export default modulesRoutes
export { modulesRoutes }
