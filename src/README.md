# API de Gestión de Tareas

Esta es una API RESTful para la gestión de tareas, construida con Node.js, Express y MySQL, utilizando arquitectura hexagonal.

## Requisitos previos

- Node.js (v14 o superior)
- MySQL

## Instalación

1. Clona este repositorio:

   ```
   git clone <url-del-repositorio>
   cd task-management-api
   ```

2. Instala las dependencias:

   ```
   npm install
   ```

3. Configura la base de datos:

   - Crea una base de datos MySQL llamada `task_management`
   - Ejecuta el siguiente script SQL para crear la tabla de tareas:
     ```sql
     CREATE TABLE tasks (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT,
       status ENUM('pendiente', 'en_progreso', 'completada') DEFAULT 'pendiente'
     );
     ```

4. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
     ```
     PORT=3000
     DB_HOST=localhost
     DB_USER=tu_usuario
     DB_PASSWORD=tu_contraseña
     DB_NAME=task_management
     ```
   - Ajusta los valores según tu configuración de MySQL

## Ejecución

Para iniciar el servidor, ejecuta:

```
npm start
```

El servidor estará disponible en `http://localhost:3000`.

## Endpoints

- `GET /api/tasks`: Obtener todas las tareas
- `GET /api/tasks/:id`: Obtener una tarea por ID
- `POST /api/tasks`: Crear una nueva tarea
- `PUT /api/tasks/:id`: Actualizar una tarea existente
- `DELETE /api/tasks/:id`: Eliminar una tarea

## Ejemplo de uso

Crear una nueva tarea:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Mi primera tarea", "description": "Descripción de la tarea"}'
```

## Estructura del proyecto

El proyecto sigue una arquitectura hexagonal:

- `src/domain`: Contiene las entidades del dominio (Task)
- `src/application`: Contiene la lógica de aplicación (TaskService)
- `src/infrastructure`: Contiene la implementación de interfaces y controladores
- `src/interfaces`: Define las interfaces para los repositorios

## Contribuir

Si deseas contribuir a este proyecto, por favor crea un fork y envía un pull request con tus cambios.

## Licencia

Este proyecto está bajo la Licencia MIT.
