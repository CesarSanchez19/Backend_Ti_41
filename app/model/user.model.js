// Importamos 'Model' y 'DataTypes' desde Sequelize
import { Model, DataTypes } from 'sequelize';

// Importamos la configuración de la base de datos desde un archivo externo
import { DatabaseConfig } from '../config/database.config.js';

// Definimos la clase 'UserModel' que extiende de 'Model' de Sequelize
export class UserModel extends Model {}

// Inicializamos el modelo 'UserModel' con su estructura y configuración
UserModel.init({
    // Definimos la columna 'id' como un entero autoincremental y clave primaria
    id: {
        type: DataTypes.INTEGER, // Tipo de dato entero
        autoIncrement: true, // Se incrementa automáticamente en cada inserción
        primaryKey: true // Define la clave primaria de la tabla
    },
    // Definimos la columna 'name' como una cadena de texto de hasta 200 caracteres
    name: {
        type: DataTypes.STRING(200), // Tipo de dato string con longitud máxima de 200 caracteres
        allowNull: false, // No permite valores nulos
    },
    // Definimos la columna 'password' como una cadena de texto de hasta 250 caracteres
    password: {
        type: DataTypes.STRING(250), // Tipo de dato string con longitud máxima de 250 caracteres
        allowNull: false, // No permite valores nulos
    },
    // Definimos la columna 'created_at' como una cadena de texto de hasta 20 caracteres
    created_at: {
        type: DataTypes.STRING(20), // Tipo de dato string con longitud máxima de 20 caracteres
        allowNull: true, // Permite valores nulos
    }
}, {
    sequelize: DatabaseConfig, // Conexión a la base de datos usando la configuración importada
    modelName: 'user', // Nombre del modelo en Sequelize
    timestamps: false, // Deshabilita la creación automática de 'createdAt' y 'updatedAt'
    tableName: 'Users', // Nombre de la tabla en la base de datos
});