import { Validator } from "../../../presentation/config";

export class RegisterUserDto {
    private constructor(
        public name: string,
        public email: string,
        public password: string
    ){}
    static create (object: {[key:string]: any}) : [string?, RegisterUserDto?]{
        const {name, email, password} = object;

        if (!name) return ['Missing name'];
        if (!email) return ['Missing email'];
        if (!password) return ['Missing password'];
        if (password.length < 6 ) return ['Password too short'];
        if (!Validator.email.test(email)) return ['Email invalid']
        return[
            undefined,
            new RegisterUserDto(name, email, password)
        ]
    }
}