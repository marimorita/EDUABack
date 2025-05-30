import { VisitorEntity } from "../../../Data";
import { AuthVisitorDataSource, AuthVisitorRepository, RegisterVisitorDto } from "../../../domain";


export class AuthVisitorRepositoryImpl implements AuthVisitorRepository {
    constructor(
        private readonly authVisitorDataSource: AuthVisitorDataSource,
    ) { }
    register(registerVisitorDto: RegisterVisitorDto): Promise<{ message: string }> {
        return this.authVisitorDataSource.register(registerVisitorDto);
    }
    login(loginVisitorDto: { email: string, password: string }): Promise<{ token: string, role: string | undefined, message: string }> {
        return this.authVisitorDataSource.login(loginVisitorDto);
    }
    getAllVisitor(): Promise<VisitorEntity[]> {
        return this.authVisitorDataSource.getAllVisitor();
    }
    getVisitorByEmail(email: string): Promise<VisitorEntity | null> {
        return this.authVisitorDataSource.getVisitorByEmail(email)
    }
}