import { LoginMemberTeamDto, RegisterMemberTeamDto } from "../../dtos/auth/MemberTeam/register-memberTeam.dto";

export abstract class AuthMemberTeamDataSource {
    abstract register (registerReceptionistDto: RegisterMemberTeamDto): Promise<{message : string}> 
    abstract login (loginMemberTeamDto: LoginMemberTeamDto): Promise<{token: string, role:string | undefined, message: string}>
}