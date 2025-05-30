import { NotificacionesEntity } from "../../../Data";
import { RegisterNotificationsDto, UpdateRoleCCNotificationDto } from "../../dtos/auth/Notifications/register-notifications.dto";

export abstract class AuthNotificationsDataSource {
    abstract register(registerNotificationsDto: RegisterNotificationsDto): Promise<{ message: string }>
    abstract getAllNotifications(): Promise<NotificacionesEntity[]>
    abstract getNotificationsById(id: number): Promise<NotificacionesEntity | null>
    abstract getNotificationsByLastId(id: number): Promise<NotificacionesEntity | null>
    abstract updateRoleCCNotificationDto(updateRoleCCNotificationDto:UpdateRoleCCNotificationDto): Promise<NotificacionesEntity | null>
}