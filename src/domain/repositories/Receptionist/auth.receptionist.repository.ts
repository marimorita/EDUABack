import { RegisterReceptionistDto } from "../../dtos/auth/register-receptionist.dto";

export abstract class AuthRepository {
    abstract register (registerReceptionistDto:RegisterReceptionistDto): Promise<{message : string}> 
}