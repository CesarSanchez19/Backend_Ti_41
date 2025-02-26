import express from "express"; // Importa el módulo 'express' para crear el servidor y manejar rutas
import { UserModel } from "../model/user.model.js"; // Importa el modelo de usuario desde el archivo especificado

// Clase que define las rutas para la gestión de usuarios
export class UserRoutes {
  // Método para inicializar las rutas de usuario
  iniUserRouter(app = express.application) {
    // Ruta GET que responde con un saludo
    app.get("/hello", (req, res) => {
      res.send("Hello World!"); // Envía el mensaje "Hello World!" como respuesta
    });

    // Ruta GET que envía un mensaje HTML con una imagen
    app.get("/h1", (req, res) => {
      res.send(
        '<p>Hola<p/><img src="https://comodosslstore.com/blog/wp-content/uploads/2024/01/website-page-found-error-robot-character-broken-chatbot-mascot-disabled-site-technical-work_502272-1888.jpg">'
      ); // Envía un párrafo y una imagen como respuesta
    });

    // Ruta GET que responde con un mensaje de error 404
    app.get("/bye", (req, res) => {
      res.status(404).send("not found"); // Envía un mensaje "not found" con un estado 404
    });

    // Ruta POST para recibir datos del usuario
    app.post("/user-data", (req, res) => {
      const { user, password } = req.body; // Desestructura el cuerpo de la solicitud para obtener 'user' y 'password'
      console.log("Json Object:", req.body); // Muestra el objeto JSON recibido en la consola
      console.log(user, password); // Muestra los valores de 'user' y 'password'

      res.status(200).send(`Hello ${user}, you are awesome`); // Envía una respuesta personalizada con el nombre del usuario
    });

    // Ruta POST para obtener usuarios según una condición
    app.post("/get-users", async (req, res) => {
      const { condition } = req.body; // Desestructura el cuerpo de la solicitud para obtener 'condition'
      console.log("condition", condition); // Muestra la condición en la consola
      try {
        // Intenta buscar todos los usuarios que coincidan con la condición
        const users = await UserModel.findAll({
          where: condition, // Filtra los usuarios según la condición proporcionada
        });
        console.log("users", users); // Muestra los usuarios encontrados en la consola
        res.status(200).send({ ok: true, data: users }); // Envía la lista de usuarios como respuesta
      } catch (error) {
        // Si ocurre un error al buscar usuarios
        console.error("Error al obtener usuarios:", error); // Muestra el error en la consola
        res.status(500).send({ ok: false, message: "Error al obtener usuarios" }); // Envía un mensaje de error con un estado 500
      }
    });

    // Ruta POST para crear un nuevo usuario
    app.post("/create-users", async (req, res) => {
      try {
        const { user } = req.body; // Desestructura el cuerpo de la solicitud para obtener 'user'
        const newUser = await UserModel.create(user); // Crea un nuevo usuario en la base de datos
        console.log("newUser", newUser); // Muestra el nuevo usuario creado en la consola
        res.status(200).send({ ok: true, data: newUser }); // Envía el nuevo usuario como respuesta
      } catch (error) {
        // Si ocurre un error al crear el usuario
        console.error("Error al crear usuarios:", error); // Muestra el error en la consola
        res.status(500).send({ ok: false, message: "Error al crear usuarios" }); // Envía un mensaje de error con un estado 500
      }
    });
  }
}
