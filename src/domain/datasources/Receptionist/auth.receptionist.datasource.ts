import { RegisterReceptionistDto } from "../../dtos/auth/register-receptionist.dto";

export abstract class AuthReceptionistDataSource {
    abstract register (registerReceptionistDto: RegisterReceptionistDto): Promise<{message : string}> 
}