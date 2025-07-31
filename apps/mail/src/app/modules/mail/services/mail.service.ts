import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendMailOptions } from '@common/interfaces/common/email.interface';
import axios from 'axios';

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

  async sendMail({ to, subject, html, text, senderName, senderEmail, attachments }: SendMailOptions): Promise<void> {
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

  /**
   * Lấy attachment từ URL, trả về buffer để đính kèm mail
   */
  async getAttachmentFromUrl(
    fileUrl: string,
    filename: string,
    contentType: string,
  ): Promise<{ filename: string; content: Buffer; contentType: string }> {
    try {
      const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });

      return {
        filename,
        content: Buffer.from(response.data),
        contentType,
      };
    } catch (error) {
      this.logger.error(`Failed to fetch attachment from URL: ${fileUrl}`, error);
      throw new InternalServerErrorException(`Could not fetch file from ${fileUrl}`);
    }
  }
}
