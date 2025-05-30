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
    getAllDriveCap = async (req: Request, res: Response) => {
        try {
            const notifications = await this.authDriveCapRepository.getAllDriveCap();
            res.json(notifications);
        } catch (error) {
            console.log(error);
            this.handleError(error, res);
        }
    }

    getDriveCapByDate = async (req: Request, res: Response) => {
        const { date } = req.params;
        const parsedDate = new Date(date);

        try {
            const driveCap = await this.authDriveCapRepository.getDriveCapByDate(parsedDate);
            if (!driveCap) {
                return res.status(404).json({ error: 'Esta captura no existe' });
            }
            res.json(driveCap);
        } catch (error) {
            this.handleError(error, res);
        }
    }
    getDriveCapByLastId = async (req: Request, res: Response) => {
        try {
            const driveCap = await this.authDriveCapRepository.getDriveCapByLastId();
            res.json(driveCap);
        } catch (error) {
            this.handleError(error, res);
        }
    }
}