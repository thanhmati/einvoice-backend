import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';

@Module({
  imports: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
