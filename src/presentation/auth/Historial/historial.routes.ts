import { Router } from "express";
import { AuthHistorialController } from "./historial.controller";
import { AuthHistorialRepositoryImpl } from "../../../infraestructure/repositories/Historial/auth.historial.repository.impl";
import { AuthHistorialDataSourceImpl } from "../../../infraestructure/datasources/Historial/auth.historial.datasource.impl";

export class AuthHistorialRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthHistorialDataSourceImpl();
        const AuthRepository = new AuthHistorialRepositoryImpl(datasource);
        const controller = new AuthHistorialController(AuthRepository);

        router.post('/register', controller.registerHistorial)
        return router;
    }
}  