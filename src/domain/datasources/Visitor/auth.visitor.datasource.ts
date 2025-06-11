import { VisitorEntity } from "../../../Data";
import { LoginVisitorDto, RegisterVisitorDto } from "../../dtos/auth/Visitor/register-visitor.dto";

export abstract class AuthVisitorDataSource {
    abstract register(registerReceptionistDto: RegisterVisitorDto): Promise<{ message: string }>
    abstract getAllVisitor(): Promise<VisitorEntity[]>
    abstract login(loginVisitorDto: LoginVisitorDto): Promise<{ token: string, role: string | undefined, name: string | undefined,  message: string }>
    abstract getVisitorByEmail(email: string): Promise<VisitorEntity | null>
}