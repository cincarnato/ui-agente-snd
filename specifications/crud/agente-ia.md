# Historia de usuario

Como: administrador del sistema  
Quiero: gestionar AgenteIA  
Para: configurar agentes de inteligencia artificial con prompts estructurados, validados y versionados que garanticen consistencia en su comportamiento

## Atributos

| Field | Type | Required | Index | Validations | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| agentId | string | yes | yes | min:3, max:50 | Unique agent identifier (no duplicates) |
| name | string | yes | yes | min:3, max:100 | Descriptive name of the agent |
| description | string | yes | no | min:10, max:500 | Description of the agent's purpose |
| version | number | yes | no | min:1 | Agent version (auto-incremented when an active agent is modified) |
| status | enum:['DRAFT','ACTIVE','INACTIVE'] | yes | yes | - | Current status of the agent |
| role | string | yes | no | min:10 | Prompt section: defines what the agent is |
| behavior | string | yes | no | min:10 | Prompt section: defines tone, conversational rules and style |
| mission | string | yes | no | min:10 | Prompt section: defines the main objective of the agent |
| sessionContext | string | no | no | - | List of dynamic injectable variables in the prompt |
| workflow | array.object | no | no | - | Ordered list of conversational flow steps |
| restrictions | array.string | no | no | - | List of rules the agent cannot violate |
| additionalInstructions | string | no | no | - | Optional additional business instructions |

### Workflow item structure

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| number | number | yes | Step order number |
| title | string | yes | Short title of the step |
| description | string | yes | Detailed description of what happens in this step |


## Criterios de aceptación

### Escenario 1: Crear AgenteIA exitosamente
Dado: que el administrador del sistema se encuentra en la pantalla de gestión de AgenteIA  
Cuando: completa los campos obligatorios (agentId, nombre, descripcion, rol, comportamiento, mision) con información válida y confirma la operación  
Entonces: el sistema registra el nuevo AgenteIA con estado 'BORRADOR' y versión 1 por defecto, y muestra un mensaje de confirmación

### Escenario 2: Validación de campos obligatorios
Dado: que el administrador del sistema intenta crear o actualizar un AgenteIA  
Cuando: omite uno o más campos obligatorios o ingresa datos inválidos  
Entonces: el sistema muestra mensajes de validación claros y no permite continuar

### Escenario 3: Validación de agentId único
Dado: que el administrador intenta crear un AgenteIA  
Cuando: ingresa un agentId que ya existe en el sistema  
Entonces: el sistema rechaza la operación con un mensaje de error indicando que el identificador ya está en uso

### Escenario 4: Versionado automático
Dado: que existe un AgenteIA con estado 'ACTIVO'  
Cuando: el administrador modifica alguno de sus campos de configuración  
Entonces: el sistema incrementa automáticamente el número de versión y mantiene el historial

### Escenario 5: Visualizar listado de AgenteIA
Dado: que existen uno o más AgenteIA registrados  
Cuando: el administrador del sistema accede a la sección correspondiente  
Entonces: el sistema muestra el listado actualizado con información relevante (nombre, estado, version) ordenado por nombre

### Escenario 6: Editar AgenteIA
Dado: que el administrador del sistema selecciona un AgenteIA existente  
Cuando: modifica los datos permitidos y confirma la operación  
Entonces: el sistema actualiza la información y muestra confirmación

### Escenario 7: Eliminar AgenteIA (soft delete)
Dado: que el administrador del sistema selecciona un AgenteIA existente  
Cuando: confirma la eliminación  
Entonces: el sistema marca el registro con deletedAt (eliminación lógica), lo remueve del listado principal y muestra confirmación

### Escenario 8: Cambiar estado de AgenteIA
Dado: que el administrador selecciona un AgenteIA  
Cuando: cambia su estado entre BORRADOR, ACTIVO e INACTIVO  
Entonces: el sistema actualiza el estado y refleja el cambio en el listado

### Escenario 9: Filtrar agentes por estado
Dado: que existen AgenteIA con diferentes estados  
Cuando: el administrador aplica un filtro por estado  
Entonces: el sistema muestra únicamente los agentes que coinciden con el estado seleccionado
