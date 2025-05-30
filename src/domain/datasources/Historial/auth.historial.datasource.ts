import { HistorialEntity } from "../../../Data";
import { RegisterHistorialDto } from "../../dtos/auth/Historial/register-historial.dto";

export abstract class AuthHistorialDataSource {
    abstract register(registerHistorialDto: RegisterHistorialDto): Promise<{ message: string }>
    abstract getAllHistorial(): Promise<HistorialEntity[]>
    abstract getHistorialById(id: number): Promise<HistorialEntity | null> 
    abstract getHistroialByLastId(id: number): Promise<HistorialEntity | null>
}