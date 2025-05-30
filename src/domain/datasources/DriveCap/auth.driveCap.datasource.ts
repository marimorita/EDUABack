import { DriveCapEntity } from "../../../Data";
import { RegisterDriveCapDto } from "../../dtos/auth/DriveCap/register-driveCap.dto";

export abstract class AuthDriveCapDataSource {
    abstract register(registerDriveCapDto: RegisterDriveCapDto): Promise<{ message: string }>
    abstract getAllDriveCap(): Promise<DriveCapEntity[]>
    abstract getDriveCapByDate(date: Date): Promise<DriveCapEntity | null>
    abstract getDriveCapByLastId(): Promise<DriveCapEntity | null>
}