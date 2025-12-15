import { Module } from '@nestjs/common';
import { MailTemplateService } from './services/mail-template.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MailTemplateService],
  exports: [MailTemplateService],
})
export class MailTemplateModule {}
