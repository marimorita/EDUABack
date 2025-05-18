import { Router } from "express";
import { AuthReceptionistRoutes } from "./auth/Receptionist/receptionist.routes";

export class AppRoutes {
    static get routes(): Router {

        const router = Router();
        router.use('/edua-at/auth/receptionist', AuthReceptionistRoutes.routes)
        return router;
    }
}