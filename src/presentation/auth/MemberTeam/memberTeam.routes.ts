import { Router } from "express";
import { AuthMemberTeamController } from "./memberTeam.controller";
import { AuthMemberTeamDataSourceImpl } from "../../../infraestructure/datasources/MemberTeam/auth.memberTeam.datasource.impl";
import { AuthMemberTeamRepositoryImpl } from "../../../infraestructure/repositories/MemberTeam/auth.memberTeam.repository.impl";

export class AuthMemberTeamRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new AuthMemberTeamDataSourceImpl();
        const AuthRepository = new AuthMemberTeamRepositoryImpl(datasource);
        const controller = new AuthMemberTeamController(AuthRepository);

        router.get('/memberTeam', controller.getAllMemberTeam)
        router.post('/login', controller.loginMemberTeam)
        router.post('/register', controller.registerMemberTeam)
        router.get('/memberTeam/:token', controller.getMemberTeamByEmail)
        return router;
    }
}  