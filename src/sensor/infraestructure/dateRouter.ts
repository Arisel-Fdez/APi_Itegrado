import express from "express";
import { addDateController } from "./dependencies";
//import { authMiddleware } from "../../auth/middlewares/authMiddleware"; 

export const dataRouter = express.Router();



// Ruta para agregar un nuevo Datos al usuario
dataRouter.post(
    "/create",
    addDateController.run.bind(addDateController)
);


