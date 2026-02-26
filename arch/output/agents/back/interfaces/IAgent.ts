
interface IAgentBase {
    name: string
    description: string
    inputVariables?: Array<{
    name: string
    type: string
    required: boolean
    description: string
    }>
    role: string
    behavior: string
    mission: string
    sessionContext?: string
    restrictions?: string
    additionalInstructions?: string
    answeringMachineMessage?: string
    workflow?: Array<{
    step: string
    description: string
    }>
    outcomes?: Array<{
    code: string
    description: string
    }>
    tools?: Array<{
    name: string
    description: string
    waitToRespond?: boolean
    params?: Array<{
    name: string
    type: string
    required: boolean
    description: string
    }>
    instructionsUpdate: string
    http?: {    url: string
    method: string
    headers?: Array<{
    key?: string
    value?: string
    }>
    body?: string}
    responseVariable?: string
    }>
    createdAt?: Date
    updatedAt?: Date
}

interface IAgent {
    _id: string
    name: string
    description: string
    inputVariables?: Array<{
    name: string
    type: string
    required: boolean
    description: string
    }>
    role: string
    behavior: string
    mission: string
    sessionContext?: string
    restrictions?: string
    additionalInstructions?: string
    answeringMachineMessage?: string
    workflow?: Array<{
    step: string
    description: string
    }>
    outcomes?: Array<{
    code: string
    description: string
    }>
    tools?: Array<{
    name: string
    description: string
    waitToRespond?: boolean
    params?: Array<{
    name: string
    type: string
    required: boolean
    description: string
    }>
    instructionsUpdate: string
    http?: {    url: string
    method: string
    headers?: Array<{
    key?: string
    value?: string
    }>
    body?: string}
    responseVariable?: string
    }>
    createdAt?: Date
    updatedAt?: Date
}

export type {
IAgentBase, 
IAgent
}
