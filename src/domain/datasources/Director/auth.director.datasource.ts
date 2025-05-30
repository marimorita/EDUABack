import { DirectorEntity } from "../../../Data";
import { LoginDirectorDto, RegisterDirectorDto } from "../../dtos/auth/Director/register-director.dto";

export abstract class AuthDirectorDataSource {
    abstract register (registerDirectorDto: RegisterDirectorDto): Promise<{message : string}> 
    abstract getAllDirector(): Promise<DirectorEntity[]>
    abstract login (loginDirectorDto: LoginDirectorDto): Promise<{token: string, role:string | undefined, message: string}>
    abstract getDirectorByEmail (email: string) : Promise<DirectorEntity | null>
}