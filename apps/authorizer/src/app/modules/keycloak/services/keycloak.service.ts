import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwksRsa, { JwksClient } from 'jwks-rsa';
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';
import { AuthorizeResponse } from '@common/interfaces/grpc/authorizer';
import { GRPC_SERVICES } from '@common/configuration';
import { ClientGrpc } from '@nestjs/microservices';
import { UserAccessService } from '@common/interfaces/grpc/user-access';
import { firstValueFrom, map } from 'rxjs';
import { Role } from '@common/schemas/role.schema';
import { CreateKeycloakUserTcpReq } from '@common/interfaces/tcp/authorizer';
import { KeycloakHttpService } from './keycloak-http.service';

@Injectable()
export class KeycloakService {
  private userAccessService: UserAccessService;
  private readonly logger = new Logger(KeycloakService.name);
  private jwksClient: JwksClient;
  private host: string;
  private realm: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly keycloakHttpService: KeycloakHttpService,
    @Inject(GRPC_SERVICES.USER_ACCESS_SERVICE) private readonly grpcClient: ClientGrpc,
  ) {
    this.host = this.configService.get('KEYCLOAK_CONFIG.HOST');
    this.realm = this.configService.get('KEYCLOAK_CONFIG.REALM');

    this.jwksClient = jwksRsa({
      jwksUri: `${this.host}/realms/${this.realm}/protocol/openid-connect/certs`,
      cache: true,
      rateLimit: true,
    });

    this.userAccessService = this.grpcClient.getService<UserAccessService>('UserAccessService');
  }

  async verifyToken(token: string, processID: string): Promise<AuthorizeResponse> {
    const decoded = jwt.decode(token, { complete: true }) as Jwt;
    if (!decoded || !decoded.header || !decoded.header.kid) {
      throw new UnauthorizedException('Invalid token structure');
    }

    try {
      const key = await this.jwksClient.getSigningKey(decoded.header.kid);

      const publicKey = key.getPublicKey();

      const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as JwtPayload;

      const user = await this.userValidation(payload.sub, processID);

      this.logger.debug('User: ', user);

      return {
        valid: true,
        metadata: {
          jwt: payload,
          permissions: (user.roles as unknown as Role[])
            .map((role) => role?.permissions)
            .flat()
            .filter(Boolean),
          userId: user.id,
          user,
        },
      };
    } catch (error) {
      this.logger.error({ error });
      throw new UnauthorizedException('Token is invalid');
    }
  }

  private async userValidation(userId: string, processID: string) {
    const user = await firstValueFrom(
      this.userAccessService.getByUserId({ userId, processID }).pipe(map((data) => data.data)),
    );

    this.logger.debug('User', user);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  createUser(data: CreateKeycloakUserTcpReq) {
    return this.keycloakHttpService.createUser(data);
  }
}
