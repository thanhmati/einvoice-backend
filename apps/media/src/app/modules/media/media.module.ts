import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { MediaController } from './controllers/media.controller';
import { MediaService } from './services/media.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
