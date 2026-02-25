
import {AbstractSqliteRepository} from "@drax/crud-back";
import type {IAgentRepository} from '../../interfaces/IAgentRepository'
import type {IAgent, IAgentBase} from "../../interfaces/IAgent";
import {SqliteTableField} from "@drax/common-back";

class AgentSqliteRepository extends AbstractSqliteRepository<IAgent, IAgentBase, IAgentBase> implements IAgentRepository {

    protected db: any;
    protected tableName: string = 'Agent';
    protected dataBaseFile: string;
    protected searchFields: string[] = ['name', 'description'];
    protected booleanFields: string[] = [];
    protected identifier: string = '_id';
    protected populateFields = [
        
    ]
    protected verbose: boolean = false;
    protected tableFields: SqliteTableField[] = [
        {name: "name", type: "TEXT", unique: undefined, primary: false},
{name: "description", type: "TEXT", unique: undefined, primary: false},
{name: "role", type: "TEXT", unique: undefined, primary: false},
{name: "behavior", type: "TEXT", unique: undefined, primary: false},
{name: "mission", type: "TEXT", unique: undefined, primary: false},
{name: "sessionContext", type: "TEXT", unique: undefined, primary: false},
{name: "restrictions", type: "TEXT", unique: undefined, primary: false},
{name: "additionalInstructions", type: "TEXT", unique: undefined, primary: false},
{name: "answeringMachineMessage", type: "TEXT", unique: undefined, primary: false},
{name: "workflow", type: "TEXT", unique: undefined, primary: false},
{name: "outcomes", type: "TEXT", unique: undefined, primary: false},
{name: "tools", type: "TEXT", unique: undefined, primary: false}
    ]
  
}

export default AgentSqliteRepository
export {AgentSqliteRepository}

