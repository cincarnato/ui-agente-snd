
import type {IAgent, IAgentBase} from './IAgent'
import {IDraxCrudRepository} from "@drax/crud-share";

interface IAgentRepository extends IDraxCrudRepository<IAgent, IAgentBase, IAgentBase>{

}

export {IAgentRepository}


