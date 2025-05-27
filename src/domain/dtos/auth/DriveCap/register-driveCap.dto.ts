import { Validator } from "../../../../config";

export class RegisterDriveCapDto {
    private constructor(
        public date: Date,
        public hour: string,
        public img: string,
        public foreignKeyReceptionist: number,
    ) { }
    static create(object: { [key: string]: any; }): [string?, RegisterDriveCapDto?] {
        const { date, tittle, hour, img, foreignKeyReceptionist } = object
        if (!tittle && !hour && !img && !foreignKeyReceptionist) return ['Faltan datos'];

        if (!hour) return ['Falta la hora'];

        if (!date) return ['Falta la fecha'];

        if (!foreignKeyReceptionist) return ['Falta la cedula del recepcionista'];
        if (!Validator.number.test(foreignKeyReceptionist)) return ['Cedula Recepcionista no valida'];

        return [
            undefined,
            new RegisterDriveCapDto(date, hour, img, foreignKeyReceptionist )
        ]
    }
}