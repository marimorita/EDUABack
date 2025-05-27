import jwt from "jsonwebtoken";
import { envs } from "../../../config/envs";
import { Repository } from "typeorm";
import { BcryptAdapter } from "../../../config";
import { AppDataSource } from "../../../Data/MySQL/OrmConfig"
import { AuthNotificationsDataSource, CustomError, RegisterNotificationsDto } from "../../../domain";
import { NotificacionesEntity } from "../../../Data/entities/auth/Notifications/notifications.entity";


export class AuthNotificationsDataSourceImpl implements AuthNotificationsDataSource {
    private readonly NotificationsRepository: Repository<NotificacionesEntity>;
    constructor() {
        this.NotificationsRepository = AppDataSource.getRepository(NotificacionesEntity);
    }
    async register(registerNotificationsDto: RegisterNotificationsDto): Promise<{ message: string }> {

        const { tittle, text, foreignKeyDrive } = registerNotificationsDto;

        try {
            const newNotifications = this.NotificationsRepository.create({
                tittle: tittle,
                text: text,
                foreignKeyDrive: foreignKeyDrive,
            });

            await this.NotificationsRepository.save(newNotifications);
            return { message: 'Captura del drive registrada correctamente' };
        } catch (error) {
            console.error("error registering Notifications", error);
            if (error instanceof CustomError) {
                console.error("error registering Notifications", error);
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}