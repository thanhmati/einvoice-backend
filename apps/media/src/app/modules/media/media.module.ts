import { Module } from '@nestjs/common';
import { MediaService } from './services/media.service';
import { MediaController } from './controllers/media.controller';

@Module({
  imports: [],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
