import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MailService],
})
export class MailModule {}
