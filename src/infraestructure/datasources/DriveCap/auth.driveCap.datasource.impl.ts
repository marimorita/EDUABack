import jwt from "jsonwebtoken";
import { envs } from "../../../config/envs";
import { Repository } from "typeorm";
import { BcryptAdapter } from "../../../config";
import { AppDataSource } from "../../../Data/MySQL/OrmConfig"
import { DriveCapEntity } from "../../../Data";
import { AuthDriveCapDataSource, CustomError, RegisterDriveCapDto } from "../../../domain";

export class AuthDriveCapDataSourceImpl implements AuthDriveCapDataSource {
    private readonly DriveCapRepository: Repository<DriveCapEntity>;
    constructor() {
        this.DriveCapRepository = AppDataSource.getRepository(DriveCapEntity);
    }
    async register(registerDriveCapDto: RegisterDriveCapDto): Promise<{ message: string }> {

        const { date, hour, img, foreignKeyReceptionist } = registerDriveCapDto;

        try {
            const newDriveCap = this.DriveCapRepository.create({
                date: date,
                hour: hour,
                img: img,
                foreignKeyReceptionist: foreignKeyReceptionist,
            });

            await this.DriveCapRepository.save(newDriveCap);
            return { message: 'Captura del drive registrada correctamente' };
        } catch (error) {
            console.error("error registering DriveCap", error);
            if (error instanceof CustomError) {
                console.error("error registering DriveCap", error);
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async getAllDriveCap(): Promise<DriveCapEntity[]> {
        try {
            return await this.DriveCapRepository.find();
        } catch (error) {
            console.error('Error fetching client by id:', error);
            throw CustomError.internalServer()
        }
    }

    async getDriveCapByDate(date: Date): Promise<DriveCapEntity | null> {
        try {
            return await this.DriveCapRepository.findOne({ where: { date } });
        } catch (error) {
            console.error('Error fetching client by id:', error);
            throw CustomError.internalServer()
        }
    }
    async getDriveCapByLastId(): Promise<DriveCapEntity | null> {
        try {
            const result = await this.DriveCapRepository.find({order:{id: 'DESC'}, take: 1});
            return result[0] || null
        } catch (error) {
            console.error('Error fetching client by id:', error);
            throw CustomError.internalServer()
        }
    }
}