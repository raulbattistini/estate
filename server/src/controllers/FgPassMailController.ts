import "dotenv/config";
import { NextFunction } from "express";
import { Request, Response } from "express";
import nodemailer from "nodemailer";
const sgMail = require("@sendgrid/mail");

export class ForgotPasswordController {
  async sendForgotPassMail(req: Request, res: Response, next: NextFunction) {
    try {
      let testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        // secure: testAccount.smtp.secure,
        auth: {
          user: process.env.TEST_MAIL_ADDRESS,
          pass: process.env.TEST_MAIL_PASSWORD,
        },
      });

      let info = await transporter.sendMail({
        from: '"FLRE Consulting" <raulbattistini.3@gmail.com>',
        to: '"raulbattistini.3@gmail.com"', // you can contact me at this email, by the way
        subject: "Test",
        html: "<h1> Sending mails with Node </h1>",
      });

      res.status(200).json(info);
    } catch (error) {
      return next(error);
    }
  }

  async sendMail(req: Request, res: Response, next: NextFunction) {
    try {
      sgMail.setApiKey(process.env!.SENDGRID_API_KEY as string);

      const msg = {
        to: "raulbattistini.3@gmail.com",
        from: "raulbattistini.3@gmail.com",
        subject: "Sendind with sendgrid",
        text: "testing text too",
        html: "<b> And with deprecated tags </b>",
      };

      const info = await sgMail.send(msg);
      res.status(200).json(info);
    } catch (error) {
      return next(error);
    }
  }
}
