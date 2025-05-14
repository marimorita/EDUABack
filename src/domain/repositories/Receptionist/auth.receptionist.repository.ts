import { RegisterReceptionistDto } from "../../dtos/auth/register-receptionist.dto";

export abstract class AuthReceptionistRepository {
    abstract register (registerReceptionistDto:RegisterReceptionistDto): Promise<{message : string}> 
}