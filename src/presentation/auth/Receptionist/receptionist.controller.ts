import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { envs } from '../../../config/'
import { Request, Response } from 'express';
import { ReceptionistEntity } from '../../../Data';
import { AuthReceptionistRepository, CustomError, LoginReceptionistDto, RegisterReceptionistDto } from '../../../domain';

function generateVerificationCode(): string {
    const letters = Array(3)
        .fill(null)
        .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 65))
        .join('');

    const numbers = Array(3)
        .fill(null)
        .map(() => Math.floor(Math.random() * 10))
        .join('');

    return `${letters}${numbers}`;
}

export class AuthReceptionistController {
    constructor(
        private readonly authReceptionistRepository: AuthReceptionistRepository
    ) { }
    private handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error("error", error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    registerReceptionist = async (req: Request, res: Response) => {
        const [error, registerReceptionistDto] = RegisterReceptionistDto.create(req.body);
        if (error) return res.status(400).json({ error });

        try {
            await this.authReceptionistRepository.register(registerReceptionistDto!)
            res.status(201).json({ message: 'Recepcionista registrado correctamente' })
        } catch (error) {
            console.error("error h", error);
            this.handleError(error, res);
        }
    }
    loginReceptionist = async (req: Request, res: Response) => {
        const [error, loginReceptionistDto] = LoginReceptionistDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const routeCode = generateVerificationCode();

        try {
            const { token, role, message } = await this.authReceptionistRepository.login(loginReceptionistDto!);
            res.json({ token, role, routeCode, message });
        } catch (error) {
            console.error("error h", error);
            this.handleError(error, res);
        }
    }
    getAllReceptionist = async (req: Request, res: Response) => {
        try {
            const Receptionist = await this.authReceptionistRepository.getAllReceptionist();
            res.json(Receptionist);
        } catch (error) {
            console.log(error);
            this.handleError(error, res);
        }
    }
    getReceptionistByEmail = async (req: Request, res: Response) => {
        const token = req.params.token;
        console.log("Token recibido: ", token);

        if (!token) {
            return res.status(400).json({ error: 'Token requerido' });
        }
        try {
            const decoded = jwt.verify(token, envs.JWT_SECRET as string) as { user: { email: string, role: string } };
            console.log("Email decodificado:", decoded.user.email);
            const receptionist = await this.authReceptionistRepository.getReceptionistByEmail(decoded.user.email);
            console.log("Recepcionista encontrado", receptionist);

            if (!receptionist) {
                return res.status(404).json({ error: 'Recepcionista no encontrado' })
            }

            res.status(200).json(receptionist)
        } catch (error) {
            console.log(error);

            this.handleError(error, res);
        }

    }

}