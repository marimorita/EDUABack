interface VerificationCode {
    email: string;
    code: string;
    expiresAt: number;
}
/*Aca se verifica el codigo del correo y se la un tiempo de expiración*/
const verificationCodes: VerificationCode[] = [];

export const storeVerificationCode = (email: string, code: string) => {
    const expiresAt = Date.now() + 5 * 60 * 1000; // 10 minutes from now
    verificationCodes.push({ email, code, expiresAt });
};

export const getVerificationCode = (email: string, code:string) => {
    return verificationCodes.find(
        (vc) => vc.email === email && vc.code === code && vc.expiresAt > Date.now()
    );
};
