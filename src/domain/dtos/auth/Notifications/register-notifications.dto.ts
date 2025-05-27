import { Validator } from "../../../../config";

export class RegisterNotificationsDto {
    private constructor(
        public tittle: string,
        public text: string,
        public foreignKeyDrive: number, 
    ) { }
    static create(object: { [key: string]: any; }): [string?, RegisterNotificationsDto?] {
        const {tittle, text, foreignKeyDrive } = object
        if (!tittle && !text) return ['Faltan datos'];

        if (!tittle) return ['Falta el titulo'];
        if (!Validator.text.test(tittle)) return ['Titulo invalido'];

        if (!text) return ['falta fecha captura drive'];
        if (!Validator.text.test(text)) return ['falta fecha captura drive'];
        
        if (!foreignKeyDrive) return ['Falta llave foranea drive'];
        if (!Validator.text.test(foreignKeyDrive)) return ['llave foranea drive no valida'];

        return [
            undefined,
            new RegisterNotificationsDto(tittle, text, foreignKeyDrive)
        ]
    }
}
