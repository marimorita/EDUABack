import { LoginMemberTeamDto, RegisterMemberTeamDto } from "../../dtos/auth/MemberTeam/register-memberTeam.dto";
import { MemberTeamEntity } from "../../../Data";

export abstract class AuthMemberTeamRepository {
    abstract register(registerMemberTeamDto: RegisterMemberTeamDto): Promise<{ message: string }>
    abstract getAllMemberTeam(): Promise<MemberTeamEntity[]>
    abstract login(loginMemberTeamDto: LoginMemberTeamDto): Promise<{ token: string, role: string | undefined, message: string }>
    abstract getMemberTeamByEmail (email: string) : Promise<MemberTeamEntity | null>
};