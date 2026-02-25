
import type{IAgentRepository} from "../interfaces/IAgentRepository";
import type {IAgentBase, IAgent} from "../interfaces/IAgent";
import {AbstractService} from "@drax/crud-back";
import type {ZodObject, ZodRawShape} from "zod";

class AgentService extends AbstractService<IAgent, IAgentBase, IAgentBase> {


    constructor(AgentRepository: IAgentRepository, baseSchema?: ZodObject<ZodRawShape>, fullSchema?: ZodObject<ZodRawShape>) {
        super(AgentRepository, baseSchema, fullSchema);
        
        this._validateOutput = true
        
    }

}

export default AgentService
export {AgentService}
