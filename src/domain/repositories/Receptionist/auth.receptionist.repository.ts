import { LoginReceptionistDto, RegisterReceptionistDto } from "../../dtos/auth/Receptionist/register-receptionist.dto";
import { ReceptionistEntity } from "../../../Data";

export abstract class AuthReceptionistRepository {
    abstract register(registerReceptionistDto: RegisterReceptionistDto): Promise<{ message: string }>
    abstract getAllReceptionist(): Promise<ReceptionistEntity[]>
    abstract login(loginReceptionistDto: LoginReceptionistDto): Promise<{ token: string, role: string | undefined, message: string }>
    abstract getReceptionistByEmail(email: string): Promise<ReceptionistEntity | null>
};