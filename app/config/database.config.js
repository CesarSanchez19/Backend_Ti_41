import { Sequelize } from "sequelize";

export const DatabaseConfig = new Sequelize({
  host: "localhost", // El host suele ser 'localhost' si MySQL está en la misma máquina
  database: "mysql", // El nombre de la base de datos que estás usando
  username: "root", // El usuario por defecto es 'root'
  password: "", // Aquí debes poner la nueva contraseña si la cambiaste
  dialect: "mysql",
  timezone: "-05:00",
  port: 3306, // El puerto por defecto es 3306 (si no lo cambiaste)
  logging: false,
  pool: {
    max: 5,
    min: 5,
    acquire: 60000,
    idle: 15000,
  },
});


export class Database {
  async connection() {
    try {
      await DatabaseConfig.authenticate();
      console.log("Connection has been established successfully");
      return { ok: true, message: "Connection to the database established correctly" };
    } catch (error) {
      console.error("Unable to connect to the database: ", error);
      return { ok: false, message: `Could not connect to database. Please check the following: ${error} ` }; // ← Se agregó espacio antes de error
    }
  }
}
