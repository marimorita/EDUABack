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
            const { token, role, message } = await this.authDirectorRepository.login(loginDirectorDto!);
            res.json({ token, role, routeCode, message });
        } catch (error) {
            console.error("error h", error);
            this.handleError(error, res);
        }
    }
}