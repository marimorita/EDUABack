import { RegisterReceptionistDto } from "../../dtos/auth/register-receptionist.dto";

export abstract class AuthDataSource {
    abstract register (registerReceptionistDto: RegisterReceptionistDto): Promise<{message : string}> 
}