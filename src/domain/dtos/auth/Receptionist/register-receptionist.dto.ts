import { Validator } from "../../../../config";

export class RegisterReceptionistDto {
    private constructor(
        public id: number,
        public name: string,
        public post: string,
        public lastNames: string,
        public email: string,
        public password: string,
        public cel: number,
        public role: string,
        public img: string
    ) { }
    static create(object: { [key: string]: any; }): [string?, RegisterReceptionistDto?] {
        const { id, name, post, lastNames, email, password, cel, role, img } = object
        if (!id && !name && !post && !lastNames && !email && !password && !cel && !role && !img) return ['Faltan datos'];

        if (!name) return ['Falta el nombre'];
        if (!Validator.text.test(name)) return ['Nombre invalido'];

        if (!lastNames) return ['Falta el apellido'];
        if (!Validator.text.test(lastNames)) return ['Apellidos no validos'];

        if (!id) return ['Falta la cedula']
        if (!Validator.number.test(id)) return ['Solo numeros para la cedula'];

        if (!email) return ['Falta el correo'];
        if (!Validator.email.test(email)) return ['Correo invalido'];

        if (!password) return ['Falta la contraseña'];
        if (password.length < 6) return ['Contraseña muy corta'];
 
        if (!post) return ['Falta el cargo'];
        if (!Validator.text.test(post)) return ['Apellido invalido'];

        if (!cel) return ['Falta el telefono'];
        if (!cel.toString().startsWith("3")) return ['El numero tiene que empezar por 3'];
        if (cel.length < 10) return ['Numero telefonico muy corto'];
        if (cel.length > 12) return ['Numero telefonico muy largo'];
        if (!Validator.number.test(cel)) return ['Solo caracteres numericos en numero telefonico'];

        if (!role) return ['Falta el rol'];
        if (!Validator.text.test(role)) return ['Rol invalido']

        if (password.length < 6) return ['Contraseña muy corta'];

        return [
            undefined,
            new RegisterReceptionistDto(id, name, post, lastNames, email, password, cel, role, img)
        ]
    }
}

export class LoginReceptionistDto {
    private constructor(
        public email: string,
        public password: string
    ){}

    static create(object: { [key: string]: any; }): [string?, LoginReceptionistDto?] {
        const { email, password } = object

        if (!email && !password) return ['Faltan el correo y contraseña'];

        if (!email) return ['Falta el correo'];
        if (!Validator.email.test(email)) return ['Correo invalido'];

        if (!password) return ['Falta la contraseña'];
        if (password.length < 6) return ['Contraseña muy corta'];

        return [
            undefined,
            new LoginReceptionistDto(email, password)
        ]
    }
}