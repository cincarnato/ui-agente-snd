
import AgentServiceFactory from "../factory/services/AgentServiceFactory.js";
import {AbstractFastifyController} from "@drax/crud-back";
import AgentPermissions from "../permissions/AgentPermissions.js";
import type {IAgent, IAgentBase} from "../interfaces/IAgent";

class AgentController extends AbstractFastifyController<IAgent, IAgentBase, IAgentBase>   {

    constructor() {
        super(AgentServiceFactory.instance, AgentPermissions)
        this.tenantField = "tenant";
        this.userField = "user";
        
        this.tenantFilter = false;
        this.tenantSetter = false;
        this.tenantAssert = false;
        
        this.userFilter = false;
        this.userSetter = false;
        this.userAssert = false;
    }

}

export default AgentController;
export {
    AgentController
}

