import { ReceptionistEntity } from "../../../Data";
import { AuthReceptionistDataSource, AuthReceptionistRepository, RegisterReceptionistDto } from "../../../domain";

export class AuthReceptionistRepositoryImpl implements AuthReceptionistRepository {
    constructor(
        private readonly authReceptionistDataSource: AuthReceptionistDataSource,
    ) { }
    register(registerReceptionistDto: RegisterReceptionistDto): Promise<{ message: string }> {
        return this.authReceptionistDataSource.register(registerReceptionistDto);
    }
    login(loginReceptionistDto: { email: string, password: string }): Promise<{ token: string, role: string | undefined, message: string }> {
        return this.authReceptionistDataSource.login(loginReceptionistDto);
    }
}