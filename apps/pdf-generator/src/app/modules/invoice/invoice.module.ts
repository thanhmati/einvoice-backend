import { Module } from '@nestjs/common';
import { PdfModule } from '../pdf/pdf.module';
import { InvoicePdfController } from './controllers/invoice-pdf.controller';
import { InvoicePdfService } from './services/invoice-pdf.service';

@Module({
  imports: [PdfModule],
  controllers: [InvoicePdfController],
  providers: [InvoicePdfService],
  exports: [],
})
export class InvoiceModule {}
