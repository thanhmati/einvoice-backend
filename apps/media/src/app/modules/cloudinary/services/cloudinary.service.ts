import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  private readonly cloudinary = cloudinary;

  constructor(private readonly configService: ConfigService) {
    this.cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CONFIG.CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_CONFIG.API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_CONFIG.API_SECRET'),
    });
  }

  async uploadFile(fileBuffer: Buffer, fileName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        {
          folder: 'einvoice-app',
          resource_type: 'auto',
          public_id: fileName,
        },
        (error, result) => {
          if (error) {
            Logger.error('Upload error:', error);
            return reject(error);
          }
          Logger.log('Upload successful:', result);
          return resolve(result.secure_url);
        },
      );

      streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
  }
}
