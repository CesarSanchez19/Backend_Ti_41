import express from "express"; // Importa el módulo 'express' para crear el servidor y manejar rutas
import 'dotenv/config'; // Importa la configuración de variables de entorno desde un archivo .env
import { Database } from './config/database.config.js'; // Importa la clase Database desde el archivo de configuración de la base de datos
import { UserRoutes } from './routes/user.routes.js'; // Importa la clase UserRoutes que define las rutas relacionadas con usuarios
import cors from 'cors';


const app = express(); // Crea una instancia de la aplicación Express
const port = process.env.APP_PORT || 3001; // Establece el puerto, usando la variable de entorno APP_PORT o 3001 por defecto

// Middleware para parsear los cuerpos de las solicitudes URL-encoded
app.use(express.urlencoded({ extended: true }));
// Middleware para parsear los cuerpos de las solicitudes JSON
app.use(express.json());
app.use(cors(
  {
      origin: '*'
  }
)); // Middleware para habilitar CORS

// Crea una instancia de la clase Database
const database = new Database();
// Establece la conexión con la base de datos
database.connection();

// Crea una instancia de la clase UserRoutes
const userRoutes = new UserRoutes();
// Inicializa las rutas de usuario y las vincula a la aplicación
userRoutes.iniUserRouter(app); // Este es un método que define las rutas

// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // Mensaje que se muestra en la consola al iniciar el servidor
});
