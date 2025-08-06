import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthorizedResult, KeycloakService } from '@common/interfaces/grpc/authorizer';
import { GRPC_SERVICES } from '@common/configuration';
import { ClientGrpc } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { AuthorizationOptions } from '@common/interfaces/common/authorizer.interface';
import { MetadataKeys } from '@common/constants/decorators.constant';
import { catchError, map, Observable } from 'rxjs';
import { getAccessToken, setUserData } from '@common/utils/request.util';
import { getProcessId } from '@common/utils/string.utils';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserGuard implements CanActivate {
  private keycloakService: KeycloakService;

  constructor(
    @Inject(GRPC_SERVICES.AUTHORIZER_SERVICE) private readonly grpcClient: ClientGrpc,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

  private verifyUserToken(req: any): Observable<boolean> {
    const token = getAccessToken(req);
    const cacheKey = `user-data:${token}`;

    const processID = req[MetadataKeys.PROCESS_ID] || getProcessId('einvoice-app');
    req[MetadataKeys.PROCESS_ID] = processID;

    return new Observable<boolean>((observer) => {
      this.cacheManager.get<AuthorizedResult>(cacheKey).then((cached) => {
        if (cached) {
          setUserData(req, cached);
          observer.next(true);
          observer.complete();
        } else {
          this.keycloakService
            .verifyUserToken({ token, processID })
            .pipe(
              map(({ data, error }) => {
                if (!data?.valid) {
                  throw new UnauthorizedException(error);
                }

                setUserData(req, data);

                this.cacheManager.set(cacheKey, data, 30 * 60 * 1000); // 30 minutes

                observer.next(true);
                observer.complete();
              }),
              catchError((err) => {
                observer.error(new UnauthorizedException(err));
                return [];
              }),
            )
            .subscribe();
        }
      });
    });
  }
}
