import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);

  renderEjsTemplate(templatePath: string, data: any) {
    const fullPath = path.resolve(templatePath);
    if (!fs.existsSync(fullPath)) {
      throw new NotFoundException(`Template not found: ${fullPath}`);
    }

    return ejs.renderFile(fullPath, data);
  }

  async generatePdfFormEjs(templatePath: string, data: any) {
    const html = await this.renderEjsTemplate(templatePath, data);

    this.logger.debug({ html });

    return { html };
  }
}
