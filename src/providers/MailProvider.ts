import nodemailer, { Transporter } from 'nodemailer'
import exphbs from 'express-handlebars';
import nodemailerHbs from 'nodemailer-express-handlebars'
import { resolve } from 'path';

class MailProvider {
  private transporter: Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_MAIL_HOST,
      port: Number(process.env.SMTP_MAIL_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    this.configureTemplates()
  }

  private configureTemplates() {
    const viewsPath = resolve(__dirname, '..', 'views', 'emails')
    this.transporter.use('compile',
      nodemailerHbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewsPath, 'layouts'),
          partialsDir: resolve(viewsPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs'
        }),
        viewPath: viewsPath,
        extName: '.hbs'
      })
    )
  }

  async send(to: string, subject: string, template: string, context: any): Promise<void> {
    try {
      const mail = {
        from: process.env.MAIL_USER,
        to,
        subject,
        template,
        context
      }
      await this.transporter.sendMail(mail)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new MailProvider()