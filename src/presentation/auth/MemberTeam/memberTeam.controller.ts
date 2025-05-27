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
}