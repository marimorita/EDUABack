import { HistorialEntity } from "../../../Data";
import { AuthHistorialDataSource, AuthHistorialRepository,  RegisterHistorialDto } from "../../../domain";

export class AuthHistorialRepositoryImpl implements AuthHistorialRepository {
    constructor(
        private readonly authHistorialDataSource: AuthHistorialDataSource,
    ) { }
    register(registerHistorialDto: RegisterHistorialDto): Promise<{ message: string }> {
        return this.authHistorialDataSource.register(registerHistorialDto);
    }
}