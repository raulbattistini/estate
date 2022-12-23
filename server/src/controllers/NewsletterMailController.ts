import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
export class NewsletterMailController {
  async sendMail(req: Request, res: Response, next: NextFunction) {
    try {
      let testAccount = await nodemailer.createTestAccount();
      //  checking function progress. Gmail might not notify
      console.log("Credentials obtained, sending message");
      const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: 587,
        // secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
        logger: true,
        transactionLog: true,
      });

      let info = await transporter.sendMail({
        from: '"FLRE Consulting" <thesamplemail@sample.com>',
        to: "Raul Battistini <raulbattistini.3@gmail.com>", // you can contact me at this email, by the way
        subject: `Keep yourself up to date with our company!`,
        html: `<body
        style="
          background-color: black;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
            'Open Sans', 'Helvetica Neue', sans-serif;
        "
      >
      <span style="color: white; font-weight: 100;"> Thanks for your subscription! You'll be receiving our updates weekly and you can opt out of our list any time. </span>
      <span style="color: white; font-weight: 100;"> <a href="" style="text-decoration: none;"> </a> </span>
      </body>`,
      });
      transporter.sendMail(info, (error, info) => {
        if (error) {
          console.log("Error occurred");
          console.log(error.message);
          return process.exit(1);
        }

        console.log("Message sent successfully!");
        console.log(nodemailer.getTestMessageUrl(info));

        // only needed when using pooled connections
        transporter.close();
      });
      res.status(200).json(info);
    } catch (error) {
      return next(error);
    }
  }
}
