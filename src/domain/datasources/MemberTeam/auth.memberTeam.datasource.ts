import { MemberTeamEntity } from "../../../Data";
import { LoginMemberTeamDto, RegisterMemberTeamDto } from "../../dtos/auth/MemberTeam/register-memberTeam.dto";

export abstract class AuthMemberTeamDataSource {
    abstract register(registerReceptionistDto: RegisterMemberTeamDto): Promise<{ message: string }>
    abstract getAllMemberTeam(): Promise<MemberTeamEntity[]>
    abstract login(loginMemberTeamDto: LoginMemberTeamDto): Promise<{ token: string, role: string | undefined, name: string | undefined, message: string }>
    abstract getMemberTeamByEmail(email: string): Promise<MemberTeamEntity | null>
}