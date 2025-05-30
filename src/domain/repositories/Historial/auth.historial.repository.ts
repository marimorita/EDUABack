import { RegisterHistorialDto } from "../../dtos/auth/Historial/register-historial.dto";
import { HistorialEntity } from "../../../Data";

export abstract class AuthHistorialRepository {
    abstract register(registerHistorialDto: RegisterHistorialDto): Promise<{ message: string }>
    abstract getAllHistorial(): Promise<HistorialEntity[]>
    abstract getHistorialById(id: number): Promise<HistorialEntity | null> 
    abstract getHistroialByLastId(id: number): Promise<HistorialEntity | null>
};