SKILL: redmine_issue_management
Descripción

Permite consultar, crear y modificar tickets (issues) en Redmine utilizando la API REST oficial.

Referencia oficial:
https://www.redmine.org/projects/redmine/wiki/Rest_Issues

La URL base del Redmine y la API Key serán proporcionadas dinámicamente por el usuario.

# Utiliza estos datos para conectarte y autenticar
- URL REDMINE: https://redmine.sondeosglobal.com/
- API KEY: solicitar la apikey al desarrollador



action
Acción a ejecutar
Valores posibles:

list

get

create

update

add_note

change_status
Requerido: sí

parameters
Parámetros específicos según la acción
Requerido: no

Autenticación

Todas las llamadas deben incluir el siguiente header:

X-Redmine-API-Key: {api_key}
Content-Type: application/json

Base de endpoints:

{redmine_base_url}/issues.json
{redmine_base_url}/issues/{id}.json
1. Listar tickets
Endpoint
GET /issues.json
Ejemplo CURL
curl -X GET "{redmine_base_url}/issues.json?project_id=backend&status_id=open&limit=10" \
  -H "X-Redmine-API-Key: {api_key}" \
  -H "Content-Type: application/json"
Filtros comunes

project_id

status_id (open, closed, o ID numérico)

assigned_to_id (ej: me)

tracker_id

limit

offset

2. Obtener un issue específico
Endpoint
GET /issues/{id}.json
Ejemplo CURL
curl -X GET "{redmine_base_url}/issues/123.json" \
  -H "X-Redmine-API-Key: {api_key}" \
  -H "Content-Type: application/json"
3. Crear un ticket
Endpoint
POST /issues.json
Campos mínimos requeridos

project_id

subject

Ejemplo CURL
curl -X POST "{redmine_base_url}/issues.json" \
  -H "X-Redmine-API-Key: {api_key}" \
  -H "Content-Type: application/json" \
  -d '{
    "issue": {
      "project_id": "backend",
      "subject": "Error en login OAuth",
      "description": "El endpoint /auth/google retorna 500",
      "tracker_id": 1,
      "priority_id": 2,
      "assigned_to_id": 5
    }
  }'
4. Modificar un ticket
Endpoint
PUT /issues/{id}.json
Ejemplo CURL
curl -X PUT "{redmine_base_url}/issues/123.json" \
  -H "X-Redmine-API-Key: {api_key}" \
  -H "Content-Type: application/json" \
  -d '{
    "issue": {
      "subject": "Actualizado: Error en login OAuth",
      "priority_id": 3
    }
  }'
5. Agregar una nota a un ticket

En Redmine las notas se agregan usando notes dentro de un update.

curl -X PUT "{redmine_base_url}/issues/123.json" \
  -H "X-Redmine-API-Key: {api_key}" \
  -H "Content-Type: application/json" \
  -d '{
    "issue": {
      "notes": "Se aplicó fix en commit abc123",
      "private_notes": false
    }
  }'
6. Cambiar estado de un ticket

Es necesario conocer previamente el status_id.

curl -X PUT "{redmine_base_url}/issues/123.json" \
  -H "X-Redmine-API-Key: {api_key}" \
  -H "Content-Type: application/json" \
  -d '{
    "issue": {
      "status_id": 2
    }
  }'
Manejo de errores

401: API Key inválida

403: Sin permisos suficientes

404: Issue no encontrado

422: Error de validación de datos

Comportamiento esperado para la IA

La IA debe:

Mapear lenguaje natural a acciones.

Validar que existan campos obligatorios antes de generar el request.

Generar siempre el comando CURL completo.

No ejecutar llamadas reales.

Mostrar claramente el endpoint y el body.

Informar posibles errores de validación antes de generar la llamada.

Ejemplo de interpretación en lenguaje natural

Input del usuario:

Creame un ticket en backend diciendo que el login falla y asignalo a Juan

La IA debe:

Determinar project_id = backend

Resolver assigned_to_id correspondiente a Juan

Generar el CURL listo para ejecutar









URL REDMINE: https://redmine.sondeosglobal.com/

API KEY: bc8f9c3fadb7b183f0c35f2b8dd8fa20c5cfe61b