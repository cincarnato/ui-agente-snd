
import AgentMongoRepository from '../../repository/mongo/AgentMongoRepository.js'
import AgentSqliteRepository from '../../repository/sqlite/AgentSqliteRepository.js'
import type {IAgentRepository} from "../../interfaces/IAgentRepository";
import {AgentService} from '../../services/AgentService.js'
import {AgentBaseSchema, AgentSchema} from "../../schemas/AgentSchema.js";
import {COMMON, CommonConfig, DraxConfig} from "@drax/common-back";

class AgentServiceFactory {
    private static service: AgentService;

    public static get instance(): AgentService {
        if (!AgentServiceFactory.service) {
            
            let repository: IAgentRepository
            switch (DraxConfig.getOrLoad(CommonConfig.DbEngine)) {
                case COMMON.DB_ENGINES.MONGODB:
                    repository = new AgentMongoRepository()
                    break;
                case COMMON.DB_ENGINES.SQLITE:
                    const dbFile = DraxConfig.getOrLoad(CommonConfig.SqliteDbFile)
                    repository = new AgentSqliteRepository(dbFile, false)
                    repository.build()
                    break;
                default:
                    throw new Error("DraxConfig.DB_ENGINE must be one of " + Object.values(COMMON.DB_ENGINES).join(", "));
            }
            
            const baseSchema = AgentBaseSchema;
            const fullSchema = AgentSchema;
            AgentServiceFactory.service = new AgentService(repository, baseSchema, fullSchema);
        }
        return AgentServiceFactory.service;
    }
}

export default AgentServiceFactory
export {
    AgentServiceFactory
}

