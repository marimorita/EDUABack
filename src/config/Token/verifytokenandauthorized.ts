import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envs } from "../envs";
import { CustomError } from "../../domain";
import { env } from "process";

interface User {
    email: string;
    role: string;
}

interface CustomRequest extends Request {
    user?: User;
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token is required' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }
    try {
        const decoded = jwt.verify(token, envs.JWT_SECRET as string) as any;
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'No tienes acceso a esta acción' });
    }
};

export const authorizeRoles = (roles: string[]) => (req: CustomRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
        return res.status(403).json({ error: 'No tienes acceso a esta acción' });
    }
    next();
};