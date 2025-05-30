import jwt from "jsonwebtoken";
import { envs } from "../../../config/envs";
import { Repository } from "typeorm";
import { BcryptAdapter } from "../../../config";
import { AppDataSource } from "../../../Data/MySQL/OrmConfig"
import { MemberTeamEntity } from "../../../Data";
import { AuthMemberTeamDataSource, CustomError, LoginMemberTeamDto, RegisterMemberTeamDto } from "../../../domain";

export class AuthMemberTeamDataSourceImpl implements AuthMemberTeamDataSource {
    private readonly MemberTeamRepository: Repository<MemberTeamEntity>;
    constructor() {
        this.MemberTeamRepository = AppDataSource.getRepository(MemberTeamEntity);
    }
    async register(registerMemberTeamDto: RegisterMemberTeamDto): Promise<{ message: string }> {

        const { id, name, lastNames, email, password, post, role, cel, img } = registerMemberTeamDto;
        const hashedPassword = BcryptAdapter.hash(password);

        try {
            const existingMemberTeamById = await this.MemberTeamRepository.findOne({ where: { id } });
            if (existingMemberTeamById) throw CustomError.badRequest('Ya existe un miembro del equipo con esa cedula');
            const newMemberTeam = this.MemberTeamRepository.create({
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

            await this.MemberTeamRepository.save(newMemberTeam);
            return { message: 'Miembro del equipo registrado correctamente' };
        } catch (error) {
            console.error("error registering MemberTeam", error);
            if (error instanceof CustomError) {
                console.error("error registering MemberTeam", error);
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async getAllMemberTeam(): Promise<MemberTeamEntity[]> {
        try {
            return await this.MemberTeamRepository.find();
        } catch (error) {
            console.error('Error fetching client by id:', error);
            throw CustomError.internalServer()
        }
    }
    async getMemberTeamByEmail(email : string): Promise<MemberTeamEntity | null> {
        try {
            return await this.MemberTeamRepository.findOne({where: {email}});
        } catch (error) {
            console.error('Error fetching client by id:', error);
            throw CustomError.internalServer()
        }
    }
    async login(loginMemberTeamDto: LoginMemberTeamDto): Promise<{ token: string, role: string | undefined, message: string }> {
        const { email, password } = loginMemberTeamDto

        try {
            const MemberTeam = await this.MemberTeamRepository.findOne({ where: { email } });
            if (!MemberTeam) throw CustomError.badRequest('No existe el usuario');

            if (!MemberTeam.password) throw CustomError.unauthorized("Contraseña incorrecta");

            const isPasswordValid = BcryptAdapter.compare(password, MemberTeam.password);
            if (!isPasswordValid) throw CustomError.unauthorized("Contraseña incorrecta");

            const token = jwt.sign({ user: { email: MemberTeam.email, role: MemberTeam.role } }, envs.JWT_SECRET as string, { expiresIn: '1h' });

            return {
                token,
                role: MemberTeam.role,
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