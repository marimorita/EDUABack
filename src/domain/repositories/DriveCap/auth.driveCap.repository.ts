import { RegisterDriveCapDto } from "../../dtos/auth/DriveCap/register-driveCap.dto";

export abstract class AuthDriveCapRepository {
    abstract register(registerDriveCapDto: RegisterDriveCapDto): Promise<{ message: string }>
    };