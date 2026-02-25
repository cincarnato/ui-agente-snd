
import AgentController from "../controllers/AgentController.js";
import {CrudSchemaBuilder} from "@drax/crud-back";
import {AgentSchema, AgentBaseSchema} from '../schemas/AgentSchema.js'

async function AgentFastifyRoutes(fastify, options) {

    const controller: AgentController = new AgentController()
    const schemas = new CrudSchemaBuilder(AgentSchema, AgentBaseSchema,AgentBaseSchema, 'Agent', 'openapi-3.0', ['Agent']);

    fastify.get('/api/agents', {schema: schemas.paginateSchema}, (req,rep) => controller.paginate(req,rep))
    
    fastify.get('/api/agents/find', {schema: schemas.findSchema}, (req,rep) => controller.find(req,rep))
    
    fastify.get('/api/agents/search', {schema: schemas.searchSchema}, (req,rep) => controller.search(req,rep))
    
    fastify.get('/api/agents/:id', {schema: schemas.findByIdSchema}, (req,rep) => controller.findById(req,rep))
    
    fastify.get('/api/agents/find-one', {schema: schemas.findOneSchema}, (req,rep) => controller.findOne(req,rep))
    
    fastify.get('/api/agents/group-by', {schema: schemas.groupBySchema}, (req,rep) => controller.groupBy(req,rep))

    fastify.post('/api/agents', {schema: schemas.createSchema}, (req,rep) =>controller.create(req,rep))

    fastify.put('/api/agents/:id', {schema: schemas.updateSchema}, (req,rep) =>controller.update(req,rep))
    
    fastify.patch('/api/agents/:id', {schema: schemas.updateSchema}, (req,rep) =>controller.updatePartial(req,rep))

    fastify.delete('/api/agents/:id', {schema: schemas.deleteSchema}, (req,rep) =>controller.delete(req,rep))
    
    fastify.get('/api/agents/export', (req,rep) =>controller.export(req,rep))
    
}

export default AgentFastifyRoutes;
export {AgentFastifyRoutes}
