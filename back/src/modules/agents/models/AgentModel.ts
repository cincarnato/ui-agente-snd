
import {mongoose} from '@drax/common-back';
import {PaginateModel} from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
import mongoosePaginate from 'mongoose-paginate-v2'
import type {IAgent} from '../interfaces/IAgent'

const AgentSchema = new mongoose.Schema<IAgent>({
            name: {type: String,   required: true, index: true, unique: false },
            description: {type: String,   required: true, index: false, unique: false },
            role: {type: String,   required: true, index: false, unique: false },
            behavior: {type: String,   required: true, index: false, unique: false },
            mission: {type: String,   required: true, index: false, unique: false },
            sessionContext: {type: String,   required: false, index: false, unique: false },
            restrictions: {type: String,   required: false, index: false, unique: false },
            additionalInstructions: {type: String,   required: false, index: false, unique: false },
            answeringMachineMessage: {type: String,   required: false, index: false, unique: false },
            workflow: [{ 
                        step: {type: String,   required: true, index: false, unique: false },
            description: {type: String,   required: true, index: false, unique: false } 
            }],
            outcomes: [{ 
                        code: {type: String,   required: true, index: false, unique: false },
            description: {type: String,   required: true, index: false, unique: false } 
            }],
            tools: [{ 
                        name: {type: String,   required: true, index: false, unique: false },
            description: {type: String,   required: true, index: false, unique: false },
            waitToRespond: {type: Boolean,   required: false, index: false, unique: false },
            params: [{ 
                        name: {type: String,   required: true, index: false, unique: false },
            type: {type: String,  enum: ['string', 'number', 'boolean'], required: true, index: false, unique: false },
            required: {type: Boolean,   required: true, index: false, unique: false },
            description: {type: String,   required: true, index: false, unique: false } 
            }],
            http: {
            url: {type: String,   required: true, index: false, unique: false },
            method: {type: String,  enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], required: true, index: false, unique: false },
            headers: [{ 
                        key: {type: String,   required: false, index: false, unique: false },
            value: {type: String,   required: false, index: false, unique: false } 
            }],
            body: {type: String,   required: false, index: false, unique: false } 
            },
            responseVariable: {type: String,   required: false, index: false, unique: false } 
            }]
}, {timestamps: true});

AgentSchema.plugin(uniqueValidator, {message: 'validation.unique'});
AgentSchema.plugin(mongoosePaginate);

AgentSchema.virtual("id").get(function () {
    return this._id.toString();
});


AgentSchema.set('toJSON', {getters: true, virtuals: true});

AgentSchema.set('toObject', {getters: true, virtuals: true});

const MODEL_NAME = 'Agent';
const COLLECTION_NAME = 'Agent';
const AgentModel = mongoose.model<IAgent, PaginateModel<IAgent>>(MODEL_NAME, AgentSchema,COLLECTION_NAME);

export {
    AgentSchema,
    AgentModel
}

export default AgentModel
