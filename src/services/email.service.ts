import { Service } from 'typedi';
import nodemailer from 'nodemailer';
import { CLIENT_URL, MAIL_FROM, MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_USER } from '@/config';

@Service()
export default class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: Number(MAIL_PORT),
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
      },
    });
  }

  public sendEmail(to: string, subject: string, html: string): void {
    this.transporter.sendMail({
      from: MAIL_FROM,
      to,
      subject,
      html,
    });
  }

  public sendVerificationEmail(to: string, token: string): void {
    const subject = 'Verify your email';
    const html = `Please click the link below to verify your email address: <a href="${CLIENT_URL}/verify-email?token=${token}">${CLIENT_URL}/verify-email?token=${token}</a>`;
    this.sendEmail(to, subject, html);
  }

  public sendResetPasswordEmail(to: string, token: string): void {
    const subject = 'Reset your password';
    const html = `Please click the link below to reset your password: <a href="${CLIENT_URL}/reset-password?token=${token}">${CLIENT_URL}/reset-password?token=${token}</a>`;
    this.sendEmail(to, subject, html);
  }
}
