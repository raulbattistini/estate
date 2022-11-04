import { NextFunction } from 'express';
import { Request, Response } from 'express';
import  nodemailer from 'nodemailer';
import * as sgmail from '@sendgrid/mail';

export class ForgotPasswordController {

    async sendForgotPassMail(req: Request, res: Response, next: NextFunction){

        try {
            
            let testAccount = await nodemailer.createTestAccount();

            const transporter = nodemailer.createTransport({
                host: testAccount.smtp.host,
                port: testAccount.smtp.port,
                secure: testAccount.smtp.secure,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
                }
            })

            let info = await transporter.sendMail({
                from: '"FLRE Consulting" <no-reply@realestate.fl>',
                to: '"raulbattistini.3@gmail.com"', // you can contact me at this email, by the way
                subject: 'Test',
                html: '<h1> Sending mails with Node </h1>'
            });

            res.status(200).json(info)
        } catch (error) {
            return next(error);
        }
    
    }

    async sendMail(req: Request, res: Response, next: NextFunction){
        try {
            sgmail.setApiKey(process.env!.SENDGRID_API_KEY as string);
            
            const msg = {
                to: 'raulbattistini.3@gmail.com',
                from: 'foo@bar.com',
                subject: 'Sendind with sendgrid',
                text: "testing text too",
                html: '<b> And with deprecated tags </b>'
            }

            const info = await sgmail.send(msg);

            res.status(200).json(info);
            
        } catch (error) {
            return next(error);
        }
    }
}