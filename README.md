# mavi-clients
Una prueba técnica para MAVI en la que tuve que crear e implementar una API RESTful para realizar operaciones CRUD en una base de datos para gestionar la información de los clientes.

Paso a paso para la implementación:

Este proyecto incluye una API creada con Node.js y una aplicación front-end en Vue.js para gestionar la información de clientes mediante operaciones CRUD.

Requisitos Previos:
Node.js instalado
Vue CLI

Paso 1: Clonar el repositorio

git clone <URL del repositorio>

Paso 2: Instalación de Dependencias

Navega al directorio API_EP:
cd API_EP

Instala las dependencias necesarias:
npm install
Configura el archivo .env

Inicia la API:
npm start
La API estará disponible en http://localhost:3000.

Proyecto Vue (Frontend)
Navega al directorio crud_mavi_vue:
bash
Copy code
cd crud_mavi_vue
Instala las dependencias necesarias:
bash
Copy code
npm install
Inicia la aplicación Vue:
bash
Copy code
npm run serve
La aplicación estará disponible en http://localhost:8080.

Paso 3: Interacción entre la API y la aplicación Vue
La aplicación Vue interactúa con la API para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos de clientes.

Para crear un nuevo cliente, se puede acceder a la vista de clientes y llenar los datos.
Para editar un cliente, selecciona el cliente desde la lista y realiza las modificaciones.
Para eliminar un cliente, selecciona el cliente y presion ale botón Eliminar.

Estructura del Proyecto
API_EP: Contiene la API con Node.js.

controllers/: Lógica de las operaciones CRUD.
routes/: Definición de las rutas de la API.
models/: Modelos de la base de datos.
server.js: Archivo principal que inicia el servidor de la API.
mavi-clients-vue: Contiene la aplicación Vue.
src/: Directorio donde se encuentran los componentes Vue.

Paso 4: Pruebas
Asegúrate de que tanto la API como la aplicación Vue estén corriendo en sus respectivos puertos.
Navega a http://localhost:8080 y prueba las operaciones CRUD.
