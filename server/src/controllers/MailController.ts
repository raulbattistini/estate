import { resolve } from "path";
import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { ISendService } from "../interfaces";
import { mailRepository, userRepository } from "../repositories";
import { Mail } from "../models/Mail";
import { User } from "../models/User";
import { MailService } from "../services/MailService";
export class MailController {
  async sendMail(req: Request, res: Response, next: NextFunction) {
    const { email, mail_id } = req.body;

    console.log(email);

    const mail = new Mail();

    const newUser = new User();

    const mailService = new MailService();

    const user = await userRepository.findOneBy({ email });

    if (!user)
      return res.status(404).json({
        message: `There was no user with email ${email}`,
      });

    const mailPath = resolve(__dirname, "..", "views", "emails", "mailSent.hbs");

    const variables = {
      id: "",
      name: newUser.name,
      title: mail.title,
      description: mail.title,
    };

    const mailSent = await mailRepository.findOneBy({ mail_id });

    if (!mailSent)
      return res.status(404).json({
        message: `No mails sent identified by id ${mail_id}`,
      });
      
    if (mailSent) {
      variables.id = mailSent.mail_id;
      await mailService.sendMail(email, mail.title, variables, mailPath);
      return res.status(200).json({
        message: `Mail info: ${mailSent}`,
      });
    }

    await mailRepository.save(mailSent);
  }
}
