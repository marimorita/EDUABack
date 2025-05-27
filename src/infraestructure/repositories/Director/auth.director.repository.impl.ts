import { DirectorEntity } from "../../../Data";
import { AuthDirectorDataSource, AuthDirectorRepository,  RegisterDirectorDto,  RegisterMemberTeamDto } from "../../../domain";

export class AuthDirectorRepositoryImpl implements AuthDirectorRepository {
    constructor(
        private readonly authDirectorDataSource: AuthDirectorDataSource,
    ) { }
    register(registerDirectorDto: RegisterDirectorDto): Promise<{ message: string }> {
        return this.authDirectorDataSource.register(registerDirectorDto);
    }
    login(loginDirectorDto: { email: string, password: string }): Promise<{ token: string, role: string | undefined, message: string }> {
        return this.authDirectorDataSource.login(loginDirectorDto);
    }
}