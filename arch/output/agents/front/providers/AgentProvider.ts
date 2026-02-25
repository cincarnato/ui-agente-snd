
import {AbstractCrudRestProvider} from "@drax/crud-front";
import type {IAgent, IAgentBase} from '../interfaces/IAgent'

class AgentProvider extends AbstractCrudRestProvider<IAgent, IAgentBase, IAgentBase> {
    
  static singleton: AgentProvider
    
  constructor() {
   super('/api/agents')
  }
  
  static get instance() {
    if(!AgentProvider.singleton){
      AgentProvider.singleton = new AgentProvider()
    }
    return AgentProvider.singleton
  }

}

export default AgentProvider

