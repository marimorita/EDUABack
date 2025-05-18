import { Request, Response } from 'express';
import { AuthReceptionistRepository, CustomError, RegisterReceptionistDto } from '../../../domain';
import { ReceptionistEntity } from '../../../Data';
import { envs } from '../../../config/'

export class AuthReceptionistController { 
    constructor(
        private readonly authReceptionistRepository: AuthReceptionistRepository 
    ){} 
    private handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }

    registerReceptionist = async (req: Request, res: Response) => { 
        const [error, registerReceptionistDto] = RegisterReceptionistDto.create(req.body);
        if (error) return res.status(400).json({error});     
        
        try {   
            await this.authReceptionistRepository.register(registerReceptionistDto!)
            res.status(201).json({message: 'Recepcionista registrado correctamente'})
        } catch(error){
            this.handleError(error, res);
        }
    }
    loginReceptionist =  (req: Request, res: Response) => { 
        res.json('loginUser controller') 
    } 
}