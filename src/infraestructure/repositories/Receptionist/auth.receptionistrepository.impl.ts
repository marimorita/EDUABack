import { ReceptionistEntity } from "../../../Data";
import { AuthReceptionistDataSource, RegisterReceptionistDto, AuthReceptionistRepository } from "../../../domain";

export class AuthReceptionistRepositoryImpl implements AuthReceptionistRepository {
    constructor(
        private readonly authReceptionistDataSource: AuthReceptionistDataSource,
    ){}
    register(registerReceptionistDto: RegisterReceptionistDto): Promise<{message: string}>{
        return this.authReceptionistDataSource.register(registerReceptionistDto);
    } 
}