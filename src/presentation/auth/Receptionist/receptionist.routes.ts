import { Router } from "express";
import { AuthReceptionistController } from "./receptionist.controller";
import { AuthReceptionistDataSourceImpl, AuthReceptionistRepositoryImpl } from "../../../infraestructure";

export class AuthReceptionistRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthReceptionistDataSourceImpl();
        const AuthRepository = new AuthReceptionistRepositoryImpl(datasource);
        const controller = new AuthReceptionistController(AuthRepository);

        router.post('/login', controller.loginReceptionist)
        router.post('/register', controller.registerReceptionist)
        return router;
    }
}  