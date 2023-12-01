import nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';
import pug from 'pug';
import { injectable } from 'tsyringe';

@injectable()
export class EmailService{
    private transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'localhost',
            port: 1025,
        });
    }

    public renderTemplate = (templatePath: string, templateData: object) => {
        const compiledFunc = pug.compileFile(templatePath);
        return compiledFunc(templateData);
    }

    public sendMail = async (
        to: string,
        subject: string,
        templatePath: string,
        templateData: object
    ) => {
        // const html = this.renderTemplate(templatePath, templateData);
        console.log({ templatePath, templateData });
        const mailOptions: Options = {
            from: 'admin@localhost.com',
            to,
            subject,
            html: 'htm jaa'
        };
        await this.transporter.sendMail(mailOptions);
    }

}