import { RegisterNotificationsDto } from "../../dtos/auth/Notifications/register-notifications.dto";

export abstract class AuthNotificationsDataSource {
    abstract register (registerNotificationsDto: RegisterNotificationsDto): Promise<{message : string}> 
}