import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { envs } from '../../../config/'
import { Request, Response } from 'express';
import { AuthNotificationsRepository, CustomError, RegisterNotificationsDto } from '../../../domain';
import { NotificacionesEntity } from "../../../Data";

export class AuthNotificationsController {
    constructor(
        private readonly authNotificationsRepository: AuthNotificationsRepository
    ) { }
    private handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error("error", error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    registerNotifications = async (req: Request, res: Response) => {
        const [error, registerNotificationsDto] = RegisterNotificationsDto.create(req.body);
        if (error) return res.status(400).json({ error });

        try {
            await this.authNotificationsRepository.register(registerNotificationsDto!)
            res.status(201).json({ message: 'notificaciones registradas correctamente' })
        } catch (error) {
            console.error("error h", error);
            this.handleError(error, res);
        }
    }
}