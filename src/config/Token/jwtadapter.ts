import { get } from "env-var";
import jwt from "jsonwebtoken";

export class JwtAdapter { 
    private static readonly secretKey: string = get("JWT_SECRET").required().asString();

    static sign(payload: any): string {
        return jwt.sign(payload, this.secretKey, { expiresIn: "1h" });
    }

    static verify(token: string): any {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error("Invalid token");
        }
    }
} /*Se crea el token y se asigna la duración del mismo. Se verifica el token*/