import { describe, it, beforeAll, afterAll, expect } from "vitest"
import AgentRoutes from "../../../../src/modules/agents/routes/AgentRoutes"
import AgentPermissions from "../../../../src/modules/agents/permissions/AgentPermissions"
import TestSetup from "../../../setup/TestSetup"
import type { IAgentBase } from "../../../../src/modules/agents/interfaces/IAgent"

describe("Agent Endpoints Test", function () {

    let testSetup = new TestSetup({
        routes: [AgentRoutes],
        permissions: [AgentPermissions]
    })

    beforeAll(async () => {
        await testSetup.setup()
    })

    afterAll(async () => {
        await testSetup.dropAndClose()
        return
    })

    // ── Happy Path ─────────────────────────────────────────────────────────────

    it("should create a new agent and find by id", async () => {
        const { accessToken } = await testSetup.rootUserLogin()
        expect(accessToken).toBeTruthy()
        await testSetup.dropCollection('Agent')

        const newAgent: IAgentBase = {
            name: "Test Agent",
            description: "This is a test agent description",

            role: "You are a helpful assistant that answers questions.",
            behavior: "Respond in a friendly, concise and professional manner.",
            mission: "Help users find answers to their questions efficiently.",
        }

        const resp = await testSetup.fastifyInstance.inject({
            method: 'POST',
            url: '/api/agents',
            payload: newAgent,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const agent = await resp.json()
        expect(resp.statusCode).toBe(200)
        expect(agent.name).toBe("Test Agent")
        expect(agent._id).toBeDefined()

        const getResp = await testSetup.fastifyInstance.inject({
            method: 'GET',
            url: '/api/agents/' + agent._id,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const getAgent = await getResp.json()
        expect(getResp.statusCode).toBe(200)
        expect(getAgent.name).toBe("Test Agent")
    })

    it("should create and update an agent and finally find by id", async () => {
        const { accessToken } = await testSetup.rootUserLogin()
        expect(accessToken).toBeTruthy()
        await testSetup.dropCollection('Agent')

        const newAgent: IAgentBase = {
            name: "Original Agent",
            description: "Original description for the agent",

            role: "You are an assistant.",
            behavior: "Respond clearly.",
            mission: "Help users.",
        }

        const resp = await testSetup.fastifyInstance.inject({
            method: 'POST',
            url: '/api/agents',
            payload: newAgent,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const agent = await resp.json()
        expect(resp.statusCode).toBe(200)
        expect(agent._id).toBeDefined()

        const updateData: IAgentBase = {
            name: "Updated Agent",
            description: "Updated description for the agent",

            role: "You are an expert assistant.",
            behavior: "Respond clearly and professionally.",
            mission: "Help users solve their problems efficiently.",
        }

        const updateResp = await testSetup.fastifyInstance.inject({
            method: 'PUT',
            url: `/api/agents/${agent._id}`,
            payload: updateData,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        expect(updateResp.statusCode).toBe(200)
        const updatedAgent = await updateResp.json()
        expect(updatedAgent.name).toBe("Updated Agent")

        const verifyResp = await testSetup.fastifyInstance.inject({
            method: 'GET',
            url: `/api/agents/${updatedAgent._id}`,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const verifiedAgent = await verifyResp.json()
        expect(verifyResp.statusCode).toBe(200)
        expect(verifiedAgent.name).toBe("Updated Agent")
    })

    it("should create and update partial an agent and finally find by id", async () => {
        const { accessToken } = await testSetup.rootUserLogin()
        expect(accessToken).toBeTruthy()
        await testSetup.dropCollection('Agent')

        const newAgent: IAgentBase = {
            name: "Agent Before Patch",
            description: "Description before patch",

            role: "You are an assistant.",
            behavior: "Respond clearly.",
            mission: "Help users.",
        }

        const resp = await testSetup.fastifyInstance.inject({
            method: 'POST',
            url: '/api/agents',
            payload: newAgent,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const agent = await resp.json()
        expect(resp.statusCode).toBe(200)

        const updateData: any = {
            name: "Agent After Patch",
        }

        const updateResp = await testSetup.fastifyInstance.inject({
            method: 'PATCH',
            url: `/api/agents/${agent._id}`,
            payload: updateData,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        expect(updateResp.statusCode).toBe(200)
        const updatedAgent = await updateResp.json()
        expect(updatedAgent.name).toBe("Agent After Patch")

        const verifyResp = await testSetup.fastifyInstance.inject({
            method: 'GET',
            url: `/api/agents/${updatedAgent._id}`,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const verifiedAgent = await verifyResp.json()
        expect(verifyResp.statusCode).toBe(200)
        expect(verifiedAgent.name).toBe("Agent After Patch")
    })

    it("should create and delete an agent", async () => {
        const { accessToken } = await testSetup.rootUserLogin()
        expect(accessToken).toBeTruthy()
        await testSetup.dropCollection('Agent')

        const newAgent: IAgentBase = {
            name: "Agent To Delete",
            description: "This agent will be deleted",


            role: "You are an assistant.",
            behavior: "Respond clearly.",
            mission: "Help users.",
        }

        const createResp = await testSetup.fastifyInstance.inject({
            method: 'POST',
            url: '/api/agents',
            payload: newAgent,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const createdAgent = await createResp.json()
        expect(createResp.statusCode).toBe(200)
        const agentId = createdAgent._id

        const deleteResp = await testSetup.fastifyInstance.inject({
            method: 'DELETE',
            url: `/api/agents/${agentId}`,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        expect(deleteResp.statusCode).toBe(200)
        const deleteResult = await deleteResp.json()
        expect(deleteResult.deleted).toBe(true)

        const verifyResp = await testSetup.fastifyInstance.inject({
            method: 'GET',
            url: `/api/agents/${agentId}`,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        expect(verifyResp.statusCode).toBe(404)
    })

    it("should create and paginate agents", async () => {
        const { accessToken } = await testSetup.rootUserLogin()
        expect(accessToken).toBeTruthy()
        await testSetup.dropCollection('Agent')

        const agentsData = [
            {
                agentId: "paginate-001", name: "Agent 1", description: "Paginate test agent 1",

                role: "Assistant role.", behavior: "Friendly behavior.", mission: "Help users."
            },
            {
                agentId: "paginate-002", name: "Agent 2", description: "Paginate test agent 2",
                role: "Expert assistant.", behavior: "Professional behavior.", mission: "Solve problems."
            },
        ]

        for (const data of agentsData) {
            await testSetup.fastifyInstance.inject({
                method: 'POST',
                url: '/api/agents',
                payload: data,
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        }

        const resp = await testSetup.fastifyInstance.inject({
            method: 'GET',
            url: '/api/agents',
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const result = await resp.json()
        expect(resp.statusCode).toBe(200)
        expect(result.items.length).toBe(2)
        expect(result.total).toBe(2)
        expect(result.page).toBe(1)
        expect(result.limit).toBe(10)
    })

    it("should create and search for agents", async () => {
        const { accessToken } = await testSetup.rootUserLogin()
        expect(accessToken).toBeTruthy()
        await testSetup.dropCollection('Agent')

        const agentsData = [
            {
                agentId: "search-001", name: "Search Agent Alpha", description: "Alpha search agent",

                role: "Assistant.", behavior: "Friendly.", mission: "Help users."
            },
            {
                agentId: "search-002", name: "Search Agent Beta", description: "Beta search agent",

                role: "Assistant.", behavior: "Friendly.", mission: "Help users."
            },
            {
                agentId: "other-001", name: "Other Agent", description: "Other agent description",
                role: "Expert.", behavior: "Professional.", mission: "Solve problems."
            },
        ]

        for (const data of agentsData) {
            await testSetup.fastifyInstance.inject({
                method: 'POST',
                url: '/api/agents',
                payload: data,
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        }

        const searchResp = await testSetup.fastifyInstance.inject({
            method: 'GET',
            url: '/api/agents/search?search=Search',
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const searchResult = await searchResp.json()
        expect(searchResp.statusCode).toBe(200)
        expect(Array.isArray(searchResult)).toBe(true)
        expect(searchResult.length).toBe(2)
        expect(searchResult.some((a: any) => a.name === "Search Agent Alpha")).toBe(true)
        expect(searchResult.some((a: any) => a.name === "Search Agent Beta")).toBe(true)
    })

    it("should create and find agents with filters", async () => {
        const { accessToken } = await testSetup.rootUserLogin()
        expect(accessToken).toBeTruthy()
        await testSetup.dropCollection('Agent')

        const agentsData = [
            {
                agentId: "filter-001", name: "Active Agent", description: "An active agent",
                role: "Assistant.", behavior: "Friendly.", mission: "Help users."
            },
            {
                agentId: "filter-002", name: "Draft Agent", description: "A draft agent",

                role: "Expert.", behavior: "Professional.", mission: "Solve problems."
            },
        ]

        for (const data of agentsData) {
            await testSetup.fastifyInstance.inject({
                method: 'POST',
                url: '/api/agents',
                payload: data,
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        }

        const findResp = await testSetup.fastifyInstance.inject({
            method: 'GET',
            url: '/api/agents/find?filters=name;eq;Active Agent',
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const findResult = await findResp.json()
        expect(findResp.statusCode).toBe(200)
        expect(Array.isArray(findResult)).toBe(true)
        expect(findResult.length).toBe(1)
        expect(findResult[0].name).toBe("Active Agent")
    })

    it("should create and groupBy agents", async () => {
        const { accessToken } = await testSetup.rootUserLogin()
        expect(accessToken).toBeTruthy()
        await testSetup.dropCollection('Agent')

        const agentsData = [
            {
                agentId: "group-001", name: "Group Agent 1", description: "Group test agent 1",
                role: "Assistant.", behavior: "Friendly.", mission: "Help users."
            },
            {
                agentId: "group-002", name: "Group Agent 2", description: "Group test agent 2",
                role: "Assistant.", behavior: "Friendly.", mission: "Help users."
            },
            {
                agentId: "group-003", name: "Group Agent 3", description: "Group test agent 3",

                role: "Expert.", behavior: "Professional.", mission: "Solve problems."
            },
        ]

        for (const data of agentsData) {
            await testSetup.fastifyInstance.inject({
                method: 'POST',
                url: '/api/agents',
                payload: data,
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        }

        const groupResp = await testSetup.fastifyInstance.inject({
            method: 'GET',
            url: '/api/agents/group-by?fields=role',
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        const groupResult = await groupResp.json()
        expect(groupResp.statusCode).toBe(200)

        const assistantGroup = groupResult.find((g: any) => g.role === "Assistant.")
        const expertGroup = groupResult.find((g: any) => g.role === "Expert.")

        expect(assistantGroup?.count).toBe(2)
        expect(expertGroup?.count).toBe(1)
    })

    it("should handle error responses correctly when agent is not found", async () => {
        const { accessToken } = await testSetup.rootUserLogin()
        expect(accessToken).toBeTruthy()

        const nonExistentId = "123456789012345678901234"

        const resp = await testSetup.fastifyInstance.inject({
            method: 'GET',
            url: `/api/agents/${nonExistentId}`,
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        expect(resp.statusCode).toBe(404)
        const result = await resp.json()
        expect(result.error).toBeDefined()
    })

    // ── Unhappy Path ───────────────────────────────────────────────────────────

    it("should return 401 when accessing endpoints without token", async () => {
        const resp = await testSetup.fastifyInstance.inject({
            method: 'GET',
            url: '/api/agents'
        })
        expect(resp.statusCode).toBe(401)
    })

    it("should return 403 when creating with restricted user", async () => {
        const { accessToken } = await testSetup.basicUserLogin()

        const resp = await testSetup.fastifyInstance.inject({
            method: 'POST',
            url: '/api/agents',
            payload: { name: "Forbidden Agent" },
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        expect(resp.statusCode).toBe(403)
    })

    it("should return 422 when creating with missing mandatory fields", async () => {
        const { accessToken } = await testSetup.rootUserLogin()

        const resp = await testSetup.fastifyInstance.inject({
            method: 'POST',
            url: '/api/agents',
            payload: {},
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        expect(resp.statusCode).toBe(422)
    })

    it("should return 400 when providing invalid ID format", async () => {
        const { accessToken } = await testSetup.rootUserLogin()

        const resp = await testSetup.fastifyInstance.inject({
            method: 'GET',
            url: '/api/agents/invalid-id-format',
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        expect(resp.statusCode).toBe(400)
    })

    it("should return 404 when updating non-existent agent", async () => {
        const { accessToken } = await testSetup.rootUserLogin()
        const nonExistentId = "123456789012345678901234"

        const resp = await testSetup.fastifyInstance.inject({
            method: 'PUT',
            url: `/api/agents/${nonExistentId}`,
            payload: {
                agentId: "ghost-agent",
                name: "Non-existent Agent",
                description: "This agent does not exist",


                role: "Assistant.",
                behavior: "Friendly.",
                mission: "Help users."
            },
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        expect(resp.statusCode).toBe(404)
    })
})
