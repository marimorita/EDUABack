import jwt from "jsonwebtoken";
import { envs } from "../../../config/envs";
import { Repository } from "typeorm";
import { BcryptAdapter } from "../../../config";
import { AppDataSource } from "../../../Data/MySQL/OrmConfig"
import { VisitorEntity } from "../../../Data";
import { AuthVisitorDataSource, CustomError, LoginVisitorDto, RegisterVisitorDto } from "../../../domain";

export class AuthVisitorDataSourceImpl implements AuthVisitorDataSource {
    private readonly VisitorRepository: Repository<VisitorEntity>;
    constructor() {
        this.VisitorRepository = AppDataSource.getRepository(VisitorEntity);
    }
    async register(registerVisitorDto: RegisterVisitorDto): Promise<{ message: string }> {

        const { id, name, lastNames, email, password, post, role, cel, img } = registerVisitorDto;
        const hashedPassword = BcryptAdapter.hash(password);

        try {
            const existingVisitorById = await this.VisitorRepository.findOne({ where: { id } });
            if (existingVisitorById) throw CustomError.badRequest('Ya existe un usuario con esa cedula');
            const newVisitor = this.VisitorRepository.create({
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

            await this.VisitorRepository.save(newVisitor);
            return { message: 'Visitor registrado correctamente' };
        } catch (error) {
            console.error("error registering Visitor", error);
            if (error instanceof CustomError) {
                console.error("error registering Visitor", error);
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async getAllVisitor(): Promise<VisitorEntity[]> {
        try {
            return await this.VisitorRepository.find();
        } catch (error) {
            console.error('Error fetching client by id:', error);
            throw CustomError.internalServer()
        }
    }
    async getVisitorByEmail(email: string): Promise<VisitorEntity | null> {
        try {
            return await this.VisitorRepository.findOne({ where: { email } });
        } catch (error) {
            console.error('Error fetching client by id:', error);
            throw CustomError.internalServer()
        }
    }

    async login(loginVisitorDto: LoginVisitorDto): Promise<{ token: string, role: string | undefined, name: string | undefined, message: string }> {
        const { email, password } = loginVisitorDto

        try {
            const Visitor = await this.VisitorRepository.findOne({ where: { email } });
            if (!Visitor) throw CustomError.badRequest('No existe el usuario');

            if (!Visitor.password) throw CustomError.unauthorized("Contraseña incorrecta");

            const isPasswordValid = BcryptAdapter.compare(password, Visitor.password);
            if (!isPasswordValid) throw CustomError.unauthorized("Contraseña incorrecta");

            const token = jwt.sign({ user: { email: Visitor.email, role: Visitor.role } }, envs.JWT_SECRET as string, { expiresIn: '1h' });

            return {
                token,
                role: Visitor.role,
                message: "Inicio de sesión exitoso",
                name: Visitor.name ?? '',
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