import { random } from "../helpers/randomNumber";
import "dotenv/config";
import { NextFunction } from "express";
import { Request, Response } from "express";
import nodemailer from "nodemailer";

export class ForgotPasswordController {
  async sendForgotPassMail(req: Request, res: Response, next: NextFunction) {
    try {
      let testAccount = await nodemailer.createTestAccount((err, account) => {
        if (err) {
          console.log(err instanceof Error ? err.message : "Internal Server Error");
          return res.status(400).end();
        }
      });
      //  checking function progress. Gmail might not notify
      console.log("Credentials obtained, sending message");
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        // secure: testAccount.smtp.secure,
        auth: {
          user: process.env.TEST_MAIL_ADDRESS,
          pass: process.env.TEST_MAIL_PASSWORD,
        },
        logger: true,
        transactionLog: true,
      });

      let info = await transporter.sendMail({
        from: '"FLRE Consulting" <thesamplemail@sample.com>',
        to: "Raul Battistini <raulbattistini.3@gmail.com>", // you can contact me at this email, by the way
        subject: `Recover your password`,
        html: `<body
        style="
          background-color: black;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
            'Open Sans', 'Helvetica Neue', sans-serif;
        "
      >
        <div style="display: flex; justify-content: center; justify-items: center; position: relative; text-align: center">
          <h1
            style="
              color: whitesmoke;
              display: flex;
              justify-content: center;
              justify-items: center;
              position: relative;
              text-align: center;
              font-weight: 200;
            "
          >
            Forgot your password? No problem!
          </h1>
        </div>
        <div style="display: flex; font-weight: 100; justify-content: center; justify-items: center">
          <p style="color: white; display: block">Here is your code for recovery:</p>
          <br />
          <br />
          <p id="recovery" style="color: white; display: inline-table">${random()}</p>
        </div>
          <div style="display: flex; justify-content: center;">
        <span style="display: inline; position: relative; text-align: center">
          <a href="/" style="text-decoration: none; color: darkcyan"> Click here to redefine your password</a>
        </span>
       </div>
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

  // async sendMail(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     sgMail.setApiKey(process.env!.SENDGRID_API_KEY as string);

  //     const msg = {
  //       to: "raulbattistini.3@gmail.com",
  //       from: "raulbattistini.3@gmail.com",
  //       subject: "Sendind with sendgrid",
  //       text: "testing text too",
  //       html: "<b> And with deprecated tags </b>",
  //     };

  //     const info = await sgMail.send(msg);
  //     res.status(200).json(info);
  //   } catch (error) {
  //     return next(error);
  //   }
  // }
}
