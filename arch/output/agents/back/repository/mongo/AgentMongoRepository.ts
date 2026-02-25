
import {AbstractMongoRepository} from "@drax/crud-back";
import {AgentModel} from "../../models/AgentModel.js";
import type {IAgentRepository} from '../../interfaces/IAgentRepository'
import type {IAgent, IAgentBase} from "../../interfaces/IAgent";


class AgentMongoRepository extends AbstractMongoRepository<IAgent, IAgentBase, IAgentBase> implements IAgentRepository {

    constructor() {
        super();
        this._model = AgentModel;
        this._searchFields = ['name', 'description'];
        this._populateFields = [];
        this._lean = true
    }

}

export default AgentMongoRepository
export {AgentMongoRepository}

