import { LoginVisitorDto, RegisterVisitorDto } from "../../dtos/auth/Visitor/register-visitor.dto";
import { VisitorEntity } from "../../../Data";

export abstract class AuthVisitorRepository {
    abstract register(registerVisitorDto: RegisterVisitorDto): Promise<{ message: string }>
    abstract getAllVisitor(): Promise<VisitorEntity[]>
    abstract login(loginVisitorDto: LoginVisitorDto): Promise<{ token: string, role: string | undefined, message: string }>
    abstract getVisitorByEmail(email: string): Promise<VisitorEntity | null>
};