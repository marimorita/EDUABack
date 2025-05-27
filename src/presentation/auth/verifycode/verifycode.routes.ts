import { Router } from 'express';
import { AuthVerificationController } from './verifyCodeController';

export class VerifyCodeRoutes {
    static get routes(): Router {
        const router = Router();

        const controller = new AuthVerificationController();

        router.post('/verify-code', controller.verifyCode);
        return router;
    }
}