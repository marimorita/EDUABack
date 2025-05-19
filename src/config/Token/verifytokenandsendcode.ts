import { Request, Response } from "express";
import nodemailer from 'nodemailer';
import { envs } from "../envs";
import jwt from "jsonwebtoken";
import { storeVerificationCode } from "./verificationCodes";
import fs from 'fs';
import path from 'path';
import HandleBars from 'handlebars';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: envs.GMAIL_USER,
        pass: envs.GMAIL_PASS,
    },                                         
});
 
const getHtmlTemplate = (code: string, templateName: string = 'Page.html') => {
    const templatePath = path.join(__dirname, `../../email/${templateName}`);
    const source = fs.readFileSync(templatePath, 'utf-8');
    const template = HandleBars.compile(source);
    return template({ verificationCode: code });
};

export const verifyTokenAndSendCode = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }

    try{
        const decoded = jwt.verify(token, envs.JWT_SECRET as string) as any;
        const email = decoded.user.email;
        
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        storeVerificationCode(email, verificationCode);
        const html = getHtmlTemplate(verificationCode);

        const mailOptions ={
            from: `"Tu aplicación" <${envs.GMAIL_USER}>`,
            to: email,
            subject: 'Tu codigo de verificación',
            html,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({status: 'Verification code sent'});
    }catch(error){
        console.error('Error sending email:', error);
        res.status(500).json({status: 'Error sending verification code' });
    }
};