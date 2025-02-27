# Backend TI 41

Este es un proyecto backend desarrollado en Node.js utilizando Express y Sequelize para gestionar usuarios en una base de datos MySQL. Implementa operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre la tabla `Users` y expone endpoints para su interacción a través de HTTP.

## Tecnologías utilizadas

- **Node.js** - Entorno de ejecución de JavaScript en el servidor.
- **Express** - Framework para manejar rutas y peticiones HTTP.
- **Sequelize** - ORM para gestionar la base de datos MySQL.
- **MySQL** - Base de datos utilizada para almacenar los usuarios.
- **dotenv** - Manejo de variables de entorno.

## Configuración de la Base de Datos

La base de datos utilizada en el proyecto se configura en `database.config.js` con los siguientes parámetros:

```javascript
export const DatabaseConfig = new Sequelize({
  host: "localhost",
  database: "backend_ti_41",
  username: "root",
  password: "",
  dialect: "mysql",
  timezone: "-05:00",
  port: 3306,
  logging: false,
  pool: {
    max: 5,
    min: 5,
    acquire: 60000,
    idle: 15000,
  },
});
```

## Configuración del Servidor

El servidor está construido con Express y se inicializa en `server.js`. Utiliza middleware para procesar solicitudes en formato JSON y maneja rutas relacionadas con los usuarios.

```javascript
const app = express();
const port = process.env.APP_PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const database = new Database();
database.connection();
const userRoutes = new UserRoutes();
userRoutes.iniUserRouter(app);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
```

## Endpoints Disponibles

| Método | Ruta           | Descripción |
|--------|---------------|-------------|
| GET    | `/hello`      | Devuelve "Hello World!" |
| GET    | `/h1`         | Devuelve un mensaje HTML con imagen |
| GET    | `/bye`        | Devuelve un error 404 con "not found" |
| POST   | `/user-data`  | Recibe un usuario y devuelve un mensaje personalizado |
| POST   | `/get-users`  | Obtiene usuarios según una condición |
| POST   | `/create-users` | Crea un nuevo usuario |
| POST   | `/delete-user`  | Elimina un usuario basado en una condición |
| POST   | `/update-user`  | Actualiza datos de un usuario |

## Modelo de Usuario

El modelo `UserModel` representa la tabla `Users` en la base de datos y se define en `user.model.js`:

```javascript
export class UserModel extends Model {}

UserModel.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(200), allowNull: false },
  password: { type: DataTypes.STRING(250), allowNull: false },
  created_at: { type: DataTypes.STRING(20), allowNull: true },
}, {
  sequelize: DatabaseConfig,
  modelName: 'user',
  timestamps: false,
  tableName: 'Users',
});
```

## Instalación y Configuración

1. **Clonar el repositorio:**
   ```sh
   git clone https://github.com/CesarSanchez19/Backend_Ti_41.git
   cd Backend_Ti_41
   ```

2. **Instalar dependencias:**
   ```sh
   npm install
   ```

3. **Configurar la base de datos:**
   - Iniciar sesión en MySQL:
     ```sh
     mysql -u root -p
     ```
   - Crear la base de datos:
     ```sql
     CREATE DATABASE backend_ti_41;
     ```
   - Seleccionar la base de datos:
     ```sql
     USE backend_ti_41;
     ```
   - Crear la tabla `users`:
     ```sql
     CREATE TABLE users (
       id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(200) NOT NULL,
       password VARCHAR(250) NOT NULL,
       created_at VARCHAR(20) DEFAULT NULL
     );
     ```

4. **Ejecutar el servidor:**
   ```sh
   npm start
   ```

5. **Probar API con Postman o cURL.**

## Contribución

Si deseas contribuir a este proyecto, realiza un **fork** del repositorio, crea una nueva rama para tu funcionalidad y envía un **pull request**.

---

Proyecto desarrollado por **CesarSanchez19**.

Repositorio en GitHub: [Backend_Ti_41](https://github.com/CesarSanchez19/Backend_Ti_41)

