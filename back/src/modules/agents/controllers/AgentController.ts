
import AgentServiceFactory from "../factory/services/AgentServiceFactory.js";
import {AbstractFastifyController} from "@drax/crud-back";
import AgentPermissions from "../permissions/AgentPermissions.js";
import type {IAgent, IAgentBase} from "../interfaces/IAgent";
import type {FastifyReply} from "fastify";
import {NotFoundError} from "@drax/common-back";
import {CustomRequest} from "@drax/crud-back";
import {buildSystemPrompt} from "../helpers/BuildSystemPrompt.js";

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

    async findById(request: CustomRequest, reply: FastifyReply): Promise<IAgent> {
        try {
            request.rbac.assertPermission(this.permission.View)
            if (!request.params.id) {
                reply.statusCode = 400
                reply.send({error: 'BAD REQUEST'})
            }


            const id = request.params.id
            let item = await this.service.findById(id)

            if (!item) {
                throw new NotFoundError()
            }

            if (!request.rbac.hasSomePermission([this.permission.All, this.permission.ViewAll])) {
                this.assertUser(item, request.rbac)
            }

            this.assertTenant(item, request.rbac)

            item.instructions = buildSystemPrompt(item)

            return item
        } catch (e) {
            this.handleError(e, reply)
        }
    }


}

export default AgentController;
export {
    AgentController
}

