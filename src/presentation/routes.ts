import { Router } from "express";
import { VerifyCodeRoutes } from "./auth/verifycode/verifycode.routes";
import { AuthVisitorRoutes } from "./auth/Visitor/visitor.routes";
import { AuthDriveCapRoutes } from "./auth/DriveCap/driveCap.routes";
import { AuthDirectorRoutes } from "./auth/Director/director.routes";
import { AuthHistorialRoutes } from "./auth/Historial/historial.routes";
import { AuthMemberTeamRoutes } from "./auth/MemberTeam/memberTeam.routes";
import { AuthReceptionistRoutes } from "./auth/Receptionist/receptionist.routes";
import { AuthNotificationsRoutes } from "./auth/Notifications/notifications.routes";
import { VerifyTokenAndSendCodeRoutes } from "./auth/verifycode/verifyTokenAndSendToken.routes";

export class AppRoutes {
    static get routes(): Router {

        const router = Router();
        router.use('/edua-at/auth/visitor', AuthVisitorRoutes.routes)
        router.use('/edua-at/auth/twoverific', VerifyCodeRoutes.routes)
        router.use('/edua-at/auth/drivecap', AuthDriveCapRoutes.routes)
        router.use('/edua-at/auth/director', AuthDirectorRoutes.routes)
        router.use('/edua-at/auth/historial', AuthHistorialRoutes.routes)
        router.use('/edua-at/auth/vr', VerifyTokenAndSendCodeRoutes.routes)
        router.use('/edua-at/auth/memberTeam', AuthMemberTeamRoutes.routes)
        router.use('/edua-at/auth/receptionist', AuthReceptionistRoutes.routes)  
        router.use('/edua-at/auth/notifications', AuthNotificationsRoutes.routes)
        return router;
        }
}