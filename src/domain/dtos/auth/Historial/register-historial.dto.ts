import { Validator } from "../../../../config";

export class RegisterHistorialDto {
    private constructor(
        public tittle: string,
        public text: string,
        public img: string,
        public foreignkeyDrive: number,
    ) { }
    
    static create(object: { [key: string]: any; }): [string?, RegisterHistorialDto?] {
        const { tittle, text, img, foreignkeyDrive } = object
        if (!tittle && !text && !img && !foreignkeyDrive) return ['Faltan datos'];

        if (!tittle) return ['Falta el titulo'];

        if (!foreignkeyDrive) return ['Falta id la captura del drive'];
        if (!Validator.number.test(foreignkeyDrive)) return ['id la captura del drive no valido'];

        if (!text) return ['Falta el texto'];

        return [
            undefined,
            new RegisterHistorialDto (tittle, text, img, foreignkeyDrive)
        ]
    }
}