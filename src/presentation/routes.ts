import { Router } from "express";
import { AuthReceptionistRoutes } from "./auth/Receptionist/receptionist.routes";
import { VerifyTokenAndSendCodeRoutes } from "./auth/verifycode/verifyTokenAndSendToken.routes";
import { VerifyCodeRoutes } from "./auth/verifycode/verifycode.routes";

export class AppRoutes {
    static get routes(): Router {

        const router = Router();
        router.use('/edua-at/auth/receptionist', AuthReceptionistRoutes.routes)
        router.use('/edua-at/auth/twoverific', VerifyCodeRoutes.routes)
        router.use('/edua-at/auth/vr', VerifyTokenAndSendCodeRoutes.routes)
        return router;
        }
}