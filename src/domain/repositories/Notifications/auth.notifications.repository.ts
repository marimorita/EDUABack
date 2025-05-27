import { RegisterNotificationsDto } from "../../dtos/auth/Notifications/register-notifications.dto";

export abstract class AuthNotificationsRepository {
    abstract register(registerNotificationsDto: RegisterNotificationsDto): Promise<{ message: string }>
};