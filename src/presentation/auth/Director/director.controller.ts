import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { envs } from '../../../config/'
import { Request, Response } from 'express';
import { DirectorEntity } from '../../../Data';
import { AuthDirectorRepository, CustomError, LoginDirectorDto, RegisterDirectorDto } from '../../../domain';

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

export class AuthDirectorController {
    constructor(
        private readonly authDirectorRepository: AuthDirectorRepository
    ) { }
    private handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error("error", error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    registerDirector = async (req: Request, res: Response) => {
        const [error, registerDirectorDto] = RegisterDirectorDto.create(req.body);
        if (error) return res.status(400).json({ error });

        try {
            await this.authDirectorRepository.register(registerDirectorDto!)
            res.status(201).json({ message: 'Director registrado correctamente' })
        } catch (error) {
            console.error("error h", error);
            this.handleError(error, res);
        }
    }
    loginDirector = async (req: Request, res: Response) => {
        const [error, loginDirectorDto] = LoginDirectorDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const routeCode = generateVerificationCode();

        try {
            const { token, role, name , message} = await this.authDirectorRepository.login(loginDirectorDto!);
            res.json({ token, role, routeCode, name, message });
        } catch (error) {
            console.error("error h", error);
            this.handleError(error, res);
        }
    }
        getAllDirector = async (req: Request, res: Response) => {
        try {
            const Director = await this.authDirectorRepository.getAllDirector();
            res.json(Director);
        } catch (error) {
            console.log(error);
            this.handleError(error, res);
        }
    }
    getDirectorByEmail = async (req: Request, res: Response) => {
        const token = req.params.token;
        console.log("Token recibido: ", token);

        if (!token) {
            return res.status(400).json({ error: 'Token requerido' });
        }
        try {
            const decoded = jwt.verify(token, envs.JWT_SECRET as string) as { user: { email: string, role: string } };
            console.log("Email decodificado:", decoded.user.email);
            const director = await this.authDirectorRepository.getDirectorByEmail(decoded.user.email);
            console.log("Director encontrado", director);

            if (!director) {
                return res.status(404).json({ error: 'Director no encontrado' })
            }

            res.status(200).json(director)
        } catch (error) {
            console.log(error);

            this.handleError(error, res);
        }

    }

}