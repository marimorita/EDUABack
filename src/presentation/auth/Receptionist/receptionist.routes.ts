import { Router } from "express";
import { AuthReceptionistController } from "./receptionist.controller";
import { AuthReceptionistRepositoryImpl } from "../../../infraestructure";
import { AuthReceptionistDataSourceImpl } from "../../../infraestructure/datasources/Receptionist/auth.receptionist.datasource.impl";

export class AuthReceptionistRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthReceptionistDataSourceImpl();
        const AuthRepository = new AuthReceptionistRepositoryImpl(datasource);
        const controller = new AuthReceptionistController(AuthRepository);

        router.get('/receptionist', controller.getAllReceptionist)
        router.post('/login', controller.loginReceptionist)
        router.post('/register', controller.registerReceptionist)
        router.get('/receptionist/:token', controller.getReceptionistByEmail)
        return router;
    }
}  