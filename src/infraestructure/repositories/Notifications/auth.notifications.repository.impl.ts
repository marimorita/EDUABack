import { NotificacionesEntity } from "../../../Data";
import { AuthNotificationsDataSource, AuthNotificationsRepository,  RegisterNotificationsDto } from "../../../domain";

export class AuthNotificationsRepositoryImpl implements AuthNotificationsRepository {
    constructor(
        private readonly authNotificationsDataSource: AuthNotificationsDataSource,
    ) { }
    register(registerNotificationsDto: RegisterNotificationsDto): Promise<{ message: string }> {
        return this.authNotificationsDataSource.register(registerNotificationsDto);
    }
}