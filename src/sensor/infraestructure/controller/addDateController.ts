import { Request, Response } from "express";
import { AddDateUseCase } from "../../application/addDateUseCase";
import WebSocket from 'ws';

export class AddDateController {
    private ws: WebSocket;
    private latestMessage: any = null; // Variable para almacenar el último mensaje recibido

    constructor(readonly addDateUseCase: AddDateUseCase) {
        this.ws = new WebSocket("ws://localhost:3001");
        this.initializeWebSocket();
    }

    private initializeWebSocket() {
        this.ws.on('open', () => {
            console.log("Connected to WebSocket server");
            this.ws.send(JSON.stringify({ message: "Estoy Conectado Esperando Mensajes..." }));
        });

        this.ws.on('message', (data: WebSocket.Data) => {
            const message = JSON.parse(data.toString());
            console.log("Message from server:", message);
            this.latestMessage = message; // Almacenar el mensaje más reciente
        });

        this.ws.on('close', () => {
            console.log("Disconnected from WebSocket server");
        });

        this.ws.on('error', (error) => {
            console.error("WebSocket error:", error);
        });
    }

    async run(req: Request, res: Response) {
        try {
            const { userId } = req.body;

            if (!userId) {
                return res.status(400).send({
                    status: "error",
                    message: "userId is required"
                });
            }

            if (!this.latestMessage) {
                return res.status(400).send({
                    status: "error",
                    message: "No data received from WebSocket"
                });
            }

            const { RitCardiaco, Spo, Object } = this.latestMessage;
            let { Pulso } = this.latestMessage;

            // Asegurarse de que Pulso tenga un valor válido
            Pulso = parseInt(Pulso) || 0;

            const result = await this.addDateUseCase.run(userId, RitCardiaco, Spo, Object, Pulso);
            res.status(201).json(result);
        } catch (error) {
            console.error("Error in AddDateController:", error);
            res.status(500).send({
                status: "error",
                message: "Internal server error"
            });
        }
    }
}
