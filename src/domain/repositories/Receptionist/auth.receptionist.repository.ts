import { LoginReceptionistDto, RegisterReceptionistDto } from "../../dtos/auth/Receptionist/register-receptionist.dto";

RegisterReceptionistDto
export abstract class AuthReceptionistRepository {
    abstract register (registerReceptionistDto:RegisterReceptionistDto): Promise<{message : string}> 
    abstract login (loginReceptionistDto:LoginReceptionistDto): Promise<{token: string, role: string | undefined, message: string}>
};