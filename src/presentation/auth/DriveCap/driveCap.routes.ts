import { Router } from "express";
import { AuthDriveCapController } from "./driveCap.controller";
import { AuthDriveCapDataSourceImpl } from "../../../infraestructure/datasources/DriveCap/auth.driveCap.datasource.impl";
import { AuthDriveCapRepositoryImpl } from "../../../infraestructure/repositories/DriveCap/auth.driveCap.repository.impl";

export class AuthDriveCapRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthDriveCapDataSourceImpl();
        const AuthRepository = new AuthDriveCapRepositoryImpl(datasource);
        const controller = new AuthDriveCapController(AuthRepository);

        router.post('/drivecap', controller.getAllDriveCap)
        router.post('/register', controller.registerDriveCap)
        router.get('/drivecap/drivecaplastid', controller.getDriveCapByLastId)
        return router;
    }
}  