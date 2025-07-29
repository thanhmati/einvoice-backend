import { Module } from '@nestjs/common';
import { PdfService } from './services/pdf.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfModule {}
