import { Router } from "express";
import { AuthNotificationsController } from "./notifications.controller";
import { AuthNotificationsRepositoryImpl } from "../../../infraestructure/repositories/Notifications/auth.notifications.repository.impl";
import { AuthNotificationsDataSourceImpl } from "../../../infraestructure/datasources/Notifications/auth.notification.datasource.impl";


export class AuthNotificationsRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthNotificationsDataSourceImpl();
        const AuthRepository = new AuthNotificationsRepositoryImpl(datasource);
        const controller = new AuthNotificationsController(AuthRepository);

        router.post('/register', controller.registerNotifications)
        return router;
    }
}  