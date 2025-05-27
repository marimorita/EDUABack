import { Router } from "express";
import { AuthVisitorController } from "./visitor.controller";
import { AuthVisitorDataSourceImpl } from "../../../infraestructure/datasources/Visitor/auth.visitor.datasource.impl";
import { AuthVisitorRepositoryImpl } from "../../../infraestructure/repositories/Visitor/auth.visitor.repository.impl";

export class AuthVisitorRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthVisitorDataSourceImpl();
        const AuthRepository = new AuthVisitorRepositoryImpl(datasource);
        const controller = new AuthVisitorController(AuthRepository);

        router.post('/login', controller.loginVisitor)
        router.post('/register', controller.registerVisitor)
        return router;
    }
}  