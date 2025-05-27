import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { envs } from '../../../config/'
import { DriveCapEntity } from "../../../Data";
import { Request, Response } from 'express';
import { AuthDriveCapRepository, CustomError, RegisterDriveCapDto } from '../../../domain';

export class AuthDriveCapController {
    constructor(
        private readonly authDriveCapRepository: AuthDriveCapRepository
    ) { }
    private handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error("error", error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    registerDriveCap = async (req: Request, res: Response) => {
        const [error, registerDriveCapDto] = RegisterDriveCapDto.create(req.body);
        if (error) return res.status(400).json({ error });
        console.error("error registering DriveCap", error);
        try {
            await this.authDriveCapRepository.register(registerDriveCapDto!)
            res.status(201).json({ message: 'captura drive registradas correctamente' })
        } catch (error) {
            console.error("error h", error);
            this.handleError(error, res);
        }
    }
}