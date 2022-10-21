import {Request, Response, NextFunction} from 'express';
import nodemailer from 'nodemailer';
import * as sgmail from '@sendgrid/mail';
import {ISendService} from '../interfaces';

export class MailController {
   async sendMail (req: Request, res: Response, next: NextFunction){

   }
}