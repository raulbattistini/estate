import fs from 'fs';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import { ISendService } from "../interfaces";


export class MailService {
   private client: Transporter;

   async sendMail ({to, subject, variables, path}: ISendService){
      await nodemailer.createTestAccount().then((testAccount) =>{
         const transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
               user: testAccount.user,
               pass: testAccount.pass
            }
         })
         this.client = transporter;
       });
      const templateFileContent = fs.readFileSync(path).toString('utf-8');

      const mailTemplateParse = handlebars.compile(templateFileContent);

      const html = mailTemplateParse(variables);

      const message = await this.client.sendMail({
         to,
         subject,
         html,
         from: "FLRE <noreply@fl-re.com>"
      });

      console.log("Message sent: %s", message.id);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
   }
}