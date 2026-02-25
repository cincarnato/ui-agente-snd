import { IEntitySchema } from "@drax/arch";

const AgenteIASchema: IEntitySchema = {
    name: "Agent",
    module: "agents",
    apiBasePath: "agents",
    apiTag: "Agent",
    tabs: ["Identifier", "SystemPrompt", "Workflow","Outcomes", 'Tools'],
    schema: {
        name: {
            type: 'string',
            required: true,
            index: true,
            search: true,
            header: true,
            groupTab: "Identifier",
            mdCol: 6,
            placeholder: 'AGENTE COBRANZAS',
            persistentPlaceholder: true,
            hint:'Nombre único y descriptivo del agente.',
            persistentHint: true
        },
        description: {
            type: 'longString',
            required: true,
            search: true,
            header: false,
            groupTab: "Identifier",
            mdCol: 12,
            placeholder: 'Agente especializado en gestión de cobranzas mediante canal voicebot.',
            persistentPlaceholder: true,
            hint: 'Descripción funcional del agente y su propósito general.',
            persistentHint: true
        },
        role: {
            type: 'longString',
            required: true,
            header: false,
            groupTab: "SystemPrompt",
            mdCol: 12,
            placeholder: 'Eres un agente automatizado especializado en gestión de cobranzas.',
            persistentPlaceholder: true,
            hint: 'Define el rol que el modelo debe asumir.',
            persistentHint: true
        },
        behavior: {
            type: 'longString',
            required: true,
            header: false,
            groupTab: "SystemPrompt",
            mdCol: 12,
            placeholder: 'Mantén un tono profesional, empático y orientado a resolución.',
            persistentPlaceholder: true,
            hint: 'Define cómo debe comportarse el agente durante la conversación.',
            persistentHint: true
        },
        mission: {
            type: 'longString',
            required: true,
            header: false,
            groupTab: "SystemPrompt",
            mdCol: 12,
            placeholder: 'Tu misión es contactar al cliente, validar identidad y gestionar el cobro.',
            persistentPlaceholder: true,
            hint: 'Objetivo principal que debe lograr el agente.',
            persistentHint: true
        },
        sessionContext: {
            type: 'longString',
            required: false,
            header: false,
            groupTab: "SystemPrompt",
            mdCol: 12,
            placeholder: 'Datos dinámicos como {nombreCliente}, {montoDeuda}, {producto}.',
            persistentPlaceholder: true,
            hint: 'Variables dinámicas que se inyectarán al iniciar la sesión.',
            persistentHint: true
        },
        restrictions: {
            type: 'longString',
            required: false,
            header: false,
            groupTab: "SystemPrompt",
            mdCol: 12,
            placeholder: 'No inventar información. No ofrecer descuentos no autorizados.',
            persistentPlaceholder: true,
            hint: 'Reglas estrictas que el agente nunca debe violar.',
            persistentHint: true
        },
        additionalInstructions: {
            type: 'longString',
            required: false,
            header: false,
            groupTab: "SystemPrompt",
            mdCol: 12,
            placeholder: 'Si el cliente solicita plan de pagos, consultar herramienta de financiación.',
            persistentPlaceholder: true,
            hint: 'Instrucciones complementarias para casos específicos.',
            persistentHint: true
        },
        answeringMachineMessage:{
            type: 'longString',
            required: false,
            header: false,
            groupTab: "SystemPrompt",
            mdCol: 12,
            placeholder: 'Le habla el sistema automático de cobranzas. Por favor comuníquese al 0800-XXX.',
            persistentPlaceholder: true,
            hint: 'Mensaje que se deja en caso de detectar contestador automático.',
            persistentHint: true
        },

        workflow: {
            type: 'array.object',
            required: false,
            header: false,
            groupTab: "Workflow",
            mdCol: 12,
            placeholder: 'Agregar pasos del flujo conversacional.',
            persistentPlaceholder: true,
            hint: 'Secuencia estructurada de pasos que debe seguir el agente.',
            persistentHint: true,
            schema: {
                step: {
                    type: 'string',
                    required: true,
                    placeholder: 'VALIDACION_IDENTIDAD',
                    persistentPlaceholder: true,
                    hint: 'Código interno del paso.',
                    persistentHint: true
                },
                description: {
                    type: 'longString',
                    required: true,
                    placeholder: 'Solicitar DNI y validar identidad antes de continuar.',
                    persistentPlaceholder: true,
                    hint: 'Descripción detallada del comportamiento esperado en este paso.',
                    persistentHint: true
                },
            }
        },

        outcomes: {
            type: 'array.object',
            required: false,
            header: false,
            groupTab: "Outcomes",
            mdCol: 12,
            placeholder: 'Definir posibles resultados finales.',
            persistentPlaceholder: true,
            hint: 'Resultados válidos que determinan el cierre de la interacción.',
            persistentHint: true,
            schema: {
                code: {
                    type: 'string',
                    required: true,
                    placeholder: 'PROMESA_DE_PAGO',
                    persistentPlaceholder: true,
                    hint: 'Código único del resultado.',
                    persistentHint: true
                },
                description: {
                    type: 'longString',
                    required: true,
                    placeholder: 'El cliente se compromete a pagar en una fecha acordada.',
                    persistentPlaceholder: true,
                    hint: 'Descripción del resultado.',
                    persistentHint: true
                },
            }
        },

        tools: {
            type: 'array.object',
            required: false,
            header: false,
            groupTab: "Tools",
            mdCol: 12,
            placeholder: 'Configurar herramientas externas.',
            persistentPlaceholder: true,
            hint: 'Definición de herramientas que el agente puede invocar.',
            persistentHint: true,
            schema: {
                name: {
                    type: 'string',
                    required: true,
                    placeholder: 'consultarDeuda',
                    persistentPlaceholder: true,
                    hint: 'Nombre interno de la herramienta.',
                    persistentHint: true
                },
                description: {
                    type: 'longString',
                    required: true,
                    placeholder: 'Consulta el saldo actualizado del cliente.',
                    persistentPlaceholder: true,
                    hint: 'Descripción funcional de la herramienta.',
                    persistentHint: true
                },
                waitToRespond: {
                    type: 'boolean',
                    required: false,
                    placeholder: 'true',
                    persistentPlaceholder: true,
                    hint: 'Indica si el agente debe esperar la respuesta antes de continuar.',
                    persistentHint: true
                },
                params: {
                    type: 'array.object',
                    required: false,
                    header: false,
                    mdCol: 12,
                    placeholder: 'Definir parámetros de entrada.',
                    persistentPlaceholder: true,
                    hint: 'Parámetros que requiere la herramienta.',
                    persistentHint: true,
                    schema: {
                        name: {
                            type: 'string',
                            required: true,
                            placeholder: 'dni',
                            persistentPlaceholder: true,
                            hint: 'Nombre del parámetro.',
                            persistentHint: true
                        },
                        type: {
                            type: 'enum',
                            enum: ['string', 'number', 'boolean'],
                            required: true,
                            placeholder: 'string',
                            persistentPlaceholder: true,
                            hint: 'Tipo de dato del parámetro.',
                            persistentHint: true
                        },
                        required: {
                            type: 'boolean',
                            required: true,
                            placeholder: 'true',
                            persistentPlaceholder: true,
                            hint: 'Indica si el parámetro es obligatorio.',
                            persistentHint: true
                        },
                        description: {
                            type: 'longString',
                            required: true,
                            placeholder: 'Documento nacional de identidad del cliente.',
                            persistentPlaceholder: true,
                            hint: 'Descripción del parámetro.',
                            persistentHint: true
                        },
                    }
                },
                http: {
                    type: 'array.object',
                    required: false,
                    header: false,
                    mdCol: 12,
                    placeholder: 'Configurar endpoint HTTP.',
                    persistentPlaceholder: true,
                    hint: 'Configuración de integración HTTP.',
                    persistentHint: true,
                    schema: {
                        url: {
                            type: 'string',
                            required: true,
                            placeholder: 'https://api.midominio.com/deuda',
                            persistentPlaceholder: true,
                            hint: 'URL del endpoint.',
                            persistentHint: true
                        },
                        method: {
                            type: 'enum',
                            enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
                            required: true,
                            placeholder: 'POST',
                            persistentPlaceholder: true,
                            hint: 'Método HTTP.',
                            persistentHint: true
                        },
                        headers: {
                            type: 'array.object',
                            required: false,
                            header: false,
                            mdCol: 12,
                            placeholder: 'Agregar headers HTTP.',
                            persistentPlaceholder: true,
                            hint: 'Cabeceras necesarias para autenticación o contexto.',
                            persistentHint: true,
                            schema: {
                                key: {
                                    type: 'string',
                                    required: false,
                                    placeholder: 'Authorization',
                                    persistentPlaceholder: true,
                                    hint: 'Nombre del header.',
                                    persistentHint: true
                                },
                                value: {
                                    type: 'string',
                                    required: false,
                                    placeholder: 'Bearer {token}',
                                    persistentPlaceholder: true,
                                    hint: 'Valor del header.',
                                    persistentHint: true
                                },
                            }
                        },
                        body: {
                            type: 'longString',
                            required: false,
                            placeholder: '{ "dni": "{dni}" }',
                            persistentPlaceholder: true,
                            hint: 'Body en formato JSON con variables dinámicas.',
                            persistentHint: true
                        },

                    }
                },
                responseVariable: {
                    type: 'string',
                    required: false,
                    placeholder: 'resultadoDeuda',
                    persistentPlaceholder: true,
                    hint: 'Variable donde se almacenará la respuesta para uso posterior.',
                    persistentHint: true
                },
            }
        },
    }
};

export default AgenteIASchema;
export { AgenteIASchema };
