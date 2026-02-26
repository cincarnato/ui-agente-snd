import {EntityCrud} from "@drax/crud-vue";
import type {
  IDraxCrudProvider,
  IEntityCrud,
  IEntityCrudField,
  IEntityCrudFilter,
  IEntityCrudHeader,
  IEntityCrudPermissions,
  IEntityCrudRefs,
  IEntityCrudRules
} from "@drax/crud-share";
import AgentProvider from "../providers/AgentProvider";

//Import EntityCrud Refs


class AgentCrud extends EntityCrud implements IEntityCrud {

  static singleton: AgentCrud

  constructor() {
    super();
    this.name = 'Agent'
  }

  static get instance(): AgentCrud {
    if (!AgentCrud.singleton) {
      AgentCrud.singleton = new AgentCrud()
    }
    return AgentCrud.singleton
  }

  get permissions(): IEntityCrudPermissions {
    return {
      manage: 'agent:manage',
      view: 'agent:view',
      create: 'agent:create',
      update: 'agent:update',
      delete: 'agent:delete'
    }
  }

  get headers(): IEntityCrudHeader[] {
    return this.fields.map(header => ({title: header.name, key: header.name, align: 'start'}))
  }

  get selectedHeaders(): string[] {
    return this.headers.map(header => header.key)
  }

  get actionHeaders(): IEntityCrudHeader[] {
    return [
      {
        title: 'action.actions',
        key: 'actions',
        sortable: false,
        align: 'center',
        minWidth: '190px',
        fixed: 'end'
      },
    ]
  }

  get provider(): IDraxCrudProvider<any, any, any> {
    return AgentProvider.instance
  }

  get refs(): IEntityCrudRefs {
    return {}
  }

  get rules(): IEntityCrudRules {
    return {
      name: [(v: any) => !!v || 'validation.required'],
      description: [(v: any) => !!v || 'validation.required'],
      role: [(v: any) => !!v || 'validation.required'],
      behavior: [(v: any) => !!v || 'validation.required'],
      mission: [(v: any) => !!v || 'validation.required'],
      workflow: [],
      outcomes: [],
      tools: []
    }
  }

