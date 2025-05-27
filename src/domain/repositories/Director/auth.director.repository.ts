import { LoginDirectorDto, RegisterDirectorDto } from "../../dtos/auth/Director/register-director.dto";

export abstract class AuthDirectorRepository {
    abstract register(registerDirectorDto: RegisterDirectorDto): Promise<{ message: string }>
    abstract login(loginDirectorDto: LoginDirectorDto): Promise<{ token: string, role: string | undefined, message: string }>
};