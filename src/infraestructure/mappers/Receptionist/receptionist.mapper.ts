import { Entity } from 'typeorm';
import { CustomError } from '../../../domain';
import { ReceptionistEntity } from '../../../Data';

export class ReceptionistMapper {
    public static toDomain(object: any): ReceptionistEntity {
        const { id, name, lastNames, post, cel, email, password, role, img } = object;
        if (!id) throw CustomError.badRequest('Falta cedula');
        if (!name) throw CustomError.badRequest('Falta nombre');
        if (!lastNames) throw CustomError.badRequest('Faltan apellidos');
        if (!post) throw CustomError.badRequest('Falta cargo');
        if (!cel) throw CustomError.badRequest('Falta celular');
        if (!email) throw CustomError.badRequest('Falta correo');
        if (!password) throw CustomError.badRequest('Falta contraseña');
        if (!role) throw CustomError.badRequest('Falta rol');
        if (!img) throw CustomError.badRequest('Falta imagen');

        return {id, 
            name,
            lastNames,
            post,
            cel,
            email, 
            password, 
            role,
            img
            };
    }

    public static toPersistence(entity: ReceptionistEntity): any {
        return {
            id: entity.id,
            name: entity.name,
            lastNames: entity.lastNames,    
            post: entity.post,  
            cel: entity.cel,    
            email: entity.email,
            password: entity.password,
            role: entity.role,
            img: entity.img
        }
    }
}