import jwt from "jsonwebtoken";
import { envs } from "../../../config/envs";
import { Repository } from "typeorm";
import { BcryptAdapter } from "../../../config";
import { AppDataSource } from "../../../Data/MySQL/OrmConfig"
import { HistorialEntity } from "../../../Data";
import { AuthHistorialDataSource, CustomError, RegisterHistorialDto } from "../../../domain";

export class AuthHistorialDataSourceImpl implements AuthHistorialDataSource {
    private readonly HistorialRepository: Repository<HistorialEntity>;
    constructor() {
        this.HistorialRepository = AppDataSource.getRepository(HistorialEntity);
    }
    async register(registerHistorialDto: RegisterHistorialDto): Promise<{ message: string }> {

        const { tittle, text, img, foreignkeyDrive  } = registerHistorialDto;

        try {
            const newHistorial = this.HistorialRepository.create({
                tittle: tittle,
                text: text,
                img: img,
                foreignkeyDrive : foreignkeyDrive ,
            });

            await this.HistorialRepository.save(newHistorial);
            return { message: 'Historial registrado correctamente' };
        } catch (error) {
            console.error("error registering Historial", error);
            if (error instanceof CustomError) {
                console.error("error registering Historial", error);
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}