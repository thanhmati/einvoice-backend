import { Injectable } from '@nestjs/common';
import { renderFile } from 'ejs';
import { join } from 'path';

@Injectable()
export class MailTemplateService {
  private templateDir = join(__dirname, 'templates');

  async render(templateName: string, data: any): Promise<string> {
    const content = await renderFile(join(this.templateDir, `${templateName}.ejs`), data);

    const html = await renderFile(join(this.templateDir, 'layout.ejs'), {
      content,
    });

    return html;
  }
}
