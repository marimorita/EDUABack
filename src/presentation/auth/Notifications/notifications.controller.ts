import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { envs } from '../../../config/'
import { Request, Response } from 'express';
import { AuthNotificationsRepository, CustomError, RegisterNotificationsDto, UpdateRoleCCNotificationDto } from '../../../domain';
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
            res.status(201).json({ message: 'Notificacion registrado correctamente' })
        } catch (error) {
            console.error("error h", error);
            this.handleError(error, res);
        }
    }

    getAllNotifications = async (req: Request, res: Response) => {
        try {
            const notifications = await this.authNotificationsRepository.getAllNotifications();
            res.json(notifications);
        } catch (error) {
            console.log(error);
            this.handleError(error, res);
        }
    }

    getNotificationsById = async (req: Request, res: Response) => {
        const { id } = req.params;

        const notificationsId = parseInt(id, 10);

        if (isNaN(notificationsId)) {
            return res.status(400).json({ error: 'Formato de id invalido' });
        }

        try {
            const notifications = await this.authNotificationsRepository.getNotificationsById(notificationsId);
            if (!notifications) {
                return res.status(404).json({ error: 'Esta notificación no existe' });
            }
            res.json(notifications);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    updateRoleCCNotification = async (req: Request, res: Response) => {
        const [error, updateRoleCCNotificationDto] = UpdateRoleCCNotificationDto.create(req.body);
        if (error) return res.status(400).json({ error });

        try {
            await this.authNotificationsRepository.updateRoleCCNotificationDto(updateRoleCCNotificationDto!)
            res.status(201).json({ message: 'Notificacion registrado correctamente' })
        } catch (error) {
            console.error("error h", error);
            this.handleError(error, res);
        }
    }
}