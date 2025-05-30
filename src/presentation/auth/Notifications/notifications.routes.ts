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

        router.get('/notifications', controller.getAllNotifications)
        router.get('/notifications/:id', controller.getNotificationsById)
        router.post('/register', controller.registerNotifications)
        router.post('/update/roleCC', controller.updateRoleCCNotification)

        return router;
    }
}  