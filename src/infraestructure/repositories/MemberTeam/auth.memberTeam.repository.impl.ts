import { MemberTeamEntity } from "../../../Data";
import { AuthMemberTeamDataSource, AuthMemberTeamRepository,  RegisterMemberTeamDto } from "../../../domain";

export class AuthMemberTeamRepositoryImpl implements AuthMemberTeamRepository {
    constructor(
        private readonly authMemberTeamDataSource: AuthMemberTeamDataSource,
    ) { }
    register(registerMemberTeamDto: RegisterMemberTeamDto): Promise<{ message: string }> {
        return this.authMemberTeamDataSource.register(registerMemberTeamDto);
    }
    login(loginMemberTeamDto: { email: string, password: string }): Promise<{ token: string, role: string | undefined, name: string | undefined, message: string }> {
        return this.authMemberTeamDataSource.login(loginMemberTeamDto);
    }
    getAllMemberTeam(): Promise<MemberTeamEntity[]> {
        return this.authMemberTeamDataSource.getAllMemberTeam();
    }
    getMemberTeamByEmail(email: string): Promise<MemberTeamEntity | null> {
        return this.authMemberTeamDataSource.getMemberTeamByEmail(email)
    }
}