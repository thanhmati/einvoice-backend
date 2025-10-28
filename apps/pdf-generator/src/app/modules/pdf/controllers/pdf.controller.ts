import { Controller, Get } from '@nestjs/common';
import { PdfService } from '../services/pdf.service';
import path from 'path';

@Controller()
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get()
  printPdf() {
    const templatePath = path.join(__dirname, 'templates', 'invoice.template.ejs');

    return this.pdfService.generatePdfFormEjs(templatePath, { invoice: { id: 1 } });
  }
}
