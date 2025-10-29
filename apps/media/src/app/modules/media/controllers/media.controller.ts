import { Controller, UseInterceptors } from '@nestjs/common';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { MessagePattern } from '@nestjs/microservices';
import { UploadFileTcpReq } from '@common/interfaces/tcp/media';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { RequestParams } from '@common/decorators/request-param.decorator';
import { MediaService } from '../services/media.service';

@Controller()
@UseInterceptors(TcpLoggingInterceptor)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @MessagePattern(TCP_REQUEST_MESSAGE.MEDIA.UPLOAD_FILE)
  async uploadFile(@RequestParams() params: UploadFileTcpReq): Promise<Response<string>> {
    const result = await this.mediaService.uploadFile(params);
    return Response.success<string>(result);
  }
}
