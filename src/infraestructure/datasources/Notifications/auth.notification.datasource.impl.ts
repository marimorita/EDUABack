import { Repository } from "typeorm";
import { AppDataSource } from "../../../Data/MySQL/OrmConfig"
import { AuthNotificationsDataSource, CustomError, RegisterNotificationsDto, UpdateRoleCCNotificationDto } from "../../../domain";
import { NotificacionesEntity } from "../../../Data/entities/auth/Notifications/notifications.entity";

export class AuthNotificationsDataSourceImpl implements AuthNotificationsDataSource {
    private readonly NotificationsRepository: Repository<NotificacionesEntity>;
    constructor() {
        this.NotificationsRepository = AppDataSource.getRepository(NotificacionesEntity);
    }
    async register(registerNotificationsDto: RegisterNotificationsDto): Promise<{ message: string }> {

        const { tittle, text, foreignKeyDrive, img, roleCC } = registerNotificationsDto;

        try {
            const newNotifications = this.NotificationsRepository.create({
                tittle: tittle,
                text: text,
                img: img,
                foreignKeyDrive: foreignKeyDrive,
                roleCC: roleCC
            });

            await this.NotificationsRepository.save(newNotifications);
            console.error("Guardado con éxito:", newNotifications);
            return { message: 'Notificacion registrado correctamente' };
        } catch (error) {
            console.error("error registering Notifications", error);
            if (error instanceof CustomError) {
                console.error("error registering Notifications", error);
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async getAllNotifications(): Promise<NotificacionesEntity[]> {
        try {
            return await this.NotificationsRepository.find();
        } catch (error) {
            console.error('Error fetching client by id:', error);
            throw CustomError.internalServer()
        }
    }

    async getNotificationsById(id: number): Promise<NotificacionesEntity | null> {
        try {
            return await this.NotificationsRepository.findOne({ where: { id } });
        } catch (error) {
            console.error('Error fetching client by id:', error);
            throw CustomError.internalServer()
        }
    }

    async getNotificationsByLastId(id: number): Promise<NotificacionesEntity | null> {
        try {
            return await this.NotificationsRepository.findOne({ order: { id: 'DESC' } });
        } catch (error) {
            console.error('Error fetching client by id:', error);
            throw CustomError.internalServer()
        }
    }

    async updateRoleCCNotificationDto(updateRoleCCNotificationDto: UpdateRoleCCNotificationDto): Promise<NotificacionesEntity | null> {
        const { id, roleCC } = updateRoleCCNotificationDto
        try {
            const user = await this.NotificationsRepository.findOneBy({ id })
            await this.NotificationsRepository.update({ id }, { roleCC })
            return user;
        } catch (error) {
            console.error('Error fetching client by id:', error);
            throw CustomError.internalServer()
        }
    }
}