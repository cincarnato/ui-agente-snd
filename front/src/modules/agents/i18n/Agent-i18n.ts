const messages = {
  en: {
    agent: {
      entity: 'Agent',
      menu: 'Agents',
      crud: 'Manage Agents',
      field: {
        name: 'Name',
        description: 'Description',
        role: 'Role',
        behavior: 'Behavior',
        mission: 'Mission',
        sessionContext: 'Session Context',
        restrictions: 'Restrictions',
        additionalInstructions: 'Additional Instructions',
        answeringMachineMessage: 'Answering Machine Message',

        workflow: 'Workflow',
        step: 'Step',
        stepDescription: 'Step Description',

        outcomes: 'Outcomes',
        code: 'Code',
        outcomeDescription: 'Outcome Description',

        tools: 'Tools',
        toolName: 'Tool Name',
        toolDescription: 'Tool Description',
        waitToRespond: 'Wait For Tool Response',
        params: 'Parameters',
        paramName: 'Parameter Name',
        paramType: 'Parameter Type',
        paramRequired: 'Required',
        paramDescription: 'Parameter Description',

        http: 'HTTP Configuration',
        url: 'URL',
        method: 'HTTP Method',
        headers: 'Headers',
        headerKey: 'Header Key',
        headerValue: 'Header Value',
        body: 'Body',

        responseVariable: 'Response Variable'
      }
    },

    permission: {
      'agent:view': 'View Agent',
      'agent:create': 'Create Agent',
      'agent:update': 'Edit Agent',
      'agent:delete': 'Delete Agent',
      'agent:manage': 'Manage Agents',
    }
  },

  es: {
    agent: {
      entity: 'Agente IA',
      menu: 'Agentes IA',
      crud: 'Gestionar Agentes IA',
      field: {
        name: 'Nombre',
        description: 'Descripción',
        role: 'Rol',
        behavior: 'Comportamiento',
        mission: 'Misión',
        sessionContext: 'Contexto de Sesión',
        restrictions: 'Restricciones',
        additionalInstructions: 'Instrucciones Adicionales',
        answeringMachineMessage: 'Mensaje de Contestador Automático',

        workflow: 'Flujo de Trabajo',
        step: 'Paso',
        stepDescription: 'Descripción del Paso',

        outcomes: 'Resultados',
        code: 'Código',
        outcomeDescription: 'Descripción del Resultado',

        tools: 'Herramientas',
        toolName: 'Nombre de la Herramienta',
        toolDescription: 'Descripción de la Herramienta',
        waitToRespond: 'Esperar Respuesta de la Herramienta',
        params: 'Parámetros',
        paramName: 'Nombre del Parámetro',
        paramType: 'Tipo de Parámetro',
        paramRequired: 'Obligatorio',
        paramDescription: 'Descripción del Parámetro',

        http: 'Configuración HTTP',
        url: 'URL',
        method: 'Método HTTP',
        headers: 'Headers',
        headerKey: 'Clave del Header',
        headerValue: 'Valor del Header',
        body: 'Body',

        responseVariable: 'Variable de Respuesta'
      }
    },

    permission: {
      'agent:view': 'Ver Agente',
      'agent:create': 'Crear Agente',
      'agent:update': 'Editar Agente',
      'agent:delete': 'Eliminar Agente',
      'agent:manage': 'Gestionar Agentes',
    }
  }
}

export default messages;
