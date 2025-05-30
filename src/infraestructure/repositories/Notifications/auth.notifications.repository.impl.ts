import { NotificacionesEntity } from "../../../Data";
import { AuthNotificationsDataSource, AuthNotificationsRepository, RegisterNotificationsDto, UpdateRoleCCNotificationDto } from "../../../domain";

export class AuthNotificationsRepositoryImpl implements AuthNotificationsRepository {
    constructor(
        private readonly authNotificationsDataSource: AuthNotificationsDataSource,
    ) { }
    register(registerNotificationsDto: RegisterNotificationsDto): Promise<{ message: string }> {
        return this.authNotificationsDataSource.register(registerNotificationsDto);
    }
    getAllNotifications(): Promise<NotificacionesEntity[]> {
        return this.authNotificationsDataSource.getAllNotifications()
    }
    getNotificationsById(id: number): Promise<NotificacionesEntity | null> {
        return this.authNotificationsDataSource.getNotificationsById(id)
    }
    getNotificationsByLastId(id: number): Promise<NotificacionesEntity | null> {
        return this.authNotificationsDataSource.getNotificationsByLastId(id)
    }
    updateRoleCCNotificationDto(updateRoleCCNotificationDto:UpdateRoleCCNotificationDto): Promise<NotificacionesEntity | null> {return this.authNotificationsDataSource.updateRoleCCNotificationDto(updateRoleCCNotificationDto)}
}