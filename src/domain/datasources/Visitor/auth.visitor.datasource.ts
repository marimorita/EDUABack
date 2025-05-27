import { LoginVisitorDto, RegisterVisitorDto } from "../../dtos/auth/Visitor/register-visitor.dto";

export abstract class AuthVisitorDataSource {
    abstract register (registerReceptionistDto: RegisterVisitorDto): Promise<{message : string}> 
    abstract login (loginVisitorDto: LoginVisitorDto): Promise<{token: string, role:string | undefined, message: string}>
}