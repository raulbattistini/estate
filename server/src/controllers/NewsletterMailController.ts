import { resolve } from "path";
import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { ISendService } from "../interfaces";
import { newsletterRepository, userRepository } from "../repositories";
import { NewsletterMail } from "../models/NewsletterMail";
import { User } from "../models/User";
import { MailService } from "../services/NewsletterMailService";
export class NewsletterMailController {
  async sendMail(req: Request, res: Response, next: NextFunction) {
    try {
      const { mail_address, id, email } = req.body;

      console.log(mail_address);

      const mail = new NewsletterMail();

      const newUser = new User();

      const mailService = new MailService();

      const user = await userRepository.findOneBy({ email });

      if (!user)
        return res.status(404).json({
          message: `There was no user with email ${mail_address}`,
        });

      const mailPath = resolve(__dirname, "..", "views", "emails", "mailSent.hbs");

      const variables = {
        id: "",
        name: newUser.name,
      };

      const mailSent = await newsletterRepository.findOneBy({ id });

      if (!mailSent)
        return res.status(404).json({
          message: `No mails sent identified by id ${id}`,
        });

      if (mailSent) {
        variables.id = mailSent.id;
        await mailService.sendMail(mail_address, mail.title, variables, mailPath);
        return res.status(200).json({
          message: `Mail info: ${mailSent}`,
        });
      }

      await newsletterRepository.save(mailSent);
    } catch (error) {
      return next(error);
    }
  }
}
