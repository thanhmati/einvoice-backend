import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { SendMailOptions } from '@common/interfaces/common/email.interface';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: config.get('MAIL_CONFIG.HOST'),
      port: config.get<number>('MAIL_CONFIG.PORT'),
      secure: false,
      auth: {
        user: config.get('MAIL_CONFIG.USER'),
        pass: config.get('MAIL_CONFIG.PASS'),
      },
    });
  }

  async sendMail({ to, subject, html, text, senderName, senderEmail, attachments }: SendMailOptions) {
    const defaultName = this.config.get('MAIL_CONFIG.SENDER_NAME');
    const defaultEmail = this.config.get('MAIL_CONFIG.SENDER_EMAIL');

    const mailOptions = {
      from: `"${senderName ?? defaultName}" <${senderEmail ?? defaultEmail}>`,
      to,
      subject,
      html,
      text: text ?? html.replace(/<[^>]+>/g, ''),
      attachments,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`📧 Mail sent to ${to}: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`❌ Failed to send mail to ${to}:`, error);
      throw error;
    }
  }
}
