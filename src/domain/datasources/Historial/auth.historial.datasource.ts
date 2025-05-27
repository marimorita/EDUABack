import { RegisterHistorialDto } from "../../dtos/auth/Historial/register-historial.dto";

export abstract class AuthHistorialDataSource {
    abstract register (registerHistorialDto: RegisterHistorialDto): Promise<{message : string}> 
}