import { Request, Response } from 'express'; // 5

export class AuthController { // 1

    constructor(){} // 2

    registerUser = (req: Request, res: Response) => { // 4
        res.json('registerUser controller') // 5
    } // 3

    loginUser =  (req: Request, res: Response) => { // 7
        res.json('loginUser controller') // 8

    } // 6
}