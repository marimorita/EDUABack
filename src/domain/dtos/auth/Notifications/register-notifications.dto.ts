import { Validator } from "../../../../config";

export class RegisterNotificationsDto {
    private constructor(
        public tittle: string,
        public text: string,
        public img: string,
        public foreignKeyDrive: number, 
        public roleCC: number
    ) { }
    static create(object: { [key: string]: any; }): [string?, RegisterNotificationsDto?] {
        const {tittle, text, foreignKeyDrive, img, roleCC } = object
        if (!tittle && !text) return ['Faltan datos'];

        if (!tittle) return ['Falta el titulo'];

        if (!text) return ['falta fecha captura drive'];
        
        if (!foreignKeyDrive) return ['Falta llave foranea drive'];
        if (!Validator.number.test(foreignKeyDrive)) return ['llave foranea drive no valida'];

        return [
            undefined,
            new RegisterNotificationsDto(tittle, text, img, foreignKeyDrive, roleCC )
        ]
    }
}

export class UpdateRoleCCNotificationDto {
    private constructor(
        public id: number, 
        public roleCC: number
    ) { }
    static create(object: { [key: string]: any; }): [string?, UpdateRoleCCNotificationDto?]{
        const { id, roleCC } = object
        if (!id && !roleCC) return ['Faltan datos'];

        return [
            undefined,
            new UpdateRoleCCNotificationDto(id, roleCC )
        ]
    }
}