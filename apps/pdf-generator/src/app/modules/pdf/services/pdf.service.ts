import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';

@Injectable()
export class PdfService {
  renderEjsTemplate(templatePath: string, data: any): Promise<string> {
    const fullPath = path.resolve(templatePath);
    if (!fs.existsSync(fullPath)) {
      throw new NotFoundException(`Template not found: ${fullPath}`);
    }
    return ejs.renderFile(fullPath, data);
  }

  async generatePdfFromHtml(html: string): Promise<Uint8Array<ArrayBufferLike>> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();
    return pdfBuffer;
  }

  async generatePdfFromEjs(templatePath: string, data: any): Promise<Uint8Array<ArrayBufferLike>> {
    const html = await this.renderEjsTemplate(templatePath, data);
    return this.generatePdfFromHtml(html);
  }
}
