import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { envs } from '../../../config/'
import { Request, Response } from 'express';
import { VisitorEntity } from '../../../Data';
import { AuthVisitorRepository, CustomError, LoginVisitorDto, RegisterVisitorDto } from '../../../domain';

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

export class AuthVisitorController {
    constructor(
        private readonly authVisitorRepository: AuthVisitorRepository
    ) { }
    private handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error("error", error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    registerVisitor = async (req: Request, res: Response) => {
        const [error, registerVisitorDto] = RegisterVisitorDto.create(req.body);
        if (error) return res.status(400).json({ error });

        try {
            await this.authVisitorRepository.register(registerVisitorDto!)
            res.status(201).json({ message: 'Visitor registrado correctamente' })
        } catch (error) {
            console.error("error h", error);
            this.handleError(error, res);
        }
    }
    loginVisitor = async (req: Request, res: Response) => {
        const [error, loginVisitorDto] = LoginVisitorDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const routeCode = generateVerificationCode();

        try {
            const { token, role, message } = await this.authVisitorRepository.login(loginVisitorDto!);
            res.json({ token, role, routeCode, message });
        } catch (error) {
            console.error("error h", error);
            this.handleError(error, res);
        }
    }
    getAllVisitor = async (req: Request, res: Response) => {
        try {
            const Visitor = await this.authVisitorRepository.getAllVisitor();
            res.json(Visitor);
        } catch (error) {
            console.log(error);
            this.handleError(error, res);
        }
    }
    getVisitorByEmail = async (req: Request, res: Response) => {
        const token = req.params.token;
        console.log("Token recibido: ", token);

        if (!token) {
            return res.status(400).json({ error: 'Token requerido' });
        }
        try {
            const decoded = jwt.verify(token, envs.JWT_SECRET as string) as { user: { email: string, role: string } };
            console.log("Email decodificado:", decoded.user.email);
            const visitor = await this.authVisitorRepository.getVisitorByEmail(decoded.user.email);
            console.log("Visitante encontrado", visitor);

            if (!visitor) {
                return res.status(404).json({ error: 'Visitante no encontrado' })
            }

            res.status(200).json(visitor)
        } catch (error) {
            console.log(error);

            this.handleError(error, res);
        }

    }

}