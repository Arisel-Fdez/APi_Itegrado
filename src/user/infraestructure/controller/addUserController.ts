import { Request, Response } from "express";
import { AddUserUseCase } from "../../application/addUserUseCase";
import bcrypt from 'bcrypt';

export class AddUsersController {
    constructor(readonly addUserUseCase: AddUserUseCase) { }

    async run(req: Request, res: Response) {
        try {
            let { name, last_name, email, password } = req.body;

            if (!password) {
                throw new Error("Password is required");
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            let createdUsers = await this.addUserUseCase.run(name, last_name, email, hashedPassword);

            if (createdUsers) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        name: createdUsers.name,
                        last_name: createdUsers.last_name,
                        email: createdUsers.email,
                        // Considera no devolver la contraseña incluso si está cifrada
                    },
                    message: "Usuario ha sido creado exitosamente"
                });
            } else {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    validations: [], // TODO: implementar validaciones
                    message: "Error al crear Usuario nuevo, inténtalo más tarde"
                });
            }

        } catch (error) {
            console.error("Error in AddUsersController:", error);
            res.status(500).send({
                status: "error",
                message: "Error interno del servidor",
            });
        }
    }
}
