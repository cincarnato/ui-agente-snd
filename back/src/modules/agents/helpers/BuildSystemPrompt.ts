import {IAgent} from "../interfaces/IAgent";


export function buildSystemPrompt(agent: IAgent): string {
    const sections: string[] = []

    const addSection = (
        title: string,
        content?: string,
        subtitle?: string
    ) => {
        if (!content?.trim() && !subtitle?.trim()) return

        const header = `# ${title.toUpperCase()} `
        const sub = subtitle?.trim() ? ` \n${subtitle.trim()}` : ""
        const body = content?.trim() ? ` \n${content.trim()}` : ""

        sections.push(`${header}${sub}${body}`)
    }

    addSection("Rol", agent.role)

    addSection("Misión", agent.mission)

    addSection("Comportamiento", agent.behavior)

    addSection("Contexto de sesión", agent.sessionContext)

    addSection("Restricciones", agent.restrictions)

    addSection("Instrucciones adicionales", agent.additionalInstructions)

    addSection("Mensaje contestador automático", agent.answeringMachineMessage)

    if (agent.workflow?.length) {
        const workflowText = agent.workflow
            .map(step => `- ${step.step}: ${step.description}`)
            .join("\n")

        addSection(
            "Workflow conversacional",
            workflowText,
            "Secuencia estructurada que debe seguir el agente durante la interacción."
        )
    }

    if (agent.outcomes?.length) {
        const outcomesText = agent.outcomes
            .map(o => `- ${o.code}: ${o.description}`)
            .join("\n")

        addSection(
            "Resultados finales válidos",
            outcomesText,
            "La conversación debe finalizar obligatoriamente seleccionando EXACTAMENTE UNO de los siguientes resultados. En todos los casos, el agente debe invocar la tool TIPIFICAR_LLAMADA enviando el parámetro obligatorio 'tipificacion' con el código del resultado seleccionado."
        )
    }

    if (agent.tools?.length) {
        const toolsText = agent.tools.map(tool => {
            const paramsText = tool.params?.length
                ? tool.params
                    .map(p =>
                        `    - ${p.name} (${p.type}) ${p.required ? "[REQUERIDO]" : "[OPCIONAL]"}: ${p.description}`
                    )
                    .join("\n")
                : "    - Sin parámetros"

            return `
- ${tool.name}
  Descripción: ${tool.description}
  Parámetros:
${paramsText}
      `.trim()
        }).join("\n\n")

        addSection(
            "Herramientas disponibles",
            toolsText,
            "Estas herramientas pueden ser invocadas durante la conversación cuando sea necesario. No se deben inventar parámetros."
        )
    }

    return sections.join(" \n\n")
}
