import jwt from "jsonwebtoken";
import { CustomError } from "../../../domain";
import { Request, Response } from "express";
import { envs, getVerificationCode } from "../../../config";

export class AuthVerificationController {
    constructor() { }
    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }

    verifyCode = async (req: Request, res: Response) => {
        const { code } = req.body;
        const token = req.headers.authorization?.split(' ')[1];

        if (!token || !code) {
            return res.status(401).json({ error: 'Se requiere token y codigo' });
        }

        try {
            const decoded = jwt.verify(token, envs.JWT_SECRET as string) as any;
            const email = decoded.user.email;

            const validCode = getVerificationCode(email, code);

            if (!validCode) {
                throw new CustomError(400, 'Codigo invalido o expirado');
            }
            return res.status(200).json({ message: 'Codigo Correcto' });
        } catch (error) {
            console.error('Error al verificar el codigo:', error);
            this.handleError(error, res);
        }
    }
}