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

    // Obtener usuario
    app.post("/get-user", async (req, res) => {
      try {
        const { condition } = req.body;
        console.log("Condition", condition);

        const user = await UserModel.findAll({
          where: condition,
        });

        if (user.length > 0) {
          res.status(200).send({ ok: true, data: user });
        } else {
          res.status(200).send({ ok: false, message: "Usuario no encontrado" });
        }
      } catch (error) {
        console.error("Error", error);
        res.status(500).send({ ok: false, message: "Internal server error" });
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
    // Ruta POST para eliminar un usuario
    app.post("/delete-user", async (req, res) => {
      const { condition } = req.body; // Desestructura el cuerpo de la solicitud para obtener 'condition'

      try {
        // Buscar el usuario antes de eliminarlo usando la condición
        const user = await UserModel.findOne({
          where: condition, // Filtra por la condición que se pasa en el cuerpo
        });

        if (!user) {
          return res.status(404).send({ ok: false, message: "Usuario no encontrado" }); // Si el usuario no existe
        }

        // Eliminar el usuario de la base de datos
        await UserModel.destroy({
          where: condition,
        });

        // Responder con los datos del usuario eliminado
        res.status(200).send({
          ok: true,
          data: [
            {
              id: user.id,
              name: user.name,
              password: user.password,
              created_at: user.created_at,
            },
          ],
        });
      } catch (error) {
        // Si ocurre un error al eliminar el usuario
        console.error("Error al eliminar usuario:", error);
        res.status(500).send({ ok: false, message: "Error al eliminar usuario" });
      }
    });
    // Ruta POST para actualizar un usuario
    app.post("/update-user", async (req, res) => {
      const { condition, user } = req.body; // Desestructura el cuerpo de la solicitud para obtener 'condition' y 'user'

      try {
        // Buscar el usuario antes de actualizarlo usando la condición
        const existingUser = await UserModel.findOne({
          where: condition, // Filtra por la condición que se pasa en el cuerpo
        });

        if (!existingUser) {
          return res.status(404).send({ ok: false, message: "Usuario no encontrado" }); // Si el usuario no existe
        }

        // Actualizar el usuario con los nuevos datos
        await UserModel.update(user, {
          where: condition,
        });

        // Obtener los datos actualizados del usuario
        const updatedUser = await UserModel.findOne({
          where: condition,
        });

        // Responder con los datos actualizados del usuario
        res.status(200).send({
          ok: true,
          data: [
            {
              id: updatedUser.id,
              name: updatedUser.name,
              password: updatedUser.password,
              created_at: updatedUser.created_at,
            },
          ],
        });
      } catch (error) {
        // Si ocurre un error al actualizar el usuario
        console.error("Error al actualizar usuario:", error);
        res.status(500).send({ ok: false, message: "Error al actualizar usuario" });
      }
    });
  }
}
