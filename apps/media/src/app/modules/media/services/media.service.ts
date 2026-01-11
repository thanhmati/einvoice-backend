import { UploadFileTcpReq } from '@common/interfaces/tcp/media';
import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../../cloudinary/services/cloudinary.service';

@Injectable()
export class MediaService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  uploadFile(params: UploadFileTcpReq) {
    return this.cloudinaryService.uploadFile(Buffer.from(params.fileBase64, 'base64'), params.fileName);
  }

  destroyFile(publicId: string) {
    return this.cloudinaryService.deleteFile(publicId);
  }
}
