import { Router } from "express";
import { AuthDirectorRepositoryImpl } from "../../../infraestructure/repositories/Director/auth.director.repository.impl";
import { AuthDirectorDataSourceImpl } from "../../../infraestructure/datasources/Director/auth.director.datasource.impl";
import { AuthDirectorController } from "./director.controller";

export class AuthDirectorRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthDirectorDataSourceImpl();
        const AuthRepository = new AuthDirectorRepositoryImpl(datasource);
        const controller = new AuthDirectorController(AuthRepository);

        router.post('/login', controller.loginDirector)
        router.post('/register', controller.registerDirector)
        return router;
    }
}  