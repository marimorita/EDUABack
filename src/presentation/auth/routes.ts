import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infraestructure";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router(); 
        const datasource = new AuthDataSourceImpl();
        const AuthRepository = new AuthRepositoryImpl(datasource);
        const controller = new AuthController(AuthRepository);
        
        router.post('/login', controller.loginUser)

        router.post('/register', controller.registerUser)
        return router;
    }
}