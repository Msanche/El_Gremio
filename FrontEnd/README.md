# El Gremio


## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Requisitos Previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Uso](#uso)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Dependencias](#dependencias)

## Introducción
**El Gremio** es un sistema de gestión web diseñado para la administración de productos y transacciones, enfocado en el mercado de artesanías y manualidades. El objetivo de este proyecto es combinar tecnologías modernas y proveedores confiables para ofrecer un entorno eficiente, seguro y adaptable a las necesidades del mercado.

## Requisitos Previos

Antes de comenzar con la instalación, asegúrate de tener instaladas las siguientes herramientas:

- **Node.js** (versión 16 o superior): Para ejecutar el servidor y las dependencias de backend.
  - [Descargar Node.js](https://nodejs.org/)
- **NPM** (Node Package Manager): Generalmente se instala junto con Node.js.
- **Vue.js**: Para el desarrollo del frontend.
- **MySQL**: Para la base de datos que almacena los productos y transacciones.
- **Sequelize**: ORM utilizado para interactuar con la base de datos.

Además, asegúrate de contar con las siguientes herramientas de desarrollo:

- **Editor de código**: Se recomienda usar [Visual Studio Code](https://code.visualstudio.com/).
- **Git**: Para gestionar el control de versiones.
  - [Descargar Git](https://git-scm.com/)

## instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

1. **Clona el repositorio**:
   Abre una terminal y ejecuta el siguiente comando para clonar el proyecto:

   ```bash
   git clone https://github.com/Msanche/El_Gremio.git
   ```

2. **Instalar las dependencias: Navega a la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias de backend:** 
    ```
   cd El_Gremio
    npm install
    ```

3. **Configurar las variables de entorno: Modifica el archivo .env en la carpeta de BackEnd del proyecto y agrega las siguientes variables de entorno (ajústalas a tus necesidades):**
    ```
    DB_HOST=localhost
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=el_gremio
    JWT_SECRET=tu_secreto
    ```

4. **Iniciar el servidor: Una vez que las dependencias estén instaladas y las variables de entorno configuradas, puedes iniciar el servidor backend con el siguiente comando:**
   ```
   npm run dev
   ```
Esto iniciará el servidor en modo de desarrollo utilizando nodemon, lo que permite reiniciar automáticamente el servidor cada vez que realices cambios en el código.

5. **Iniciar el frontend: Navega a la carpeta del frontend y ejecuta:**
    ```
    cd frontend
    npm install
    npm run serve
    ```
6. **Accede a la aplicación: Una vez que el servidor esté en funcionamiento, abre tu navegador y ve a http://localhost:3000 para acceder al sistema de gestión El Gremio.**
   
## Uso
Una vez que el proyecto esté corriendo, podrás interactuar con El Gremio a través de la interfaz de usuario web, que te permitirá:

Crear cuenta de cliente o vendedor.
Administrar productos.
Realizar transacciones de compra y venta.
Gestionar el catálogo de productos.
Revisar detalles de productos.

## Estructura del proyecto
El proyecto está organizado en dos principales carpetas: frontend y backend.

**FrontEnd:** Contiene la parte de la interfaz de usuario desarrollada con Vue.js.
**BackEnd:** Contiene el servidor de Node.js, gestionando las rutas, la base de datos y la lógica del negocio.

## Dependencias
**Backend**
bcrypt: Librería para encriptar contraseñas.
cors: Middleware para habilitar CORS.
crypto: Utilizado para operaciones criptográficas.
dotenv: Manejo de variables de entorno.
express: Framework para el backend.
https: Para crear servidores seguros.
jsonwebtoken: Manejo de tokens JWT para autenticación.
morgan: Middleware para logging de peticiones HTTP.
multer: Middleware para manejar la carga de archivos.
mysql2: Conector para bases de datos MySQL.
nodemailer: Para enviar correos electrónicos.
sequelize: ORM para interactuar con MySQL.
**DevDependencies**
nodemon: Herramienta para reiniciar el servidor automáticamente durante el desarrollo.

## Lista de comandos
Aqui se encuentra una seccion para todos los comandos que son mas frecuentemente utilizados en el proyecto
### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

### Como fusionar la branch con la branch de desarrollo

#### Crea una nueva rama  
```
git checkout -b nombre-de-la-rama
```

#### Para cambiar de rama 
```
git checkout nombre-de-la-rama
```

#### Visualizar las Ramas Existentes 

```
git branch
```

#### Fusionar (Merge) Ramas 

```
git checkout nombre-de-la-rama-principal
git merge nombre-de-la-rama
```
