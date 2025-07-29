import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
@Injectable()
export class CloudinaryService {
  private readonly cloudinary = cloudinary;

  constructor(private readonly config: ConfigService) {
    this.cloudinary.config({
      cloud_name: this.config.get('CLOUDINARY_CONFIG.CLOUD_NAME'),
      api_key: this.config.get('CLOUDINARY_CONFIG.API_KEY'),
      api_secret: this.config.get('CLOUDINARY_CONFIG.API_SECRET'),
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
            console.error('Upload error:', error);
            return reject(error);
          }
          console.log('Upload successful:', result);
          return resolve(result.secure_url);
        },
      );

      streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
  }
}
