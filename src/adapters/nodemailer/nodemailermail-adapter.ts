import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapters";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0c9fd56349ef82",
      pass: "6b4afd3cf29f89"
    }
  });


export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
        from: 'equipe Feedget <Feedgetigor@gmail.com>',
        to: 'igor Fernandes <igorsife80@gmail.com>',
        subject: subject,
        html: body,
    })
    };
}