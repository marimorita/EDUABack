import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { envs } from '../../../config/'
import { Request, Response } from 'express';
import { HistorialEntity } from '../../../Data';
import { AuthHistorialRepository, CustomError, RegisterHistorialDto } from '../../../domain';

export class AuthHistorialController {
    constructor(
        private readonly authHistorialRepository: AuthHistorialRepository
    ) { }
    private handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error("error", error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    registerHistorial = async (req: Request, res: Response) => {
        const [error, registerHistorialDto] = RegisterHistorialDto.create(req.body);
        if (error) return res.status(400).json({ error });

        try {
            await this.authHistorialRepository.register(registerHistorialDto!)
            res.status(201).json({ message: 'Historial registrado correctamente' })
        } catch (error) {
            console.error("error h", error);
            this.handleError(error, res);
        }
    }
}