  get fields(): IEntityCrudField[] {
    return [
      {
        name: 'name',
        type: 'string',
        label: 'name',
        default: '',
        groupTab: 'Identifier',
        hint: 'Nombre único y descriptivo del agente.',
        persistentHint: false,
        placeholder: 'AGENTE COBRANZAS',
        persistentPlaceholder: true
      },
      {
        name: 'description',
        type: 'longString',
        label: 'description',
        default: '',
        groupTab: 'Identifier',
        hint: 'Descripción funcional del agente y su propósito general.',
        persistentHint: false,
        placeholder: 'Agente especializado en gestión de cobranzas mediante canal voicebot.',
        persistentPlaceholder: true
      },
      {
        name: 'inputVariables',
        type: 'array.object',
        label: 'inputVariables',
        default: [],
        hint: 'Parámetros que se requieren para iniciar el agente.',
        persistentHint: true,
        placeholder: 'Definir variables de entrada que se pueden utilizar en el systemPrompt.',
        persistentPlaceholder: true,
        groupTab: 'Variables',
        objectFields: [{
          name: 'name',
          type: 'string',
          label: 'name',
          default: '',
          hint: 'Nombre del parámetro.',
          persistentHint: true,
          placeholder: 'dni',
          persistentPlaceholder: true
        },
          {
            name: 'type',
            type: 'enum',
            label: 'type',
            default: null,
            hint: 'Tipo de dato del parámetro.',
            persistentHint: true,
            placeholder: 'string',
            persistentPlaceholder: true,
            enum: ['string', 'number', 'boolean']
          },
          {
            name: 'required',
            type: 'boolean',
            label: 'required',
            default: false,
            hint: 'Indica si el parámetro es obligatorio.',
            persistentHint: true,
            placeholder: 'true',
            persistentPlaceholder: true
          },
          {
            name: 'description',
            type: 'longString',
            label: 'description',
            default: '',
            hint: 'Descripción del parámetro.',
            persistentHint: true,
            placeholder: 'Documento nacional de identidad del cliente.',
            persistentPlaceholder: true
          }]
      },
      {
        name: 'role',
        type: 'longString',
        label: 'role',
        default: '',
        groupTab: 'SystemPrompt',
        hint: 'Define el rol que el modelo debe asumir.',
        persistentHint: false,
        placeholder: 'Eres un agente automatizado especializado en gestión de cobranzas.',
        persistentPlaceholder: true
      },
      {
        name: 'behavior',
        type: 'longString',
        label: 'behavior',
        default: '',
        groupTab: 'SystemPrompt',
        hint: 'Define cómo debe comportarse el agente durante la conversación.',
        persistentHint: false,
        placeholder: 'Mantén un tono profesional, empático y orientado a resolución.',
        persistentPlaceholder: true
      },
      {
        name: 'mission',
        type: 'longString',
        label: 'mission',
        default: '',
        groupTab: 'SystemPrompt',
        hint: 'Objetivo principal que debe lograr el agente.',
        persistentHint: false,
        placeholder: 'Tu misión es contactar al cliente, validar identidad y gestionar el cobro.',
        persistentPlaceholder: true
      },
      {
        name: 'sessionContext',
        type: 'longString',
        label: 'sessionContext',
        default: '',
        groupTab: 'SystemPrompt',
        hint: 'Variables dinámicas que se inyectarán al iniciar la sesión.',
        persistentHint: false,
        placeholder: `
        nombre cliente: {{nombreCliente}}
        monto deuda: {{montoDeuda}}
        producto: {{producto}}.`,
        persistentPlaceholder: true
      },
      {
        name: 'restrictions',
        type: 'longString',
        label: 'restrictions',
        default: '',
        groupTab: 'SystemPrompt',
        hint: 'Reglas estrictas que el agente nunca debe violar.',
        persistentHint: false,
        placeholder: 'No inventar información. No ofrecer descuentos no autorizados.',
        persistentPlaceholder: true
      },
      {
        name: 'additionalInstructions',
        type: 'longString',
        label: 'additionalInstructions',
        default: '',
        groupTab: 'SystemPrompt',
        hint: 'Instrucciones complementarias para casos específicos.',
        persistentHint: false,
        placeholder: 'Si el cliente solicita plan de pagos, consultar herramienta de financiación.',
        persistentPlaceholder: true
      },
      {
        name: 'answeringMachineMessage',
        type: 'longString',
        label: 'answeringMachineMessage',
        default: '',
        groupTab: 'SystemPrompt',
        hint: 'Mensaje que se deja en caso de detectar contestador automático.',
        persistentHint: false,
        placeholder: 'Le habla el sistema automático de cobranzas. Por favor comuníquese al 0800-XXX.',
        persistentPlaceholder: true
      },
      {
        name: 'workflow',
        type: 'array.object',
        label: 'workflow',
        default: [],
        groupTab: 'Workflow',
        hint: 'Secuencia estructurada de pasos que debe seguir el agente.',
        persistentHint: false,
        placeholder: 'Agregar pasos del flujo conversacional.',
        persistentPlaceholder: true,
        objectFields: [{
          name: 'step',
          type: 'string',
          label: 'step',
          default: '',
          hint: 'Código interno del paso.',
          persistentHint: false,
          placeholder: 'VALIDACION_IDENTIDAD',
          persistentPlaceholder: true
        },
          {
            name: 'description',
            type: 'longString',
            label: 'description',
            default: '',
            hint: 'Descripción detallada del comportamiento esperado en este paso.',
            persistentHint: false,
            placeholder: 'Solicitar DNI y validar identidad antes de continuar.',
            persistentPlaceholder: true
          }]
      },
      {
        name: 'outcomes',
        type: 'array.object',
        label: 'outcomes',
        default: [],
        groupTab: 'Outcomes',
        hint: 'Resultados válidos que determinan el cierre de la interacción.',
        persistentHint: false,
        placeholder: 'Definir posibles resultados finales.',
        persistentPlaceholder: true,
        objectFields: [{
          name: 'code',
          type: 'string',
          label: 'code',
          default: '',
          hint: 'Código único del resultado.',
          persistentHint: false,
          placeholder: 'PROMESA_DE_PAGO',
          persistentPlaceholder: true
        },
          {
            name: 'description',
            type: 'longString',
            label: 'description',
            default: '',
            hint: 'Descripción del resultado.',
            persistentHint: false,
            placeholder: 'El cliente se compromete a pagar en una fecha acordada.',
            persistentPlaceholder: true
          }]
      },
      {
        name: 'tools',
        type: 'array.object',
        label: 'tools',
        default: [],
        groupTab: 'Tools',
        hint: 'Definición de herramientas que el agente puede invocar.',
        persistentHint: false,
        placeholder: 'Configurar herramientas externas.',
        persistentPlaceholder: true,
        objectFields: [{
          name: 'name',
          type: 'string',
          label: 'name',
          default: '',
          hint: 'Nombre interno de la herramienta.',
          persistentHint: false,
          placeholder: 'consultarDeuda',
          persistentPlaceholder: true
        },
          {
            name: 'description',
            type: 'longString',
            label: 'description',
            default: '',
            hint: 'Descripción funcional de la herramienta.',
            persistentHint: false,
            placeholder: 'Consulta el saldo actualizado del cliente.',
            persistentPlaceholder: true
          },

          {
            name: 'params',
            type: 'array.object',
            label: 'params',
            default: [],
            hint: 'Parámetros que requiere la herramienta.',
            persistentHint: false,
            placeholder: 'Definir parámetros de entrada.',
            persistentPlaceholder: true,
            objectFields: [{
              name: 'name',
              type: 'string',
              label: 'name',
              default: '',
              hint: 'Nombre del parámetro.',
              persistentHint: false,
              placeholder: 'dni',
              persistentPlaceholder: true
            },
              {
                name: 'type',
                type: 'enum',
                label: 'type',
                default: null,
                hint: 'Tipo de dato del parámetro.',
                persistentHint: false,
                placeholder: 'string',
                persistentPlaceholder: true,
                enum: ['string', 'number', 'boolean']
              },
              {
                name: 'required',
                type: 'boolean',
                label: 'required',
                default: false,
                hint: 'Indica si el parámetro es obligatorio.',
                persistentHint: false,
                placeholder: 'true',
                persistentPlaceholder: true
              },
              {
                name: 'description',
                type: 'longString',
                label: 'description',
                default: '',
                hint: 'Descripción del parámetro.',
                persistentHint: false,
                placeholder: 'Documento nacional de identidad del cliente.',
                persistentPlaceholder: true
              }]
          },

          {
            name: 'instructionsUpdate',
            type: 'longString',
            label: 'instructionsUpdate',
            default: '',
            hint: 'Actualiza el systemPrompt (comportamiento del agente) si esta tool es invocada.',
            persistentHint: true,
            placeholder: 'Ahora tu rol es... y tu mision es...',
            persistentPlaceholder: true
          },
          {
            name: 'http',
            type: 'object',
            label: 'http',
            default: {"url": "", "method": null, "headers": [], "body": ""},
            hint: 'Configuración de integración HTTP.',
            persistentHint: false,
            placeholder: 'Configurar endpoint HTTP.',
            persistentPlaceholder: true,
            objectFields: [{
              name: 'url',
              type: 'string',
              label: 'url',
              default: '',
              hint: 'URL del endpoint.',
              persistentHint: false,
              placeholder: 'https://api.midominio.com/deuda',
              persistentPlaceholder: true
            },
              {
                name: 'method',
                type: 'enum',
                label: 'method',
                default: null,
                hint: 'Método HTTP.',
                persistentHint: false,
                placeholder: 'POST',
                persistentPlaceholder: true,
                enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
              },
              {
                name: 'headers',
                type: 'array.object',
                label: 'headers',
                default: [],
                hint: 'Cabeceras necesarias para autenticación o contexto.',
                persistentHint: false,
                placeholder: 'Agregar headers HTTP.',
                persistentPlaceholder: true,
                objectFields: [{
                  name: 'key',
                  type: 'string',
                  label: 'key',
                  default: '',
                  hint: 'Nombre del header.',
                  persistentHint: false,
                  placeholder: 'Authorization',
                  persistentPlaceholder: true
                },
                  {
                    name: 'value',
                    type: 'string',
                    label: 'value',
                    default: '',
                    hint: 'Valor del header.',
                    persistentHint: false,
                    placeholder: 'Bearer token',
                    persistentPlaceholder: true
                  }]
              },
              {
                name: 'body',
                type: 'longString',
                label: 'body',
                default: '',
                hint: 'Body en formato JSON con variables dinámicas.',
                persistentHint: false,
                placeholder: '{ "dni": "{{dni}}" }',
                persistentPlaceholder: true
              }]
          },
          {
            name: 'waitToRespond',
            type: 'boolean',
            label: 'waitToRespond',
            default: false,
            hint: 'Indica si el agente debe esperar la respuesta antes de continuar.',
            persistentHint: false,
            placeholder: 'true',
            persistentPlaceholder: true
          },
          {
            name: 'responseVariable',
            type: 'string',
            label: 'responseVariable',
            default: '',
            hint: 'Variable donde se almacenará la respuesta para uso posterior.',
            persistentHint: false,
            placeholder: 'resultadoDeuda',
            persistentPlaceholder: true
          }]
      }
    ]
  }

  get filters(): IEntityCrudFilter[] {
    return [
      //{name: '_id', type: 'string', label: 'ID', default: '', operator: 'eq' },
    ]
  }

  get isViewable() {
    return true
  }

  get isEditable() {
    return true
  }

  get isCreatable() {
    return true
  }

  get isDeletable() {
    return true
  }

  get isExportable() {
    return true
  }

  get exportFormats() {
    return ['CSV', 'JSON']
  }

  get exportHeaders() {
    return ['_id']
  }

  get isImportable() {
    return true
  }

  get isColumnSelectable() {
    return true
  }

  get isGroupable() {
    return true
  }

  get importFormats() {
    return ['CSV', 'JSON']
  }

  get dialogFullscreen() {
    return false
  }

  get tabs() {
    return [
      'Identifier', 'Variables','SystemPrompt', 'Workflow', 'Outcomes', 'Tools'
    ]
  }

  get menus() {
    return []
  }


}

export default AgentCrud

