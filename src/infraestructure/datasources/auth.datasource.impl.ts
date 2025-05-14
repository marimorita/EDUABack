import { Repository } from "typeorm";
import { AuthReceptionistDataSource, CustomError, RegisterReceptionistDto } from "../../domain";
import { AppDataSource } from "../../Data/MySQL/OrmConfig"
import { ReceptionistEntity } from "../../Data";
import { ReceptionistMapper } from "../mappers/Receptionist/receptionist.mapper";
import { log } from "node:console";

export class AuthReceptionistDataSourceImpl implements AuthReceptionistDataSource {
    private readonly receptionistRepository: Repository<ReceptionistEntity>;
    constructor(){
        this.receptionistRepository = AppDataSource.getRepository(ReceptionistEntity);
    }
    async register(registerReceptionistDto: RegisterReceptionistDto): Promise<{message : string}> {
        const {id, name, lastNames, email, password, post, role, cel, img} = registerReceptionistDto;
     try {
        const existingReceptionistById = await this.receptionistRepository.findOne({where: {id} });
        if (existingReceptionistById) throw CustomError.badRequest('Ya existe un recepcionista con esa cedula'); 
        const newReceptionist = this.receptionistRepository.create ({
            id: id,
            name: name,
            lastNames: lastNames,
            email: email,
            password: password,
            post: post,
            role: role,
            cel: cel,
            img: img
        });

        await this.receptionistRepository.save(newReceptionist);
        return {message: 'Recepcionista registrado correctamente'};
    }catch (error) {
    console.error("error registering receptionist", error);
        if (error instanceof CustomError) {
            throw error;
        }
        throw CustomError.internalServer();
        }
    }
}