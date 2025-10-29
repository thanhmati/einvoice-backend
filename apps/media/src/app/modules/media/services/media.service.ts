import { UploadFileTcpReq } from '@common/interfaces/tcp/media';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MediaService {
  uploadFile(params: UploadFileTcpReq): string {
    Logger.debug({ params });

    return 'file uploaded';
  }
}
