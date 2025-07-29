import { Module } from '@nestjs/common';
import { PdfModule } from '../pdf/pdf.module';
import { InvoicePdfService } from './services/invoice-pdf.service';
import { InvoicePdfController } from './controllers/invoice-pdf.controller';

@Module({
  imports: [PdfModule],
  controllers: [InvoicePdfController],
  providers: [InvoicePdfService],
})
export class InvoiceModule {}
