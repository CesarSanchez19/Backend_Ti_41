import express from "express";
import 'dotenv/config';
import { Database } from './config/database.config.js'
import { UserRoutes } from './routes/user.routes.js';

const app = express();
const port = process.env.APP_PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const database = new Database();
database.connection();

const userRoutes = new UserRoutes();

userRoutes.iniUserRouter(app);  // Este es una clase, instanciando

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});   
