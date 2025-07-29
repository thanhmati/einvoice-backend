import { Module } from '@nestjs/common';
import { CloudinaryService } from './services/cloudinary.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
