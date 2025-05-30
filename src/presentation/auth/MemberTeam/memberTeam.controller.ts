import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { envs } from '../../../config/'
import { Request, Response } from 'express';
import { MemberTeamEntity } from '../../../Data';
import { AuthMemberTeamRepository, CustomError, LoginMemberTeamDto, RegisterMemberTeamDto } from '../../../domain';

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

export class AuthMemberTeamController {
    constructor(
        private readonly authMemberTeamRepository: AuthMemberTeamRepository
    ) { }
    private handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.error("error", error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    registerMemberTeam = async (req: Request, res: Response) => {
        const [error, registerMemberTeamDto] = RegisterMemberTeamDto.create(req.body);
        if (error) return res.status(400).json({ error });

        try {
            await this.authMemberTeamRepository.register(registerMemberTeamDto!)
            res.status(201).json({ message: 'MemberTeam registrado correctamente' })
        } catch (error) {
            console.error("error h", error);
            this.handleError(error, res);
        }
    }
    loginMemberTeam = async (req: Request, res: Response) => {
        const [error, loginMemberTeamDto] = LoginMemberTeamDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const routeCode = generateVerificationCode();

        try {
            const { token, role, message } = await this.authMemberTeamRepository.login(loginMemberTeamDto!);
            res.json({ token, role, routeCode, message });
        } catch (error) {
            console.error("error h", error);
            this.handleError(error, res);
        }
    }
    getAllMemberTeam = async (req: Request, res: Response) => {
        try {
            const MemberTeam = await this.authMemberTeamRepository.getAllMemberTeam();
            res.json(MemberTeam);
        } catch (error) {
            console.log(error);
            this.handleError(error, res);
        }
    }
    getMemberTeamByEmail = async (req: Request, res: Response) => {
        const token = req.params.token;
        console.log("Token recibido: ", token);

        if (!token) {
            return res.status(400).json({ error: 'Token requerido' });
        }
        try {
            const decoded = jwt.verify(token, envs.JWT_SECRET as string) as { user: { email: string, role: string } };
            console.log("Email decodificado:", decoded.user.email);
            const memberTeam = await this.authMemberTeamRepository.getMemberTeamByEmail(decoded.user.email);
            console.log("Miembro del equipo encontrado", memberTeam);

            if (!memberTeam) {
                return res.status(404).json({ error: 'Miembro del equipo no encontrado' })
            }

            res.status(200).json(memberTeam)
        } catch (error) {
            console.log(error);

            this.handleError(error, res);
        }

    }
}