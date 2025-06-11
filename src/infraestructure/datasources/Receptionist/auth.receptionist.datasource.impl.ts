import jwt from "jsonwebtoken";
import { envs } from "../../../config/envs";
import { Repository } from "typeorm";
import { BcryptAdapter } from "../../../config";
import { AppDataSource } from "../../../Data/MySQL/OrmConfig"
import { ReceptionistEntity } from "../../../Data";
import { AuthReceptionistDataSource, CustomError, LoginReceptionistDto, RegisterReceptionistDto } from "../../../domain";


export class AuthReceptionistDataSourceImpl implements AuthReceptionistDataSource {
    private readonly receptionistRepository: Repository<ReceptionistEntity>;
    constructor() {
        this.receptionistRepository = AppDataSource.getRepository(ReceptionistEntity);
    }
    async register(registerReceptionistDto: RegisterReceptionistDto): Promise<{ message: string }> {

        const { id, name, lastNames, email, password, post, role, cel, img } = registerReceptionistDto;
        const hashedPassword = BcryptAdapter.hash(password);

        try {
            const existingReceptionistById = await this.receptionistRepository.findOne({ where: { id } });
            if (existingReceptionistById) throw CustomError.badRequest('Ya existe un recepcionista con esa cedula');
            const newReceptionist = this.receptionistRepository.create({
                id: id,
                name: name,
                lastNames: lastNames,
                email: email,
                password: hashedPassword,
                post: post,
                role: role,
                cel: cel,
                img: img
            });

            await this.receptionistRepository.save(newReceptionist);
            return { message: 'Recepcionista registrado correctamente' };
        } catch (error) {
            console.error("error registering receptionist", error);
            if (error instanceof CustomError) {
                console.error("error registering receptionist", error);
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async getAllReceptionist(): Promise<ReceptionistEntity[]> {
        try {
            return await this.receptionistRepository.find();
        } catch (error) {
            console.error('Error fetching client by id:', error);
            throw CustomError.internalServer()
        }
    }
    async getReceptionistByEmail(email: string): Promise<ReceptionistEntity | null> {
        try {
            return await this.receptionistRepository.findOne({ where: { email } });
        } catch (error) {
            console.error('Error fetching client by id:', error);
            throw CustomError.internalServer()
        }
    }
    async login(loginReceptionistDto: LoginReceptionistDto): Promise<{ token: string, role: string | undefined, name: string | undefined,  message: string }> {
        const { email, password } = loginReceptionistDto

        try {
            const receptionist = await this.receptionistRepository.findOne({ where: { email } });
            if (!receptionist) throw CustomError.badRequest('No existe el usuario');

            if (!receptionist.password) throw CustomError.unauthorized("Contraseña incorrecta");

            const isPasswordValid = BcryptAdapter.compare(password, receptionist.password);
            if (!isPasswordValid) throw CustomError.unauthorized("Contraseña incorrecta");

            const token = jwt.sign({ user: { email: receptionist.email, role: receptionist.role } }, envs.JWT_SECRET as string, { expiresIn: '1h' });

            return {
                token,
                role: receptionist.role,
                message: "Inicio de sesión exitoso",
                name: receptionist.name ?? '', 
            };
        } catch (error) {
            console.error("Error registering client: ", error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}