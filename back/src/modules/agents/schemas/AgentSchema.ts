
import { z } from 'zod';


const AgentBaseSchema = z.object({
      name: z.string().min(1,'validation.required'),
    description: z.string().min(1,'validation.required'),
    role: z.string().min(1,'validation.required'),
    behavior: z.string().min(1,'validation.required'),
    mission: z.string().min(1,'validation.required'),
    sessionContext: z.string().optional(),
    restrictions: z.string().optional(),
    additionalInstructions: z.string().optional(),
    answeringMachineMessage: z.string().optional(),
    workflow: z.array(
z.object({    step: z.string().min(1,'validation.required'),
    description: z.string().min(1,'validation.required')})
    ).optional(),
    outcomes: z.array(
z.object({    code: z.string().min(1,'validation.required'),
    description: z.string().min(1,'validation.required')})
    ).optional(),
    tools: z.array(
z.object({    name: z.string().min(1,'validation.required'),
    description: z.string().min(1,'validation.required'),
    waitToRespond: z.boolean().optional(),
    params: z.array(
z.object({    name: z.string().min(1,'validation.required'),
    type: z.enum(['string', 'number', 'boolean']),
    required: z.boolean(),
    description: z.string().min(1,'validation.required')})
    ).optional(),
    http: z.object({    url: z.string().min(1,'validation.required'),
    method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
    headers: z.array(
z.object({    key: z.string().optional(),
    value: z.string().optional()})
    ).optional(),
    body: z.string().optional()}),
    responseVariable: z.string().optional()})
    ).optional()
});

const AgentSchema = AgentBaseSchema
    .extend({
      _id: z.coerce.string(),
       
    })

export default AgentSchema;
export {AgentSchema, AgentBaseSchema}
