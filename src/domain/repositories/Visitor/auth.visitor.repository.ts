import { LoginVisitorDto, RegisterVisitorDto } from "../../dtos/auth/Visitor/register-visitor.dto";

export abstract class AuthVisitorRepository {
    abstract register(registerVisitorDto: RegisterVisitorDto): Promise<{ message: string }>
    abstract login(loginVisitorDto: LoginVisitorDto): Promise<{ token: string, role: string | undefined, message: string }>
};