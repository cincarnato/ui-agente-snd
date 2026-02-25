
import AgentCrudPage from "../pages/crud/AgentCrudPage.vue";


const AgentCrudRoute = [
  {
    name: 'AgentCrudPage',
    path: '/crud/agent',
    component: AgentCrudPage,
    meta: {
      auth: true,
      permission: 'agent:manage',
    }
  },
]

export default AgentCrudRoute
export { AgentCrudRoute }
