import { Router } from "express";
import { AuthDriveCapDataSourceImpl } from "../../../infraestructure/datasources/DriveCap/auth.driveCap.datasource.impl";
import { AuthDriveCapRepositoryImpl } from "../../../infraestructure/repositories/DriveCap/auth.driveCap.repository.impl";
import { AuthDriveCapController } from "./driveCap.controller";

export class AuthDriveCapRoutes {   
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthDriveCapDataSourceImpl();
        const AuthRepository = new AuthDriveCapRepositoryImpl(datasource);
        const controller = new AuthDriveCapController(AuthRepository);

        router.post('/register', controller.registerDriveCap)
        return router;
    }
}  