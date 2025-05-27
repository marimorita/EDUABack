import jwt from "jsonwebtoken";
import { envs } from "../../../config/envs";
import { Repository } from "typeorm";
import { BcryptAdapter } from "../../../config";
import { AppDataSource } from "../../../Data/MySQL/OrmConfig"
import { DirectorEntity } from "../../../Data";
import { AuthDirectorDataSource, CustomError, LoginDirectorDto, RegisterDirectorDto } from "../../../domain";

export class AuthDirectorDataSourceImpl implements AuthDirectorDataSource {
    private readonly DirectorRepository: Repository<DirectorEntity>;
    constructor() {
        this.DirectorRepository = AppDataSource.getRepository(DirectorEntity);
    }
    async register(registerDirectorDto: RegisterDirectorDto): Promise<{ message: string }> {

        const { id, name, lastNames, email, password, post, role, cel, img } = registerDirectorDto;
        const hashedPassword = BcryptAdapter.hash(password);

        try {
            const existingDirectorById = await this.DirectorRepository.findOne({ where: { id } });
            if (existingDirectorById) throw CustomError.badRequest('Ya existe un director con esa cedula');
            const newDirector = this.DirectorRepository.create({
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

            await this.DirectorRepository.save(newDirector);
            return { message: 'Director registrado correctamente' };
        } catch (error) {
            console.error("error registering Director", error);
            if (error instanceof CustomError) {
                console.error("error registering Director", error);
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async login(loginDirectorDto: LoginDirectorDto): Promise<{ token: string, role: string | undefined, message: string }> {
        const { email, password } = loginDirectorDto

        try {
            const Director = await this.DirectorRepository.findOne({ where: { email } });
            if (!Director) throw CustomError.badRequest('No existe el usuario');

            if (!Director.password) throw CustomError.unauthorized("Contraseña incorrecta");

            const isPasswordValid = BcryptAdapter.compare(password, Director.password);
            if (!isPasswordValid) throw CustomError.unauthorized("Contraseña incorrecta");

            const token = jwt.sign({ user: { email: Director.email, role: Director.role } }, envs.JWT_SECRET as string, { expiresIn: '1h' });

            return {
                token,
                role: Director.role,
                message: "Inicio de sesión exitoso"
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