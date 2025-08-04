import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { KeycloakService } from '@common/interfaces/grpc/authorizer';
import { GRPC_SERVICES } from '@common/configuration';
import { ClientGrpc } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { AuthorizationOptions } from '@common/interfaces/common/authorizer.interface';
import { MetadataKeys } from '@common/constants/decorators.constant';
import { catchError, map, Observable } from 'rxjs';
import { getAccessToken, setUserData } from '@common/utils/request.util';
import { getProcessId } from '@common/utils/string.utils';

@Injectable()
export class UserGuard implements CanActivate {
  private keycloakService: KeycloakService;

  constructor(
    @Inject(GRPC_SERVICES.AUTHORIZER_SERVICE) private readonly grpcClient: ClientGrpc,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit() {
    this.keycloakService = this.grpcClient.getService<KeycloakService>('KeycloakService');
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const authOptions = this.reflector.get<AuthorizationOptions>(MetadataKeys.SECURED, context.getHandler());

    const req = context.switchToHttp().getRequest();

    if (!authOptions?.secured) {
      return true;
    }

    return this.verifyUserToken(req);
  }

  private verifyUserToken(req: any) {
    const token = getAccessToken(req);

    const processID = req[MetadataKeys.PROCESS_ID] || getProcessId('einvoice-app');
    req[MetadataKeys.PROCESS_ID] = processID;

    return this.keycloakService
      .verifyUserToken({
        token,
        processID: processID,
      })
      .pipe(
        map(({ data, error }) => {
          if (!data?.valid) {
            throw new UnauthorizedException(error);
          }

          setUserData(req, data);

          return true;
        }),
        catchError((err) => {
          throw new UnauthorizedException(err);
        }),
      );
  }
}
