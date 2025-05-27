import { RegisterDriveCapDto } from "../../dtos/auth/DriveCap/register-driveCap.dto";
RegisterDriveCapDto

export abstract class AuthDriveCapDataSource {
    abstract register (registerDriveCapDto: RegisterDriveCapDto): Promise<{message : string}> 
}