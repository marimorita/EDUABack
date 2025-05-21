import { Router } from 'express';
import { verifyTokenAndSendCode } from '../../../config';

export class VerifyTokenAndSendCodeRoutes {
    static get routes(): Router {
        const router = Router();

        router.post('/verifytokenandsendcode', verifyTokenAndSendCode);

        return router;
    }
}