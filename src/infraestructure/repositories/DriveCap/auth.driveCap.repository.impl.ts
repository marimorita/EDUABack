import { DriveCapEntity } from "../../../Data";
import { AuthDriveCapDataSource, AuthDriveCapRepository,  RegisterDriveCapDto,  RegisterMemberTeamDto } from "../../../domain";

export class AuthDriveCapRepositoryImpl implements AuthDriveCapRepository {
    constructor(
        private readonly authDriveCapDataSource: AuthDriveCapDataSource,
    ) { }
    register(registerDriveCapDto: RegisterDriveCapDto): Promise<{ message: string }> {
        return this.authDriveCapDataSource.register(registerDriveCapDto);
    }
}